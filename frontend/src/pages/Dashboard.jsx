import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartBar,
  FaBook,
  FaClock,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...");
    // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} glass-container border-r border-white/20 transition-all duration-300 flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-semibold text-white">StudyMate</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-white/10 p-2 rounded transition-colors text-white"
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1">
          {/* Home */}
          <button
            onClick={() => setActivePage("home")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded transition-colors ${
              activePage === "home"
                ? "glass-button border-white/30 text-white"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            <FaHome size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Home</span>}
          </button>

          {/* Account */}
          <button
            onClick={() => setActivePage("account")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded transition-colors ${
              activePage === "account"
                ? "glass-button border-white/30 text-white"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            <FaUser size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Account</span>}
          </button>

          {/* Community */}
          <Link to="/community">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-white/70 hover:bg-white/10 transition-colors"
            >
              <FaUsers size={18} />
              {sidebarOpen && <span className="text-sm font-medium">Community</span>}
            </button>
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setActivePage("home");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-white/70 hover:bg-white/10 transition-colors mt-auto"
          >
            <FaSignOutAlt size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <DashboardNavbar />
        <div className="flex-1 overflow-y-auto">
          {activePage === "home" && <HomePage />}
          {activePage === "account" && <AccountPage />}
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white border border-slate-200 p-8 rounded-lg">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">Welcome Back!</h1>
        <p className="text-slate-600">
          Track your progress and achieve your learning goals
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium mb-1">
                STUDY HOURS
              </p>
              <p className="text-3xl font-semibold text-slate-900">24.5</p>
              <p className="text-slate-500 text-xs mt-2">+2.5 this week</p>
            </div>
            <div className="text-3xl text-slate-300">
              <FaClock />
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium mb-1">
                SUBJECTS
              </p>
              <p className="text-3xl font-semibold text-slate-900">8</p>
              <p className="text-slate-500 text-xs mt-2">All enrolled</p>
            </div>
            <div className="text-3xl text-slate-300">
              <FaBook />
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium mb-1">
                PROGRESS
              </p>
              <p className="text-3xl font-semibold text-slate-900">78%</p>
              <p className="text-slate-500 text-xs mt-2">+5% this month</p>
            </div>
            <div className="text-3xl text-slate-300">
              <FaChartBar />
            </div>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xs font-medium mb-1">
                ACHIEVEMENTS
              </p>
              <p className="text-3xl font-semibold text-slate-900">12</p>
              <p className="text-slate-500 text-xs mt-2">Keep it up!</p>
            </div>
            <div className="text-3xl text-slate-300">
              <FaTrophy />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Weekly Study Hours
          </h3>
          <div className="h-64 bg-slate-50 rounded-lg border border-slate-200 flex items-end justify-between p-4 gap-2">
            <div
              className="flex-1 bg-slate-900 rounded-sm h-32 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Mon: 2.5h"
            ></div>
            <div
              className="flex-1 bg-slate-900 rounded-sm h-40 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Tue: 3h"
            ></div>
            <div
              className="flex-1 bg-slate-900 rounded-sm h-48 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Wed: 3.5h"
            ></div>
            <div
              className="flex-1 bg-slate-900 rounded-sm h-36 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Thu: 2.8h"
            ></div>
            <div
              className="flex-1 bg-slate-900 rounded-sm h-44 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Fri: 3.2h"
            ></div>
            <div
              className="flex-1 bg-slate-900 rounded-sm h-32 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sat: 2.5h"
            ></div>
            <div
              className="flex-1 bg-slate-900 rounded-sm h-40 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sun: 3h"
            ></div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-600">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="w-2 h-2 bg-slate-700 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  Completed Mathematics Chapter 5
                </p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="w-2 h-2 bg-slate-700 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  Started English Literature Course
                </p>
                <p className="text-xs text-slate-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="w-2 h-2 bg-slate-700 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  Earned Achievement Badge
                </p>
                <p className="text-xs text-slate-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="w-2 h-2 bg-slate-700 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  Attended Live Session on Physics
                </p>
                <p className="text-xs text-slate-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Page Component
const AccountPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaUser className="text-3xl text-slate-600" />
          </div>
          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-slate-900">John Doe</h1>
            <p className="text-slate-600">student@example.com</p>
            <p className="text-slate-600 text-sm mt-2">
              Member since January 2026
            </p>
          </div>
          <button className="px-6 py-2 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="John"
                className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="student@example.com"
                className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Security & Password
          </h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 border border-slate-200 text-slate-700 font-medium rounded hover:bg-slate-50 transition-colors text-left flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-slate-500 rounded-full"></div>
              Two-Factor Authentication (Enabled)
            </button>
            <button className="w-full px-4 py-3 border border-slate-200 text-slate-700 font-medium rounded hover:bg-slate-50 transition-colors">
              Change Password
            </button>
            <button className="w-full px-4 py-3 border border-slate-200 text-slate-700 font-medium rounded hover:bg-slate-50 transition-colors">
              View Active Sessions
            </button>
            <button className="w-full px-4 py-3 border border-red-300 text-red-600 font-medium rounded hover:bg-red-50 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Preferences</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded">
            <div>
              <p className="font-medium text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-600">
                Receive email updates about your study progress
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 cursor-pointer accent-slate-900"
            />
          </div>
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded">
            <div>
              <p className="font-medium text-slate-900">Daily Reminders</p>
              <p className="text-sm text-slate-600">Get daily study reminders</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 cursor-pointer accent-slate-900"
            />
          </div>
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded">
            <div>
              <p className="font-medium text-slate-900">Week Progress Report</p>
              <p className="text-sm text-slate-600">
                Get a weekly summary of your study progress
              </p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer accent-slate-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
