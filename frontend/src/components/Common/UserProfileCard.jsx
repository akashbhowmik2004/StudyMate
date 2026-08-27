import { useState, useEffect } from "react";
import { FaFire, FaStar, FaTrophy, FaShieldAlt } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import { useToast } from "../../context/ToastContext.jsx";
import useAuth from "../../context/useAuth.jsx";

const UserProfileCard = ({ userId, onClose, onFollowChange }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { showToast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        if (response.data.success) {
          const fetchedUser = response.data.otherDetails;
          setUser(fetchedUser);
          setIsFollowing(fetchedUser.followers?.includes(currentUser._id));
          setIsPending(fetchedUser.isPending);
        }
      } catch (error) {
        console.error("Error fetching user", error);
        showToast("Failed to load user profile", false);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUser();
  }, [userId, currentUser._id, showToast]);

  const handleFollowToggle = async () => {
    if (!user) return;
    try {
      if (isFollowing) {
        await api.put(`/users/unfollow/${userId}`);
        setUser(prev => ({ ...prev, followers: prev.followers.filter(id => id !== currentUser._id) }));
        setIsFollowing(false);
        if (onFollowChange) onFollowChange(userId, false);
      } else if (!isPending) {
        await api.post(`/send-request/${userId}`);
        setIsPending(true);
        if (onFollowChange) onFollowChange(userId, true);
        showToast("Follow request sent", true);
      }
    } catch (error) {
      console.error(error);
      showToast("Failed to update follow status", false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-md h-96 flex items-center justify-center rounded-3xl border border-white/10 bg-[#131B2F] shadow-2xl relative">
        <div className="text-cyan-400">Loading profile...</div>
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white/50 hover:text-white hover:bg-black/40 transition">✕</button>
        )}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#131B2F] shadow-2xl shadow-black/50 font-sans relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white/50 hover:text-white hover:bg-black/40 transition"
        >
          ✕
        </button>
      )}

      <div className="h-32 w-full bg-gradient-to-r from-cyan-900/40 to-blue-900/40 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-end -mt-12 mb-4">
          {user.profilePicture ? (
             <img
               src={user.profilePicture}
               alt={user.name}
               className="h-24 w-24 rounded-2xl border-4 border-[#131B2F] bg-[#131B2F] object-cover shadow-lg"
             />
          ) : (
            <div className="h-24 w-24 rounded-2xl border-4 border-[#131B2F] bg-slate-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          {userId !== currentUser._id && (
            <button
              onClick={handleFollowToggle}
              className={`mb-2 rounded-xl px-6 py-2 text-sm font-bold transition-all duration-300 ${
                isFollowing
                  ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  : isPending
                  ? "cursor-not-allowed border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                  : "bg-cyan-500 text-black shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] hover:bg-cyan-400"
              }`}
            >
              {isFollowing ? "Following" : isPending ? "Pending" : "Follow"}
            </button>
          )}
        </div>

        <div className="mb-6">
          <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
            {user.name}
          </h2>
          <p className="text-sm font-medium text-cyan-400">@{user.username}</p>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {user.desc || "Building cool things with code. Coffee enthusiast ☕"}
          </p>
        </div>

        <div className="mb-8 grid grid-cols-4 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] py-4 shadow-inner">
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-lg font-bold text-white">{user.doubtsCount || 0}</span>
            <span className="text-xs font-medium text-slate-400">Posts</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-lg font-bold text-white">
              {user.followers?.length || 0}
            </span>
            <span className="text-xs font-medium text-slate-400">Followers</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-lg font-bold text-white">
              {user.followings?.length || 0}
            </span>
            <span className="text-xs font-medium text-slate-400">Following</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2">
            <div className="flex items-center gap-1 text-orange-400">
              <span className="text-lg font-bold">1</span>
              <FaFire className="text-sm" />
            </div>
            <span className="text-xs font-medium text-slate-400">Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
