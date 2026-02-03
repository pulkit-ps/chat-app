const socket = io();

// Create a random persona
const username = "User" + Math.floor(Math.random() * 1000);
const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6"];
const userColor = colors[Math.floor(Math.random() * colors.length)];

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Handle form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    const messageData = {
      name: username,
      color: userColor,
      text: input.value
    };
    socket.emit('chat message', messageData);
    input.value = '';
  }
});

// Receive message from server
socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.innerHTML = `<strong style="color: ${msg.color}">${msg.name}:</strong> ${msg.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
