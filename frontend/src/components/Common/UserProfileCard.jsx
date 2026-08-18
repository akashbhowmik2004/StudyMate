import  { useState } from "react";
import { FaFire,FaStar, FaTrophy, FaShieldAlt } from "react-icons/fa";

// Dummy data representing the clicked user
const MOCK_USER = {
  name: "Alex Chen",
  username: "alexc_dev",
  imageUrl: "https://i.pravatar.cc/150?u=3",
  bio: "Building cool things with code. Coffee enthusiast ☕",
  stats: {
    posts: 142,
    followers: "12.4k",
    following: 890,
    streak: 45, // days active
  },
  badges: [
    { id: 1, name: "Top Contributor", icon: FaTrophy, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { id: 2, name: "Early Bird", icon: FaStar, color: "text-purple-400", bg: "bg-purple-400/10" },
    { id: 3, name: "Code Guardian", icon: FaShieldAlt, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { id: 4, name: "1 Month Streak", icon: FaFire, color: "text-orange-400", bg: "bg-orange-400/10" },
  ],
};

const UserProfileCard = ({ user = MOCK_USER, onClose }) => {
  // Local state for the follow button demonstration
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#131B2F] shadow-2xl shadow-black/50 font-sans relative">
      
      {/* Optional Close Button (if used as a modal) */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white/50 hover:text-white hover:bg-black/40 transition"
        >
          ✕
        </button>
      )}

      {/* Header Banner Background */}
      <div className="h-32 w-full bg-gradient-to-r from-cyan-900/40 to-blue-900/40 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="px-6 pb-6 relative">
        {/* Avatar & Follow Button Row */}
        <div className="flex justify-between items-end -mt-12 mb-4">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="h-24 w-24 rounded-2xl border-4 border-[#131B2F] bg-[#131B2F] object-cover shadow-lg"
          />
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`mb-2 rounded-xl px-6 py-2 text-sm font-bold transition-all duration-300 ${
              isFollowing
                ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                : "bg-cyan-500 text-black shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] hover:bg-cyan-400"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
            {user.name}
          </h2>
          <p className="text-sm font-medium text-cyan-400">@{user.username}</p>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-4 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] py-4 shadow-inner">
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-lg font-bold text-white">{user.stats.posts}</span>
            <span className="text-xs font-medium text-slate-400">Posts</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-lg font-bold text-white">{user.stats.followers}</span>
            <span className="text-xs font-medium text-slate-400">Followers</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-lg font-bold text-white">{user.stats.following}</span>
            <span className="text-xs font-medium text-slate-400">Following</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2">
            <div className="flex items-center gap-1 text-orange-400">
              <span className="text-lg font-bold">{user.stats.streak}</span>
              <FaFire className="text-sm" />
            </div>
            <span className="text-xs font-medium text-slate-400">Streak</span>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Badges & Achievements
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {user.badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.id} 
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.06]"
                >
                  <div className={`rounded-xl p-2.5 ${badge.bg}`}>
                    <Icon className={`text-xl ${badge.color}`} />
                  </div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                    {badge.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-800"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfileCard;