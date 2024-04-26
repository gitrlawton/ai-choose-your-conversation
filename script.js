const nameInput = document.getElementById('name');
const startBtn = document.getElementById('startBtn');
const chatbox = document.getElementById('chatbox');

let talkingToName = ''

startBtn.addEventListener('click', () => {
    talkingToName = nameInput.value;
    // Here you would call your backend API to start the conversation with Gemini 
    // and provide the chosen name. 
    // For demonstration purposes, we'll just simulate a response.
    const response = `Hello, I am ${talkingToName}. How can I help you today?`;
    displayMessage(response, talkingToName);

    // Add input field for user messages after conversation starts
    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'userInput';
    document.body.appendChild(userInput);

    // Add a button to send the user message
    const sendBtn = document.createElement('button');
    sendBtn.innerText = 'Send';
    sendBtn.addEventListener('click', sendMessage);
    document.body.appendChild(sendBtn);
});

function sendMessage() {
  const message = userInput.value;
  userInput.value = ''; // Clear the input field
  displayMessage(message, 'Me'); // Display user message
  
  // Send message to backend API (replace with your actual API call)
  fetch('http://localhost:5000/api/ask-gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value, // The chosen name
      message: message
    })
  })
  .then(response => response.json())
  .then(data => {
    displayMessage(data.response, talkingToName); // Display Gemini's response
  })
  .catch(error => {
    console.error('Error fetching response:', error);
    // Handle error, e.g., display an error message to the user
  });
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('p');
    messageElement.innerText = `${sender}: ${message}`;
    chatbox.appendChild(messageElement);
}