import { useState, useRef, useEffect } from "react";
import { FaCheck, FaCopy, FaUserFriends, FaUserPlus } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { api } from "../lib/axois.js";
import ProfileCard from "../components/Profile/ProfileCard.jsx";
import useAuth from "../context/useAuth.jsx";
import UserCard from "../components/Profile/UserCard.jsx";

// --- Reusable Avatar Logic from previous components ---
const AVATAR_PALETTES = [
  "bg-cyan-500/15 text-cyan-200 border-cyan-500/20",
  "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/20",
  "bg-amber-500/15 text-amber-200 border-amber-500/20",
  "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
];

const paletteFor = (name) =>
  AVATAR_PALETTES[name.charCodeAt(0) % AVATAR_PALETTES.length];

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({
  name,
  size = "h-16 w-16",
  className = "",
  imageUrl = null,
}) => {
  return (
    <div
      className={`relative flex ${size} shrink-0 items-center justify-center rounded-[1.5rem] border text-xl font-bold backdrop-blur-md overflow-hidden ${
        imageUrl ? "border-white/10" : paletteFor(name)
      } ${className}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  );
};

// --- Main Component ---
const AccountPage = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();
  // --- State: Current User Profile ---
  const [profile, setProfile] = useState({});

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editUsernameVal, setEditUsernameVal] = useState(profile.username);
  
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editBioVal, setEditBioVal] = useState(profile.desc || "");
  
  const [followInput, setFollowInput] = useState("");
  const [followRequestsId, setFollowRequestsId] = useState("");

  const [loading, setLoading] = useState(true);

  // --- State: Dummy Data for Requests ---
  const [pendingRequests, setPendingRequests] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await api.get(`/users/${user._id}`);
      setProfile(response.data.otherDetails);
      setEditUsernameVal(response.data.otherDetails.username);
      setEditBioVal(response.data.otherDetails.desc || "");

      console.log("Fetched user data:", response.data.otherDetails);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchPendingRequests = async () => {
    try {
      const response = await api.get("/requests");
      setFollowRequestsId(
        response.data.requests.map((req) => {
          console.log("Request ID:", req._id);
          return req._id;
        }),
      );
      console.log("Fetched pending requests:", response.data.requests);
      setPendingRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUserData(), fetchPendingRequests()]);
      setLoading(false);
    };
    loadData();
  }, [user._id]);

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA] flex items-center justify-center">
        <div className="text-cyan-400">Loading Account...</div>
      </div>
    );
  }

  // --- Handlers ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await api.patch("/users/profile", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (response.data.success) {
          setProfile(response.data.user);
          setUser(response.data.user);
          showToast("Profile picture updated successfully!");
        }
      } catch (error) {
        console.error("Error uploading image", error);
        showToast("Failed to upload profile picture.", false);
      }
    }
  };

  const handleSaveUsername = async () => {
    if (!editUsernameVal.trim()) {
      showToast("Username cannot be empty", false);
      return;
    }
    try {
      const response = await api.patch("/users/profile", { username: editUsernameVal.trim() });
      if (response.data.success) {
        setProfile(response.data.user);
        setUser(response.data.user);
        setIsEditingUsername(false);
        showToast("Username updated successfully!");
      }
    } catch (error) {
      console.error("Error saving username", error);
      showToast(error.response?.data?.message || "Failed to update username.", false);
    }
  };

  const handleSaveBio = async () => {
    if (editBioVal.length > 50) {
      showToast("Bio cannot exceed 50 characters", false);
      return;
    }
    try {
      const response = await api.patch("/users/profile", { desc: editBioVal.trim() });
      if (response.data.success) {
        setProfile(response.data.user);
        setUser(response.data.user);
        setIsEditingBio(false);
        showToast("Bio updated successfully!");
      }
    } catch (error) {
      console.error("Error saving bio", error);
      showToast(error.response?.data?.message || "Failed to update bio.", false);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(profile.uniqueId);
    console.log(pendingRequests);
    showToast("Unique ID copied to clipboard!");
  };

  // --- Handlers for Follow Requests ---
  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!followInput.trim()) return;

    // Simulate sending request
    if (followInput.toUpperCase() === profile.uniqueId) {
      showToast("You cannot follow yourself!", false);
      return;
    }
    showToast(`Follow request sent to ${followInput.toUpperCase()}!`);
    setFollowInput("");
  };
  const handleSendRequestByUniqueId = async (e) => {
    e.preventDefault();
    if (!followInput.trim()) {
      showToast("Please enter a unique ID.", false);
      return;
    }
    try {
      const response = await api.post("/send-request-by-unique-id", {
        uniqueId: followInput.toUpperCase(),
      });
      showToast(response.data.message);
      setFollowInput("");
    } catch (error) {
      console.error("Error sending follow request:", error);
      showToast(
        error.response?.data?.message || "Failed to send follow request.",
        false,
      );
      //showToast("Failed to send follow request.", false);
    }
  };
  const handleAcceptRequest = async (senderId, requestId, name) => {
    try {
      await api.put(`/accept-request/${senderId}`, {
        requestId: requestId,
      });
      setPendingRequests((prev) =>
        prev.filter((request) => request._id !== requestId),
      );
      await fetchUserData();
      showToast(`You accepted ${name}'s follow request!`);
    } catch (error) {
      console.error("Error accepting follow request:", error);
      showToast("Failed to accept follow request.", false);
    }
  };

  const handleDeclineRequest = async (senderId, requestId, name) => {
    try {
      await api.put(`/reject-request/${senderId}`, {
        requestId: requestId,
      });
      setPendingRequests((prev) => prev.filter((req) => req._id !== requestId));
      showToast(`You declined ${name}'s follow request.`, false); // Red toast for decline
    } catch (err) {
      console.error("Error declining follow request:", err);
      showToast("Failed to decline follow request.", false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      <div className="shrink-0 relative z-50">
        <StudyMateHeader />
      </div>

      {/* Modern Ambient Backglow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-[100%]" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-fuchsia-500/5 blur-[150px] rounded-[100%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 lg:px-8">
        <header className="mb-8">
          <h1 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA]">
            Account Settings
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-400">
            Manage your profile, unique ID, and connections.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* LEFT COLUMN: Profile Info & Customization */}
          <section className="flex flex-col gap-8">
            {/* Profile Card */}
            <article className="rounded-[2.5rem] border border-white/5 bg-[#12141B]/40 p-8 shadow-xl backdrop-blur-xl">
              <ProfileCard
                profile={profile}
                Avatar={Avatar}
                fileInputRef={fileInputRef}
                isEditingUsername={isEditingUsername}
                editUsernameVal={editUsernameVal}
                handleImageUpload={handleImageUpload}
                handleSaveUsername={handleSaveUsername}
                setEditUsernameVal={setEditUsernameVal}
                setIsEditingUsername={setIsEditingUsername}
                isEditingBio={isEditingBio}
                editBioVal={editBioVal}
                setEditBioVal={setEditBioVal}
                setIsEditingBio={setIsEditingBio}
                handleSaveBio={handleSaveBio}
              />

              {/* Stats Bar */}
              <div className="mt-8 flex items-center gap-8 border-t border-white/5 pt-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Posts
                  </p>
                  <p className="mt-1 font-['Fraunces',_serif] text-2xl font-bold text-white">
                    {profile.doubtsCount || 0}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Followers
                  </p>
                  <p className="mt-1 font-['Fraunces',_serif] text-2xl font-bold text-white">
                    {profile.followers?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Following
                  </p>
                  <p className="mt-1 font-['Fraunces',_serif] text-2xl font-bold text-white">
                    {profile.followings?.length || 0}
                  </p>
                </div>
              </div>
            </article>

            {/* Unique ID Card */}
            <article className="rounded-[2.5rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
                  <FaUserFriends className="text-xl" />
                </div>
                <div>
                  <h3 className="font-['Fraunces',_serif] text-xl font-bold text-white">
                    Your Unique ID
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400">
                    Share this ID with classmates so they can find your profile
                    and send a follow request.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-[#0B0D12]/50 p-4 backdrop-blur-md">
                <span className="font-['Fraunces',_serif] text-2xl font-black tracking-widest text-cyan-300">
                  {profile.uniqueId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/40"
                >
                  <FaCopy /> Copy
                </button>
              </div>
            </article>
          </section>

          {/* RIGHT COLUMN: Social & Connections */}
          <section className="flex flex-col gap-8">
            {/* Add Friend / Follow By ID */}
            <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-xl backdrop-blur-xl">
              <h3 className="font-['Fraunces',_serif] text-2xl font-bold text-white mb-2">
                Follow a Student
              </h3>
              <p className="text-sm font-medium text-slate-400 mb-6">
                Know someone's unique ID? Enter it below to follow them and see
                their notes.
              </p>

              <form
                onSubmit={handleSendRequest}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
                  <input
                    type="text"
                    value={followInput}
                    onChange={(e) => setFollowInput(e.target.value)}
                    placeholder="Enter Unique ID (e.g., AKB-035)"
                    className="w-full bg-transparent text-sm font-bold uppercase tracking-wider text-[#EDE7DA] placeholder:normal-case placeholder:tracking-normal placeholder:text-[#EDE7DA]/30 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!followInput.trim()}
                  onClick={handleSendRequestByUniqueId}
                  className="inline-flex h-[54px] shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-cyan-500 px-8 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-400 disabled:opacity-50 disabled:shadow-none active:scale-95"
                >
                  <FaUserPlus className="text-sm" /> Send
                </button>
              </form>
            </article>

            {/* Pending Requests */}
            <article className="flex-1 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-5">
                <h3 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
                  Requests
                </h3>
                <span className="rounded-full bg-fuchsia-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-fuchsia-300">
                  {pendingRequests.length} Pending
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((req) => (
                    <div
                      key={req.sender._id}
                      className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]"
                    >
                      <UserCard
                        req={req}
                        Avatar={Avatar}
                        handleAcceptRequest={handleAcceptRequest}
                        handleDeclineRequest={handleDeclineRequest}
                        setPendingRequests={setPendingRequests}
                        fetchUserData={fetchUserData}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-500 mb-4">
                      <FaCheck className="text-xl" />
                    </div>
                    <p className="font-['Fraunces',_serif] text-lg font-bold text-white">
                      All caught up!
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      You have no pending follow requests.
                    </p>
                  </div>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
