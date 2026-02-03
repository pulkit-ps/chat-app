const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve the 'public' folder to the browser
app.use(express.static("public"));

// When a new user connects
io.on("connection", (socket) => {
  console.log("A user connected");

  // When a chat message is received
  socket.on("chat message", (msgData) => {
    io.emit("chat message", msgData); // broadcast full object
  });
  
  // When the user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
