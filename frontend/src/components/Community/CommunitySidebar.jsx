import { api } from "../../lib/axois.js";
import { FaPlus, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import CommunityCard from "./CommunityCard";
import { useState, useEffect } from "react";
import socket from "../../lib/socket.js";
import { useToast } from "../../context/ToastContext.jsx";

const CommunitySidebar = ({
  setActiveCommunity,
  activeCommunity,
  setMessages,
  getCommunities,
  communities,
  getJoinedCommunities,
  joinedCommunities,
  setJoinedCommunities,
  getCommunityDetails,
  fetchMessages,
  setShowConfirmDialog,
  showConfirmDialog,
}) => {
  const [createCommunities, setCreateCommunities] = useState({ name: "" });
  const [joinCommunityCode, setJoinCommunityCode] = useState({
    uniqueCode: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    console.log("Created Communities:", communities);
    getCommunities();
    getJoinedCommunities();
  }, []);

  const handleCreateCommunity = async (e) => {
    e.preventDefault();

    try {
      if (createCommunities.name.trim() === "") {
        showToast("Community name cannot be empty", false);
        return;
      }
      if (
        communities.some(
          (c) => c.name.toLowerCase() === createCommunities.name.toLowerCase(),
        )
      ) {
        showToast("Community name already exists", false);
        return;
      }
      if (communities.length >= 5) {
        showToast("You can create only 5 communities", false);
        return;
      }
      const response = await api.post("/communities", createCommunities);
      await getCommunities();
      setCreateCommunities({ name: "" });
      showToast(response.data.message, true);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      showToast("Failed to create community", false);
    }
  };

  const handleJoinCommunity = async (e) => {
    e.preventDefault();
    try {
      console.log(activeCommunity);
      if (joinCommunityCode.uniqueCode.trim() === "") {
        showToast("Community code cannot be empty", false);
        return;
      }
      if (
        joinedCommunities.some(
          (c) => c.uniqueCode === joinCommunityCode.uniqueCode,
        )
      ) {
        showToast("You have already joined this community", false);
        return;
      }

      const response = await api.put("/communities/join", joinCommunityCode);
      console.log(response.data);
      const { findCommunity } = response.data;
      setJoinedCommunities([...joinedCommunities, findCommunity]);
      await getCommunities();
      await getJoinedCommunities();
      setJoinCommunityCode({ uniqueCode: "" });
      if (response.data.success) {
        socket.emit("joinCommunity", findCommunity._id);
      }
      showToast(response.data.message, true);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      if(err.response?.status === 404) {
        showToast(err.response?.data.message || "Community not found", false);
        setJoinCommunityCode({ uniqueCode: "" });
      } else {
        showToast("Failed to join community", false);
      }
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#0B0D12]/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        className="fixed left-4 top-24 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#12141B]/90 text-[#EDE7DA] shadow-xl backdrop-blur-md transition hover:bg-white/10 lg:hidden"
      >
        {sidebarOpen ? (
          <FaTimes className="text-lg" />
        ) : (
          <FaBars className="text-lg" />
        )}
      </button>

      <aside
        className={`fixed left-0 top-20 z-40 flex h-[calc(100vh-5rem)] w-full max-w-[320px] shrink-0 flex-col border-r border-white/5 bg-gradient-to-b from-[#0B0D12]/95 to-[#0B0D12]/80 backdrop-blur-2xl transition-transform duration-300 ease-in-out overflow-y-auto no-scrollbar lg:sticky lg:top-0 lg:h-full lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-6 shrink-0" />

        <div className="space-y-6 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 border border-cyan-500/20 text-cyan-300 shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
              <FaUsers className="text-lg" />
            </span>
            <h2 className="font-['Fraunces',_serif] text-2xl font-bold tracking-tight text-[#EDE7DA]">
              Communities
            </h2>
          </div>

          <form className="group relative" onSubmit={handleCreateCommunity}>
            <div className="absolute -inset-0.5 rounded-[1.25rem] bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 opacity-0 blur transition duration-500 group-focus-within:opacity-100" />
            <div className="relative flex flex-col space-y-3 rounded-2xl bg-[#0B0D12] p-3 border border-white/5">
              <input
                type="text"
                value={createCommunities.name}
                onChange={(e) =>
                  setCreateCommunities({
                    ...createCommunities,
                    name: e.target.value,
                  })
                }
                placeholder="New community name..."
                className="w-full rounded-xl bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[#EDE7DA] outline-none transition placeholder:text-[#EDE7DA]/30 focus:bg-white/[0.06]"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition hover:bg-cyan-400 active:scale-[0.98]"
              >
                <FaPlus className="text-xs" /> Create Community
              </button>
            </div>
          </form>

          <form className="flex items-center gap-2">
            <input
              type="text"
              value={joinCommunityCode.uniqueCode}
              name="uniqueCode"
              onChange={(e) =>
                setJoinCommunityCode({
                  ...joinCommunityCode,
                  uniqueCode: e.target.value,
                })
              }
              placeholder="Paste unique code..."
              className="min-w-0 flex-1 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-medium text-[#EDE7DA] outline-none transition placeholder:text-[#EDE7DA]/30 focus:border-cyan-500/30 focus:bg-white/[0.04]"
            />
            <button
              type="submit"
              onClick={handleJoinCommunity}
              className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-[#EDE7DA] transition hover:bg-white/10 hover:text-white"
            >
              Join
            </button>
          </form>

          <div className="space-y-6">
            <div>
              <p className="mb-3 px-1 text-xs font-bold uppercase tracking-widest text-[#EDE7DA]/40">
                Created by you
              </p>
              {communities.length > 0 ? (
                <div className="space-y-2">
                  {communities.map((community) => (
                    <CommunityCard
                      key={community._id}
                      name={community.name}
                      members={community.members.length}
                      community={community}
                      setActiveCommunity={setActiveCommunity}
                      activeCommunity={activeCommunity}
                      getCommunities={getCommunities}
                      getJoinedCommunities={getJoinedCommunities}
                      setMessages={setMessages}
                      getCommunityDetails={getCommunityDetails}
                      fetchMessages={fetchMessages}
                      setShowConfirmDialog={setShowConfirmDialog}
                      showConfirmDialog={showConfirmDialog}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                  <p className="text-xs font-medium text-[#EDE7DA]/30">
                    No Community created yet
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="mb-3 px-1 text-xs font-bold uppercase tracking-widest text-[#EDE7DA]/40">
                Joined Communities
              </p>
              {joinedCommunities.length > 0 ? (
                <div className="space-y-2">
                  {joinedCommunities.map((community) => (
                    <CommunityCard
                      key={community._id}
                      name={community.name}
                      members={community.members.length}
                      community={community}
                      setActiveCommunity={setActiveCommunity}
                      activeCommunity={activeCommunity}
                      getCommunities={getCommunities}
                      getJoinedCommunities={getJoinedCommunities}
                      setMessages={setMessages}
                      getCommunityDetails={getCommunityDetails}
                      fetchMessages={fetchMessages}
                      setShowConfirmDialog={setShowConfirmDialog}
                      showConfirmDialog={showConfirmDialog}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                  <p className="text-xs font-medium text-[#EDE7DA]/30">
                    Not in any communities
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-10 shrink-0" />
      </aside>
    </>
  );
};

export default CommunitySidebar;
