const socket = io();

// Create a random persona
const username = "User" + Math.floor(Math.random() * 1000);
const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6"];
const userColor = colors[Math.floor(Math.random() * colors.length)];

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');
const userInfo = document.getElementById('user-info');

// Display current username in header
userInfo.textContent = username;
userInfo.style.color = userColor;

// Handle form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value.trim()) {
    const messageData = {
      name: username,
      color: userColor,
      text: input.value.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    socket.emit('chat message', messageData);
    input.value = '';
  }
});

// Receive message from server
socket.on('chat message', function(msg) {
  const isOwn = msg.name === username;

  // Create message container
  const messageDiv = document.createElement('li');
  messageDiv.className = `message ${isOwn ? 'own' : 'other'}`;

  // Create avatar
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.backgroundColor = msg.color;
  avatar.textContent = msg.name.charAt(0).toUpperCase();

  // Create bubble
  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  // Create message header (username + timestamp)
  const header = document.createElement('div');
  header.className = 'message-header';

  const usernameSpan = document.createElement('span');
  usernameSpan.className = 'username';
  usernameSpan.textContent = msg.name;

  const timestampSpan = document.createElement('span');
  timestampSpan.className = 'timestamp';
  timestampSpan.textContent = msg.timestamp;

  header.appendChild(usernameSpan);
  header.appendChild(timestampSpan);

  // Create message text (using textContent to prevent XSS)
  const text = document.createElement('div');
  text.className = 'text';
  text.textContent = msg.text;

  // Assemble bubble
  bubble.appendChild(header);
  bubble.appendChild(text);

  // Assemble message
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);

  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
});
