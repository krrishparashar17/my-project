// my-app/src/App.js
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

function App() {
  const socketRef = useRef(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // create socket connection once
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("🟢 Connected to server with ID:", socket.id);
    });

    socket.on("receive_message", (data) => {
      // ensure data shape
      if (!data || !data.name || !data.message) return;
      setChat((prev) => [...prev, data]);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    // cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketRef.current || !socketRef.current.connected) {
      console.warn("Socket not connected");
      return;
    }
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!message.trim()) return;

    const msgData = { name: name.trim(), message: message.trim() };
    socketRef.current.emit("send_message", msgData);

    // Optionally show your own message instantly with timestamp
    setChat((prev) => [
      ...prev,
      { ...msgData, time: new Date().toISOString(), self: true }
    ]);

    setMessage("");
  };

  return (
    <div style={{ border: "2px solid black", width: "420px", margin: "24px auto", textAlign: "center", padding: 12, borderRadius: 8 }}>
      <h2>💬 Real-Time Chat App</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "90%", padding: 8, marginBottom: 10 }}
      />

      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
        <input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>Send</button>
      </form>

      <div style={{ border: "1px solid #ccc", marginTop: 20, textAlign: "left", maxHeight: 300, overflowY: "auto", padding: 8, borderRadius: 6 }}>
        {chat.length === 0 && <p style={{ color: "#666" }}>No messages yet</p>}
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: 8, background: msg.self ? "#e6ffe6" : "transparent", padding: "6px 8px", borderRadius: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{msg.name}</div>
            <div style={{ fontSize: 15 }}>{msg.message}</div>
            <div style={{ fontSize: 11, color: "#666" }}>{new Date(msg.time || Date.now()).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;