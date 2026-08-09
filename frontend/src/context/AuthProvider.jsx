import { useEffect, useState } from "react";
import { auth } from "../lib/axois";
import AuthContext from "./AuthContext";
import socket from "../lib/socket.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await auth.get("/verify");
        setUser(data.user);
        socket.connect(); // Connect the socket after successful verification
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    void verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;