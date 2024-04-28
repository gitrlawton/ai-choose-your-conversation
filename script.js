const nameInput = document.getElementById('name');
const startBtn = document.getElementById('startBtn');
const chatbox = document.getElementById('chatbox');
let talkingToName = '';
let conversationStarted = false; // Flag to track conversation status

startBtn.addEventListener('click', () => {
  if (!conversationStarted) { // Check if conversation has already started
    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'userInput';
    document.body.appendChild(userInput);

    const sendBtn = document.createElement('button');
    sendBtn.innerText = 'Send';
    sendBtn.addEventListener('click', sendMessage);
    document.body.appendChild(sendBtn);

    conversationStarted = true; // Set flag to true
  } 

  chatbox.innerHTML = ''; // This line clears the chatbox content
  talkingToName = nameInput.value;
  const response = `Hello, I am ${talkingToName}. What would you like to talk about?`;
  displayMessage(response, talkingToName);
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

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight; 
}