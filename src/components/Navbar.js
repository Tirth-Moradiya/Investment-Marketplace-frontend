import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = await response.json();

        if (!response.ok) {
          console.error("Error fetching profile:", userData.error);
          return;
        }

        console.log("User Profile:", userData);

        // Fetch all users to find chat partner
        const usersResponse = await fetch(
          "http://localhost:5000/api/users/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const users = await usersResponse.json();

        if (!usersResponse.ok) {
          console.error("Error fetching users:", users);
          return;
        }

        console.log("All Users:", users);

        // Match Founder with an Investor and vice versa
        if (userData.role === "Founder") {
          const investor = users.find((u) => u.role === "Investor");
          if (investor) setReceiverId(investor._id);
        } else if (userData.role === "Investor") {
          const founder = users.find((u) => u.role === "Founder");
          if (founder) setReceiverId(founder._id);
        }

        console.log("Receiver ID:", receiverId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Investment Marketplace
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/proposals" className="mr-4">
          Proposals
        </Link>

        {user ? (
          <>
            <span className="text-sm font-medium">
              {user.name} ({user.role})
            </span>

            {receiverId ? (
              <Link
                to={`/chat/${receiverId}`}
                className="bg-green-500 px-3 py-1 rounded"
              >
                Chat
              </Link>
            ) : (
              <span className="text-gray-400">No Chat Available</span>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-blue-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
