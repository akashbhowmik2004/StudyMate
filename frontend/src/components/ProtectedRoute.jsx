import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "../lib/api";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/dashboard"); // or /me
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/login?please login first" />;

  return children;
};

export default ProtectedRoute;
