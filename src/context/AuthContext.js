import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure it's installed with `npm install jwt-decode`

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user from localStorage on page refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        console.log("Decoded Token:", decodedUser); // Debugging

        setUser({
          id: decodedUser.id,
          name: decodedUser.name, // Ensure 'name' exists in token
          role: decodedUser.role, // Ensure 'role' exists in token
        });
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // Clear invalid token
      }
    }
  }, []);

  const login = (newToken) => {
    try {
      const decodedUser = jwtDecode(newToken);
      localStorage.setItem("token", newToken);
      setUser({
        id: decodedUser.id,
        name: decodedUser.name,
        role: decodedUser.role,
      });
      setToken(newToken);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
