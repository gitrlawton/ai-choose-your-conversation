const nameInput = document.getElementById('name');
const startBtn = document.getElementById('startBtn');
const chatbox = document.getElementById('chatbox');

startBtn.addEventListener('click', () => {
    const name = nameInput.value;
    // Here I would call the backend API to start the conversation with Gemini 
    // and provide the chosen name. 

    // For demonstration purposes, I'll simulate a response.
    const response = `Hello, I am ${name}. How can I help you today?`;
    displayMessage(response, name);
});

// Adds new messages to the chatbox with proper formatting.
function displayMessage(message, sender) {
    const messageElement = document.createElement('p');
    messageElement.innerText = `${sender}: ${message}`;
    chatbox.appendChild(messageElement);
}