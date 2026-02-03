# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm start            # Start server at http://localhost:3000
npm run dev          # Start with auto-restart on file changes (uses nodemon)
```

No test framework is configured.

## Architecture

Real-time chat application using WebSockets. Single shared chat room where all connected users see all messages.

**Server (`server.js`):**
- Express serves static files from `public/`
- Socket.IO handles WebSocket connections
- Broadcasts incoming `chat message` events to all connected clients via `io.emit()`

**Client (`public/script.js`):**
- Connects to server via `io()`
- Generates random username (`User` + random number) and color on load
- Emits `chat message` with `{name, color, text}` on form submit
- Listens for `chat message` events and appends to DOM

**Data flow:**
```
User types message → socket.emit('chat message', data) → server receives →
io.emit('chat message', data) → all clients receive → append to #messages
```

## Known Issues

- XSS vulnerability: `script.js:29` uses `innerHTML` with unsanitized user input
- No message persistence (messages lost on refresh)
- No authentication
