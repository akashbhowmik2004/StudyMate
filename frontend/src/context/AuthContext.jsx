import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/axois";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await auth.get("/verify");
        console.log(data.user);
        setUser(data.user);
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

export const useAuth = () => {
  return useContext(AuthContext);
};