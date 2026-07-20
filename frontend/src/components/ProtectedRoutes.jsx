import { Navigate } from "react-router";
import { BeatLoader } from "react-spinners";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <BeatLoader
          color="#22d3ee"
          loading={loading}
          margin={5}
          speedMultiplier={1}
        />
      </div>
    );
  }

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ message: "Please login first" }}
    />
  );
};

export default ProtectedRoute;