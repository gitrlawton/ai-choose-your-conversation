const nameInput = document.getElementById('name');
const startBtn = document.getElementById('startBtn');
const chatbox = document.getElementById('chatbox');
let talkingToName = '';
let conversationStarted = false; // Flag to track conversation status

const confirmationPopup = document.getElementById('confirmationPopup');
const confirmYesBtn = document.getElementById('confirmYesBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');

startBtn.addEventListener('click', () => {
  if (conversationStarted) {
    confirmationPopup.classList.remove('hidden'); // Show the popup
  } 
  else { 
    // Conversation has already started.
    const inputArea = document.getElementById('input-area'); // Get the input area element
    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'userInput';
    document.body.appendChild(userInput);

    const sendBtn = document.createElement('button');
    sendBtn.innerText = 'Send';
    sendBtn.addEventListener('click', sendMessage);
    inputArea.appendChild(userInput);
    inputArea.appendChild(sendBtn); 

    conversationStarted = true; // Set flag to true

    chatbox.innerHTML = ''; // This line clears the chatbox content
    talkingToName = nameInput.value;
    const response = `Hello, I am ${talkingToName}. What would you like to talk about?`;
    displayMessage(response, talkingToName);

    // Add an event listener for the "keyup" event on the userInput element
    userInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
          sendMessage(); // Call the sendMessage function when Enter is pressed
      }
    });
  } 
});

confirmYesBtn.addEventListener('click', () => {
  // User confirmed - start a new conversation
  confirmationPopup.classList.add('hidden'); // Hide the popup
  // Code for clearing chatbox and starting conversation
  chatbox.innerHTML = ''; // This line clears the chatbox content
  talkingToName = nameInput.value;
  const response = `Hello, I am ${talkingToName}. What would you like to talk about?`;
  displayMessage(response, talkingToName);
});

confirmCancelBtn.addEventListener('click', () => {
  confirmationPopup.classList.add('hidden'); // Hide the popup
});


function sendMessage() {
  const message = userInput.value;
  userInput.value = ''; // Clear the input field
  displayMessage(message, 'Me'); // Display user message
  
  // Display "Waiting for Gemini to reply..." message
  const waitingMessage = document.getElementById('waitingMessage');
  waitingMessage.style.display = 'inline';
  waitingMessage.innerText = talkingToName + " is typing..."

  // Send message to backend API
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
    // Hide "Waiting for Gemini to reply..." message
    waitingMessage.style.display = 'none';

    displayMessage(data.response, talkingToName); // Display Gemini's response
  })
  .catch(error => {
    console.error('Error fetching response:', error);
    // Hide "Waiting for Gemini to reply..." message on error
    waitingMessage.style.display = 'none';
  });
}

function displayMessage(message, sender) {
  const messageElement = document.createElement('p');
  
  // Create a span element for the sender's name and make it bold
  const senderSpan = document.createElement('span');
  senderSpan.style.fontWeight = 'bold';
  senderSpan.textContent = sender + ': '; // Add colon after the name

  // Create a text node for the message content
  const messageText = document.createTextNode(message);

  // Append the sender span and message text to the message element
  messageElement.appendChild(senderSpan);
  messageElement.appendChild(messageText);

  chatbox.appendChild(messageElement);

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight; 
}