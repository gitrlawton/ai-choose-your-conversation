from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from config import GOOGLE_API_KEY


app = Flask(__name__)
# Enable CORS for the Flask app
CORS(app)


API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=API_KEY)

instruction = "You believe you are Spiderman.  You respond to all questions and statements made by the user as Spiderman would, in the first person.  You use your knowledge of Spiderman and dialogue from his comic books and movies to formulate your responses."
model = genai.GenerativeModel("gemini-1.5-pro-latest", system_instruction=instruction)
chat = model.start_chat(history=[])

@app.route('/api/ask-gemini', methods=['POST'])
def ask_gemini():
    # Parse the request.
    data = request.get_json()
    # Extract the name and message.
    name = data.get('name')
    message = data.get('message')

    # Send user's message to Gemini and store its response.
    gemini_response = chat.send_message(message)

    return jsonify({'response': gemini_response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)