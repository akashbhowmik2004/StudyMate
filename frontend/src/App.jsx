import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Note from "./pages/Note.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import Setting from "./pages/Setting.jsx";
import Community from "./pages/Community.jsx";
import Schedule from "./pages/Schedule.jsx";
import DoubtsFeed from "./pages/DoubtsFeed.jsx";
import Profile from "./pages/Profile.jsx";
import FriendsPage from "./pages/Friends.jsx";
import UserProfileCard from "./components/Common/UserProfileCard.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import useAuth from "./context/useAuth.jsx";
import { BeatLoader } from "react-spinners";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0D12]">
        <BeatLoader color="#22d3ee" size={18} />
      </div>
    );
  }

  // If the logged-in user is an Admin, restrict them entirely to the /admin route.
  if (user && user.isAdmin) {
    return (
      <div>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          {/* Redirect any other URL to /admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    );
  }

  // Normal user / Public routes
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <FriendsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Note />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doubts"
          element={
            <ProtectedRoute>
              <DoubtsFeed />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/user-profile" element={<UserProfileCard />} />
        
        {/* If non-admin tries to access /admin, redirect to home */}
        <Route path="/admin" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
