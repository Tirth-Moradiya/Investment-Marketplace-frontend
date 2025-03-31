import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-64 overflow-y-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            {msg}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2 flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
