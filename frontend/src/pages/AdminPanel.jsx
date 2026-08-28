import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  Plus,
  Filter,
  Trash2,
  Edit,
  Ban,
  AlertTriangle,
} from "lucide-react";

// Reusable glassmorphism classes
const glassCard =
  "bg-white/40 backdrop-blur-lg border border-white/60 shadow-xl rounded-xl";
const glassTableHead =
  "bg-white/30 backdrop-blur-sm border-b border-white/50 text-gray-700";
const glassTableRow =
  "hover:bg-white/40 transition-colors border-b border-white/30 last:border-0";
const glassInput =
  "bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/70 text-gray-800 placeholder-gray-500 transition-all";
const glassModalOverlay =
  "fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-opacity";
const glassModalContent =
  "bg-white/70 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden relative";

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className={glassModalOverlay} onClick={onClose}>
      <div className={glassModalContent} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-white/50 bg-white/30">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-white/40 hover:bg-white/60 rounded-lg p-1.5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="p-5 border-t border-white/50 bg-white/30 flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardView = () => {
  const stats = [
    {
      label: "Total Users",
      value: "12,450",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-500/20",
    },
    {
      label: "Active Courses",
      value: "145",
      change: "+5%",
      icon: BookOpen,
      color: "text-green-600",
      bg: "bg-green-500/20",
    },
    {
      label: "Pending Doubts",
      value: "28",
      change: "-2%",
      icon: MessageSquare,
      color: "text-yellow-600",
      bg: "bg-yellow-500/20",
    },
    {
      label: "Platform Engagement",
      value: "89%",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-500/20",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice@example.com",
      role: "Student",
      status: "Active",
      date: "Oct 24, 2023",
    },
    {
      id: 2,
      name: "Bob Jones",
      email: "bob@example.com",
      role: "Admin",
      status: "Banned",
      date: "Oct 23, 2023",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Student",
      status: "Inactive",
      date: "Oct 21, 2023",
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Student",
      status: "Active",
      date: "Oct 20, 2023",
    },
    {
      id: 5,
      name: "Evan Wright",
      email: "evan@example.com",
      role: "Admin",
      status: "Active",
      date: "Oct 19, 2023",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Overview
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Welcome back, here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${glassCard} p-5 hover:bg-white/50 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 truncate">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} shadow-inner`}>
                  <Icon className={`h-7 w-7 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-5 flex items-center text-sm">
                <span
                  className={`font-semibold ${stat.change.startsWith("+") ? "text-green-700" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${glassCard} overflow-hidden`}>
        <div className="px-6 py-5 border-b border-white/50 flex items-center justify-between bg-white/20">
          <h3 className="text-lg font-bold text-gray-800">Recent Users</h3>
          <button className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={glassTableHead}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className={glassTableRow}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold mr-4 shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        user.status === "Active"
                          ? "bg-green-400/20 text-green-800 border-green-500/30"
                          : user.status === "Banned"
                            ? "bg-red-400/20 text-red-800 border-red-500/30"
                            : "bg-gray-400/20 text-gray-800 border-gray-500/30"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {user.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UsersView = () => {
  const [modalState, setModalState] = useState(null); // 'create', 'edit', 'ban', 'delete', or null
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (type, user = null) => {
    setSelectedUser(user);
    setModalState(type);
  };

  const closeModal = () => {
    setModalState(null);
    setSelectedUser(null);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Users Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage all students and instructors across the platform.
          </p>
        </div>
        <button
          onClick={() => openModal("create")}
          className="bg-indigo-600/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all flex items-center border border-indigo-400/50"
        >
          <Plus className="h-4 w-4 mr-2" /> Add User
        </button>
      </div>

      <div className={`${glassCard} overflow-hidden`}>
        <div className="p-5 border-b border-white/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/20">
          <div className="relative w-full sm:w-auto">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              className={`${glassInput} pl-9 w-full sm:w-72`}
            />
          </div>
          <button className="flex items-center w-full sm:w-auto text-sm font-semibold text-gray-700 bg-white/40 border border-white/60 px-4 py-2 rounded-lg hover:bg-white/60 transition-all shadow-sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={glassTableHead}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className={glassTableRow}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                    User Name {i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    user{i}@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {i % 2 === 0 ? "Admin" : "Student"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-bold rounded-full border bg-green-400/20 text-green-800 border-green-500/30">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      title="Edit User"
                      onClick={() =>
                        openModal("edit", {
                          name: `User Name ${i}`,
                          email: `user${i}@example.com`,
                          role: i % 2 === 0 ? "Admin" : "Student",
                        })
                      }
                      className="p-2 bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 rounded-lg mr-2 transition-colors border border-indigo-200/50"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      title="Ban User"
                      onClick={() =>
                        openModal("ban", { name: `User Name ${i}` })
                      }
                      className="p-2 bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/30 rounded-lg mr-2 transition-colors border border-yellow-300/50"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                    <button
                      title="Delete User"
                      onClick={() =>
                        openModal("delete", { name: `User Name ${i}` })
                      }
                      className="p-2 bg-red-500/10 text-red-700 hover:bg-red-500/20 rounded-lg transition-colors border border-red-200/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={modalState === "create"}
        onClose={closeModal}
        title="Create New User"
        footer={
          <>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 rounded-lg font-bold border border-white/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              Create User
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className={`${glassInput} w-full`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`${glassInput} w-full`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Role
            </label>
            <select className={`${glassInput} w-full appearance-none`}>
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Temporary Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`${glassInput} w-full`}
            />
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={modalState === "edit"}
        onClose={closeModal}
        title="Edit User Account"
        footer={
          <>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 rounded-lg font-bold border border-white/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={selectedUser.name}
                className={`${glassInput} w-full`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={selectedUser.email}
                className={`${glassInput} w-full`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Role
              </label>
              <select
                defaultValue={selectedUser.role}
                className={`${glassInput} w-full appearance-none`}
              >
                <option>Student</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        )}
      </Modal>

      {/* Ban User Modal */}
      <Modal
        isOpen={modalState === "ban"}
        onClose={closeModal}
        title="Ban User"
        footer={
          <>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 rounded-lg font-bold border border-white/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700 transition-colors flex items-center"
            >
              <Ban className="h-4 w-4 mr-2" /> Ban User
            </button>
          </>
        }
      >
        {selectedUser && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Ban className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Suspend {selectedUser.name}?
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              This will immediately revoke their access to the platform. They
              will not be able to log in until the ban is lifted.
            </p>
            <div className="w-full text-left">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Reason for Ban (Optional)
              </label>
              <textarea
                rows="3"
                className={`${glassInput} w-full resize-none`}
                placeholder="Violation of community guidelines..."
              ></textarea>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete User Modal */}
      <Modal
        isOpen={modalState === "delete"}
        onClose={closeModal}
        title="Delete User Profile"
        footer={
          <>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 rounded-lg font-bold border border-white/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete Permanently
            </button>
          </>
        }
      >
        {selectedUser && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Delete {selectedUser.name}?
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you absolute sure? This action cannot be undone. This will
              permanently delete the user account, their progress, and remove
              their data from our servers.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const CoursesView = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Courses & Materials
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage platform courses, modules, and study materials.
          </p>
        </div>
        <button className="bg-indigo-600/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all flex items-center border border-indigo-400/50">
          <Plus className="h-4 w-4 mr-2" /> Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`${glassCard} overflow-hidden hover:-translate-y-1 transition-transform duration-300`}
          >
            <div className="h-40 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center border-b border-white/40">
              <BookOpen className="h-12 w-12 text-indigo-700/70 drop-shadow-md" />
            </div>
            <div className="p-6 bg-white/20">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">
                  React for Beginners {i}
                </h3>
                <span className="bg-green-400/30 text-green-800 border border-green-500/30 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                  Published
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                A comprehensive guide to React.js and modern frontend
                development.
              </p>
              <div className="flex justify-between items-center text-sm font-medium text-gray-700 border-t border-white/50 pt-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>{" "}
                  12 Modules
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>{" "}
                  450 Students
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityView = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Community & Doubts
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Monitor community discussions and pending doubt resolutions.
        </p>
      </div>

      <div className={`${glassCard} p-6`}>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex border-b border-white/40 pb-6 last:border-0 last:pb-0 hover:bg-white/10 p-3 -mx-3 rounded-xl transition-colors relative group"
            >
              <div className="h-12 w-12 rounded-full bg-blue-500/20 border border-blue-200 flex items-center justify-center text-blue-700 font-bold mr-5 shrink-0 shadow-inner">
                U{i}
              </div>
              <div className="flex-1 pr-10">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-gray-800">
                    How does useEffect work under the hood?
                  </h4>
                  <span className="text-xs font-semibold text-gray-500 bg-white/40 px-2 py-1 rounded-md">
                    2 hours ago
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 mb-4 leading-relaxed">
                  I am trying to understand the dependency array in useEffect,
                  but it seems to trigger infinitely when I use an object as a
                  dependency. Any insights?
                </p>
                <div className="flex space-x-3">
                  <span className="bg-yellow-400/30 text-yellow-800 border border-yellow-500/30 text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm">
                    Unresolved
                  </span>
                  <span className="bg-gray-400/20 text-gray-700 border border-gray-400/30 text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm">
                    React
                  </span>
                </div>
              </div>

              {/* Delete Post Button - Appears on hover */}
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                title="Delete Post"
                className="absolute right-4 top-4 p-2 bg-red-500/10 text-red-600 hover:bg-red-500/30 rounded-lg transition-colors border border-red-200/0 hover:border-red-300/50 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Post Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Community Post"
        footer={
          <>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-white/50 hover:bg-white/70 text-gray-700 rounded-lg font-bold border border-white/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete Post
            </button>
          </>
        }
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 bg-red-100 border-2 border-red-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Delete this post?
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to delete this community post? This action
            will remove the post and all its associated comments permanently.
          </p>
        </div>
      </Modal>
    </div>
  );
};

const SettingsView = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Admin Settings
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Configure global platform settings and policies.
        </p>
      </div>

      <div className={`${glassCard} max-w-3xl overflow-hidden`}>
        <div className="p-6 border-b border-white/50 bg-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-5">
            General Settings
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="StudyMate"
                className={glassInput + " w-full"}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@studymate.com"
                className={glassInput + " w-full"}
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-white/50">
          <h3 className="text-xl font-bold text-gray-800 mb-5">Features</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/30 rounded-xl border border-white/40">
              <div>
                <p className="text-base font-bold text-gray-800">
                  Enable User Registrations
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Allow new users to sign up on the platform.
                </p>
              </div>
              <div className="w-12 h-6 bg-indigo-500/80 rounded-full relative cursor-pointer shadow-inner border border-indigo-400">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-md"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/30 rounded-xl border border-white/40">
              <div>
                <p className="text-base font-bold text-gray-800">
                  Maintenance Mode
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Put the platform in maintenance mode.
                </p>
              </div>
              <div className="w-12 h-6 bg-gray-400/50 rounded-full relative cursor-pointer shadow-inner border border-gray-300">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white/30 flex justify-end">
          <button className="bg-indigo-600/90 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all border border-indigo-400/50">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users Management", icon: Users },
    { id: "courses", label: "Courses & Materials", icon: BookOpen },
    { id: "community", label: "Community & Doubts", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "users":
        return <UsersView />;
      case "courses":
        return <CoursesView />;
      case "community":
        return <CommunityView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    // Background gradient for the entire page to make glassmorphism pop
    <div className="h-screen overflow-hidden flex bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Glassmorphic */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 m-4 lg:m-6 rounded-2xl
        bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"}
        flex flex-col overflow-hidden
      `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/50 shrink-0 bg-white/20">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-800 tracking-tight">
              StudyMate
            </span>
          </div>
          <button
            className="lg:hidden p-2 bg-white/40 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <nav className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                    isActive
                      ? "bg-white/60 text-indigo-700 shadow-md border border-white/80 scale-[1.02]"
                      : "text-gray-600 hover:bg-white/40 hover:text-gray-800"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 mr-3 transition-colors ${isActive ? "text-indigo-600" : "text-gray-500"}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/50 shrink-0 bg-white/20">
          <button className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-400/20 rounded-xl transition-all font-bold">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen py-4 lg:py-6 pr-4 lg:pr-6 relative z-10">
        {/* Header - Glassmorphic */}
        <header className="h-20 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg flex items-center justify-between px-6 z-10 shrink-0 mb-6">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2.5 mr-4 text-gray-700 bg-white/50 rounded-xl border border-white/60 shadow-sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex items-center relative">
              <Search className="h-4 w-4 text-gray-500 absolute left-3" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl pl-10 pr-4 py-2.5 text-sm w-64 lg:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/60 text-gray-700 placeholder-gray-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button className="p-2.5 text-gray-600 bg-white/40 rounded-xl border border-white/60 shadow-sm hover:bg-white/60 transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white/50 shadow-sm" />
            </button>
            <div className="flex items-center space-x-3 border-l border-white/60 pl-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center text-indigo-700 font-bold border border-indigo-300 shadow-sm">
                A
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-bold text-gray-800 block">
                  Admin User
                </span>
                <span className="text-xs font-semibold text-gray-500 block">
                  Superadmin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
          {renderContent()}
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.8);
        }
      `,
        }}
      />
    </div>
  );
};

export default AdminPanel;
