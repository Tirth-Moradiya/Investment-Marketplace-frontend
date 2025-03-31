import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext"; // Adjust path if needed

const socket = io("http://localhost:5000");

const Chat = () => {
  const { user } = useContext(AuthContext); // Use context instead of prop
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    if (user && user.id) {
      console.log("User joined chat:", user.id);
      socket.emit("joinChat", user.id);
    } else {
      console.warn("User is not authenticated!");
    }

    socket.on("receiveMessage", (data) => {
      console.log("Received Message:", data);
      setMessages((prev) => [...prev, data]); // Append received message
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);

  const sendMessage = () => {
    if (!user || !user.id) {
      alert("User not authenticated.");
      return;
    }
    if (!message.trim() || !receiverId) {
      alert("Please select a recipient and enter a message.");
      return;
    }

    const newMessage = {
      senderId: user.id, // Use `id` instead of `_id`
      receiverId,
      message,
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  if (!user || !user.id) {
    return <p className="text-red-500 text-center">Please log in to chat.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Chat</h2>

      <select
        onChange={(e) => setReceiverId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select Investor</option>
        <option value="investorId123">Investor 1</option>
        <option value="investorId456">Investor 2</option>
      </select>

      <div className="h-64 overflow-y-auto border p-4 rounded-lg bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 max-w-xs rounded-lg text-white ${
              msg.senderId === user.id
                ? "bg-blue-500 ml-auto text-right"
                : "bg-gray-600 text-left"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
