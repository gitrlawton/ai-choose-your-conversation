from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from google.generativeai import types
from google.api_core import exceptions
import os
from config import GOOGLE_API_KEY


app = Flask(__name__)
# Enable CORS for the Flask app
CORS(app)


API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=API_KEY)


instruction, model, chat = (None, None, None)
ai_name = None



@app.route('/api/ask-gemini', methods=['POST'])
def ask_gemini():
    
    global instruction, model, chat, ai_name
    
    # Parse the JSON data from the front end.
    data = request.get_json()
    
    # Print statement for debugging purposes.
    print("Data from front end parsed.")
    
    # Extract the name and message.
    name = data.get('name')
    print(name)
    message = data.get('message')
    
    # Print statement for debugging purposes.
    print("Setting up Gemini model.")
    
    # Model setup.
    if name != ai_name:
        instruction = f"""Pretend you are {name}.  Imprersonate {name}'s way of speaking to the best of your ability.   
        Respond to all questions and statements made by the user as {name} would, in the first person.  
        Use your knowledge of who {name} is and what {name} does in order to answer questions.  
        Use {name}'s common words and phrases from {name}'s appearances in popular culture (television, movies, books, graphic novels etc.), 
        as well as {name}'s own words from interviews, documentaries, articles, autobiographies, memoirs, journals, diaries, etc. to form your sentences.  
        Limit your response to 1 paragraph.  
        Important: You must make your responses as {name}-sounding as possible. Respond using {name}'s vernacular.  
        If {name} is an English-speaking historical figure who is no longer alive, do not respond using present-day English.  
        Instead, respond using the type of English {name} was known to have spoke during {name}'s lifetime.  
        Also, never use placeholder text, such as '[insert topic]', and instead of ending your response with '...', complete the sentence in its entirety."
        """ 
        print(instruction)
        model = genai.GenerativeModel("gemini-1.5-pro-latest", system_instruction=instruction)
        chat = model.start_chat(history=[])
        ai_name = name

    # Print statement for debugging purposes.
    print("Sending user's statement to Gemini.")
    
    # Send user's message to Gemini and store its response.
    try:
        gemini_response = chat.send_message(message)
    
        # Print statement for debugging purposes.
        print("Received Gemini's response.")
        print(gemini_response.text)
        
        return jsonify({'response': gemini_response.text.strip()})
    
    except types.generation_types.StopCandidateException as e:
        error_message = f"***Response blocked: your last message was not sent.  Try rephrasing the message, changing the subject matter, or altering the context.***"

        print(e)
        return jsonify({'response': error_message})
    except exceptions.ResourceExhausted as e:
        error_message = f"***Spam prevention: your last message was not sent.  Wait a few seconds before sending your next message.***"

        print(e)
        return jsonify({'response': error_message})
        

        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)