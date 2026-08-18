import { useState } from "react";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader";

// Dummy data to start with
const INITIAL_FRIENDS = [
  { id: 1, name: "Sarah Jenkins", username: "sarahj", imageUrl: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Marcus Doe", username: "marcus_d", imageUrl: "https://i.pravatar.cc/150?u=2" },
];

const INITIAL_SUGGESTED = [
  { id: 3, name: "Alex Chen", username: "alexc", imageUrl: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Emma Wilson", username: "emmaw", imageUrl: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Jordan Smith", username: "jsmith99", imageUrl: "https://i.pravatar.cc/150?u=5" },
];

// Reusable User Card Component
const UserCard = ({ user, isFollowing, onToggleFollow }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]">
      <div className="flex items-center gap-4 min-w-0">
        {/* Avatar */}
        <img
          src={user.imageUrl}
          alt={user.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover shadow-lg border border-white/10"
        />
        
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
        onClick={() => onToggleFollow(user)}
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

const FriendsPage = () => {
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [suggested, setSuggested] = useState(INITIAL_SUGGESTED);

  // Handle Following a suggested user
  const handleFollow = (userToFollow) => {
    setSuggested((prev) => prev.filter((u) => u.id !== userToFollow.id));
    setFriends((prev) => [userToFollow, ...prev]);
  };

  // Handle Unfollowing a current friend
  const handleUnfollow = (userToUnfollow) => {
    setFriends((prev) => prev.filter((u) => u.id !== userToUnfollow.id));
    setSuggested((prev) => [userToUnfollow, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0B1121] p-4 sm:p-8 font-sans">
        <StudyMateHeader />
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-['Fraunces',_serif] text-3xl font-bold text-white sm:text-4xl">
            Network
          </h1>
          <p className="mt-2 text-slate-400">
            Manage your friends and discover new people to follow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: My Friends */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <FaUserFriends className="text-cyan-400 text-xl" />
              <h2 className="text-xl font-bold text-white">
                My Friends ({friends.length})
              </h2>
            </div>
            
            {friends.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                You aren't following anyone yet.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {friends.map((friend) => (
                  <UserCard
                    key={friend.id}
                    user={friend}
                    isFollowing={true}
                    onToggleFollow={handleUnfollow}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Right Column: Suggested Friends */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <FaUserPlus className="text-cyan-400 text-xl" />
              <h2 className="text-xl font-bold text-white">
                Suggested for you
              </h2>
            </div>

            {suggested.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                No new suggestions right now.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {suggested.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isFollowing={false}
                    onToggleFollow={handleFollow}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;