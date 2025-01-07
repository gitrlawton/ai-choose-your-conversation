# Choose Your Conversation

## Overview

This project is a web application that allows users to engage in conversations with the AI version of whomever they choose, utilizing Google’s Generative AI SDK. Users input the name of a well-known person they'd like to chat with, then Google Gemini mimics the speaking style and personality of that individual.

## Features

- **Name Input**: Users can enter the name of a person they'd like to converse with.
- **Conversational Interface**: The application provides a chat interface for real-time interaction with the AI.
- **Dynamic Responses**: The AI generates responses based on the personality and speaking style of the chosen name.

## Installation

To set up the project, ensure you have Python installed on your machine. Then, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create a virtual environment:

   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:

   - On Windows (using Command Prompt):
     ```bash
     .venv\Scripts\activate
     ```
   - On Windows (using Git Bash):
     ```bash
     source .venv/Scripts/activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

5. Create a `config.py` file in the root directory and add your Google API key:

   ```python
   GOOGLE_API_KEY = 'your_google_api_key'
   ```

## Usage

1. Run the Python application:

   ```bash
   python app.py
   ```

2. Open the `index.html` file in your preferred web browser.

3. Enter a name in the input field and start a conversation with the AI.

4. Interact with the AI and receive responses based on the chosen personality.

## File Descriptions

- **app.py**: The server-side code containing the Flask API for handling user requests and generating AI responses.
- **config.py**: Configuration file containing the Google API key required for accessing the Generative AI services.
- **index.html**: The main HTML file serving as the front-end of the web application, providing the user interface for interaction.
- **script.js**: JavaScript file managing the front-end interactions, including sending messages to the backend and displaying responses.

## Dependencies

- **Flask**: For building the web application and handling HTTP requests.
- **Flask-CORS**: For enabling Cross-Origin Resource Sharing in the Flask app.
- **google-generativeai**: For integrating Google’s Generative AI capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.