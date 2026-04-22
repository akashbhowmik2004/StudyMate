import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  FaSearch,
  FaBell,
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import api from "../lib/api.js"

const UserPageNavbar = () => {
    const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handelLogut = async(e) =>{
    e.preventDefault();
    await api.post("/logout");
    navigate("/");
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left Section - Logo */}
        <Link to="/">
          <div className="cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="text-2xl font-bold text-blue-600 tracking-wide">
              StudyMate
            </span>
          </div>
        </Link>

        {/* Center Section - Search */}
        <div className="flex-1 flex items-center max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search communities, posts..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaBell className="text-lg" />
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <FaChevronDown className="text-xs text-gray-600" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {/* User Info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-600">@johndoe</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link to="/dashboard">
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                    >
                      <FaUser className="text-gray-600" />
                      Dashboard
                    </button>
                  </Link>

                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <FaCog className="text-gray-600" />
                    Settings
                  </button>

                  <Link to={"/logout"}>
                    <button onClick={handelLogut} className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left border-t border-gray-200 mt-2 pt-2">
                      <FaSignOutAlt className="text-gray-600" />
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageNavbar;
