import { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaUserCheck,
  FaUserPlus,
  FaStopwatch,
} from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader";
import { useToast } from "../context/ToastContext";
import { api } from "../lib/axois.js";

// Reusable User Card Component
const UserCard = ({ user, isFollowing, fetchNetworkData, isPending }) => {
  const { showToast } = useToast();
  console.log("UserCard props:", { user, isFollowing, isPending });
  const handleUnfollowUser = async () => {
    try {
      const userId = user._id || user.id;
      await api.put(`/unfollow/${userId}`);
      showToast(`You have unfollowed ${user.name}`, true);
      await fetchNetworkData(); // Refresh the network data after unfollowing
    } catch (err) {
      console.log(err);
      showToast("Failed to unfollow user", false);
    }
  };
  const handleFollowUser = async () => {
    try {
      const receiverId = user._id;
      const response = await api.post(`/send-request/${receiverId}`);
      console.log("Follow request sent:", response.data);
      await fetchNetworkData(); // Refresh the network data after following
      showToast(`Follow request sent to ${user.name}`, true);
    } catch (err) {
      console.log(err);
      showToast("Failed to follow user", false);
    }
  };

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
        onClick={() => {
          if (isFollowing) {
            handleUnfollowUser();
          } else if (!isPending) {
            handleFollowUser();
          }
        }}
        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 ${
          isFollowing
            ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            : isPending
              ? "cursor-not-allowed border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
              : "bg-cyan-500 text-black shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] hover:bg-cyan-400"
        }`}
      >
        {isFollowing ? (
          "Unfollow"
        ) : isPending ? (
          <>
            Pending <FaStopwatch className="inline ml-1" />
          </>
        ) : (
          "Follow"
        )}
      </button>
    </div>
  );
};

const NetworkPage = () => {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followRequests, setFollowRequests] = useState([]);
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const { showToast } = useToast();

  const fetchNetworkData = async () => {
    try {
      // Fetch Followers, Followings, and All Users concurrently
      const followersRes = await api.get("/users/followers");
      const followingsRes = await api.get("/users/followings");
      const getSentFollowRequests = await api.get("/sent-requests");
      const discoverUsersRes = await api.get("/users/discover");
      console.log("Discover Users data:", discoverUsersRes.data.users);
      setDiscoverUsers(discoverUsersRes.data.users || []);
      //console.log("Followers data:", followersRes.data);
      //console.log("Followings data:", followingsRes.data);
      //console.log("Sent follow requests data:", getSentFollowRequests.data);
      setFollowers(followersRes.data.data || []);
      setFollowings(followingsRes.data.data || []);
      setFollowRequests(getSentFollowRequests.data.requests || []);
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
    return followings.some((user) => String(user._id) === String(userId));
  };

  const isPendingUser = (userId) => {
    return followRequests.some(
      (request) =>
        String(request.receiver?._id) === String(userId) &&
        request.status === "pending",
    );
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
                  const userId = follower._id || follower.id;
                  const isFollowing = isFollowingUser(
                    follower._id || follower.id,
                  );
                  return (
                    <UserCard
                      key={`follower-${userId}`}
                      user={follower}
                      isFollowing={isFollowing}
                      isPending={isPendingUser(userId)}
                      fetchNetworkData={fetchNetworkData}
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
                {followings.map((following) => {
                  const userId = following._id || following.id;
                  return (
                    <UserCard
                      key={`following-${userId}`}
                      user={following}
                      isFollowing={true}
                      isPending={false}
                      fetchNetworkData={fetchNetworkData}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Bottom Section: Find More Friends (Full Width Grid) */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <section className="flex flex-col gap-4">
            <div className="mb-4 flex items-center gap-2">
              <FaUserPlus className="text-xl text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">
                Find More Friends
              </h2>
            </div>

            {discoverUsers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                No new users to discover right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {discoverUsers.map((user) => {
                  const userId = user._id || user.id;
                  const isFollowing = isFollowingUser(userId);
                  return (
                    <UserCard
                      key={`discover-${userId}`}
                      user={user}
                      isFollowing={isFollowing}
                      isPending={isPendingUser(userId)}
                      fetchNetworkData={fetchNetworkData}
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
