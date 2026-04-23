import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FaSearch, FaBell, FaCog, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import api from '../lib/api.js'

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifRef = useRef(null)
  const userMenuRef = useRef(null)

  //Logout
  const handelLogut = async(e) =>{
    e.preventDefault();
    await api.post("/logout");
    navigate("/");
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notifications = [
    { id: 1, message: 'Your study session for Math is starting in 10 minutes', time: '5 mins ago', unread: true },
    { id: 2, message: 'You achieved a new milestone: 100 hours of study', time: '1 hour ago', unread: true },
    { id: 3, message: 'Physics assignment deadline is tomorrow', time: '2 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="glass-container border-b border-white/20 sticky top-0 z-40">
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">

        {/* Left Section - Search */}
        <div className="hidden sm:flex flex-1 items-center">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search subjects, notes..."
              className="glass-input w-full px-4 py-2 pl-10 rounded-lg text-white placeholder-white/50"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
        </div>

        <div className="sm:hidden text-white text-sm font-semibold truncate">
          Study Dashboard
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(prev => !prev)
                setShowUserMenu(false)
              }}
              className="relative p-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FaBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="glass-container absolute right-0 mt-2 w-[92vw] max-w-sm sm:w-80 border border-white/20 z-50">
                <div className="p-4 border-b border-white/20">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-white/10 hover:bg-white/10 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-white/15' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notification.unread ? 'bg-blue-400' : 'bg-white/30'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{notification.message}</p>
                          <p className="text-xs text-white/50 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/20 text-center">
                  <button className="text-sm text-blue-200 hover:text-blue-100 font-semibold transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="hidden sm:block p-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors">
            <FaCog className="text-lg" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-white/20 shrink-0"></div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setShowUserMenu(prev => !prev)
                setShowNotifications(false)
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                <FaUser className="text-white text-sm" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-white">John Doe</p>
                <p className="text-xs text-white/70">Student</p>
              </div>
              <FaChevronDown className={`text-xs text-white/70 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="glass-container absolute right-0 mt-2 w-56 border border-white/20 z-50">
                <div className="p-4 border-b border-white/20">
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-white/70">student@example.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 flex items-center gap-3 transition-colors">
                    <FaUser className="text-white/60" />
                    <span>View Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                    <FaCog className="text-gray-500" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="border-t border-gray-200"></div>
                <button onClick={handelLogut} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors rounded-b-lg">
                  <FaSignOutAlt className="text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar