import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit("userJoined", { userId });

    socket.on("receiveNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [userId]);

  return (
    <div className="absolute top-4 right-4 bg-white text-black shadow-lg p-4 rounded-md w-64">
      <h3 className="font-semibold text-lg">Notifications</h3>
      <ul className="mt-2">
        {notifications.map((notif, index) => (
          <li key={index} className="p-2 border-b">
            {notif}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
