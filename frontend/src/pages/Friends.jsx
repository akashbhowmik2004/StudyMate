import { useState, useEffect } from "react";
import { FaUserFriends, FaUserCheck, FaUserPlus } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader";
import { useToast } from "../context/ToastContext";
import { api } from "../lib/axois.js";

// Reusable User Card Component
const UserCard = ({ user, isFollowing, onToggleFollow }) => {
  const { showToast } = useToast();
  const handleUnfollowUser = async () => {
    try {
      const userId = user._id || user.id;
      await api.put(`/unfollow/${userId }`);
      onToggleFollow(user, true); // Update the parent state
      showToast(`You have unfollowed ${user.name}`, true);
    }catch (err) {
      console.log(err);
      showToast("Failed to unfollow user", false);
    }
  }
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]">
      <div className="flex min-w-0 items-center gap-4">
        {/* Avatar */}
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.name}
            className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover shadow-lg"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 font-bold text-white">
            {user.name?.charAt(0)}
          </div>
        )}

        {/* User Info */}
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-white">
            {user.name}
          </h3>
          <p className="truncate text-sm font-medium text-slate-400">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => {onToggleFollow(user, isFollowing);
          isFollowing ? handleUnfollowUser() : null;
        }}
        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 ${
          isFollowing
            ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            : "bg-cyan-500 text-black shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] hover:bg-cyan-400"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

const NetworkPage = () => {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const { showToast } = useToast();

  const fetchNetworkData = async () => {
    try {
      // Fetch Followers, Followings, and All Users concurrently
      const followersRes = await api.get("/users/followers");
      const followingsRes = await api.get("/users/followings");
      console.log("Followers data:", followersRes.data);
      console.log("Followings data:", followingsRes.data);
      setFollowers(followersRes.data.data || []);
      setFollowings(followingsRes.data.data || []);
    } catch (err) {
      console.log(err);
      showToast("Failed to fetch network data", false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  // Helper to check if a user is in our "Following" list
  const isFollowingUser = (userId) => {
    return followings.some((u) => (u._id || u.id) === userId);
  };

  // Handle Follow / Unfollow logic
  const handleToggleFollow = async (user, currentlyFollowing) => {
    const userId = user._id || user.id;

    try {
      if (currentlyFollowing) {
        // Optimistic UI update: Remove from followings
        setFollowings((prev) => prev.filter((u) => (u._id || u.id) !== userId));
        // await api.post(`/users/unfollow/${userId}`);
      } else {
        // Optimistic UI update: Add to followings
        setFollowings((prev) => [user, ...prev]);
        // await api.post(`/users/follow/${userId}`);
      }
    } catch (err) {
      showToast("Action failed, please try again", false);
      fetchNetworkData();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] p-4 font-sans sm:p-8">
      <StudyMateHeader />
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-['Fraunces',_serif] text-3xl font-bold text-white sm:text-4xl">
            Network
          </h1>
          <p className="mt-2 text-slate-400">
            Manage your followers, people you follow, and discover new friends.
          </p>
        </div>

        {/* Top Section: Followers & Following (2 Columns) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Followers */}
          <section className="flex flex-col gap-4">
            <div className="mb-2 flex items-center gap-2">
              <FaUserFriends className="text-xl text-cyan-400" />
              <h2 className="text-xl font-bold text-white">
                Followers ({followers.length})
              </h2>
            </div>

            {followers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                You don't have any followers yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {followers.map((follower) => {
                  const isFollowing = isFollowingUser(
                    follower._id || follower.id
                  );
                  return (
                    <UserCard
                      key={`follower-${follower._id || follower.id}`}
                      user={follower}
                      isFollowing={isFollowing}
                      onToggleFollow={handleToggleFollow}
                    />
                  );
                })}
              </div>
            )}
          </section>

          {/* Right Column: Following */}
          <section className="flex flex-col gap-4">
            <div className="mb-2 flex items-center gap-2">
              <FaUserCheck className="text-xl text-cyan-400" />
              <h2 className="text-xl font-bold text-white">
                Following ({followings.length})
              </h2>
            </div>

            {followings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                You aren't following anyone yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {followings.map((following) => (
                  <UserCard
                    key={`following-${following._id || following.id}`}
                    user={following}
                    isFollowing={true}
                    onToggleFollow={handleToggleFollow}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Bottom Section: Find More Friends (Full Width Grid) */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <section className="flex flex-col gap-4">
            <div className="mb-4 flex items-center gap-2">
              <FaUserPlus className="text-xl text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Find More Friends</h2>
            </div>

            {discoverUsers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                No new users to discover right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {discoverUsers.map((user) => {
                  const isFollowing = isFollowingUser(user._id || user.id);
                  return (
                    <UserCard
                      key={`discover-${user._id || user.id}`}
                      user={user}
                      isFollowing={isFollowing}
                      onToggleFollow={handleToggleFollow}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;