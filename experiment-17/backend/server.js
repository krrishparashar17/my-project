// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // allow CORS in development

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // for development only. Replace with frontend origin in production.
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // when a client sends a message, broadcast to everyone (including sender)
  socket.on("send_message", (data) => {
    // basic validation
    if (!data || !data.name || !data.message) return;
    const payload = {
      name: String(data.name),
      message: String(data.message),
      time: new Date().toISOString()
    };
    io.emit("receive_message", payload);
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, "reason:", reason);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Chat Server running on http://localhost:${PORT}`));