import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import { Routes, Route } from "react-router";
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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
