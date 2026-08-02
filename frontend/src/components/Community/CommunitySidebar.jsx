import { api } from "../../lib/axois.js";
import { FaPlus, FaSearch, FaUsers } from "react-icons/fa";
import CommunityCard from "./CommunityCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import socket from "../../lib/socket.js";
const CommunitySidebar = ({
  setActiveCommunity,
  activeCommunity,
  setMessages,
  getCommunities,
  communities,
  getJoinedCommunities,
  joinedCommunities,
  setJoinedCommunities,
}) => {
  const [createCommunities, setCreateCommunities] = useState({ name: "" });
  const [joinCommunityCode, setJoinCommunityCode] = useState({
    uniqueCode: "",
  });

  useEffect(() => {
    getCommunities();
    getJoinedCommunities();
  }, []);
  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try {
      if (createCommunities.name.trim() === "") {
        toast.error("Community name cannot be empty");
        return;
      }
      if (
        communities.some(
          (c) => c.name.toLowerCase() === createCommunities.name.toLowerCase(),
        )
      ) {
        toast.error("Community already exists");
        return;
      }
      if (communities.length >= 5) {
        toast.error("You can create only 5 communities");
        return;
      }
      const response = await api.post("/communities", createCommunities);
      await getCommunities();
      setCreateCommunities({ name: "" });
      toast.success(response.data.message);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create community");
    }
  };

  const handleJoinCommunity = async (e) => {
    e.preventDefault();
    try {
      console.log(activeCommunity);
      if (joinCommunityCode.uniqueCode.trim() === "") {
        toast.error("Community code cannot be empty");
        return;
      }
      if (
        joinedCommunities.some(
          (c) => c.uniqueCode === joinCommunityCode.uniqueCode,
        )
      ) {
        toast.error("You have already joined this community");
        return;
      }

      const response = await api.put("/communities/join", joinCommunityCode);
      console.log(response.data);
      const { findCommunity } = response.data;
      setJoinedCommunities([...joinedCommunities, findCommunity]);
      setJoinCommunityCode({ uniqueCode: "" });
      if(response.data.success) {
        socket.emit("joinCommunity", findCommunity._id);
      }
      toast.success(response.data.message);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to join community");
    }
  };

  return (
    <aside className="flex w-full max-w-xs shrink-0 flex-col border-r border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:max-w-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-400/10 text-cyan-200">
          <FaUsers className="text-sm" />
        </span>
        <h2 className="font-['Fraunces',_serif] text-xl font-medium tracking-tight text-white">
          Communities
        </h2>
      </div>

      {/* create community */}
      <form className="mt-5 space-y-3" onSubmit={handleCreateCommunity}>
        <input
          type="text"
          value={createCommunities.name}
          onChange={(e) =>
            setCreateCommunities({ ...createCommunities, name: e.target.value })
          }
          placeholder="Create a community (e.g. NEET Aspirants)"
          className="w-full rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60 focus:bg-[#0B0D12]/80 focus:ring-2 focus:ring-cyan-400/20"
        />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.5)] transition hover:bg-cyan-300 active:scale-[0.99]"
        >
          <FaPlus className="text-xs" />
          Create Community
        </button>
      </form>

      {/* join community */}
      <form className="mt-3 flex items-center gap-2">
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
          placeholder="Join with a code or name"
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0B0D12]/60 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
        />
        <button
          type="submit"
          onClick={handleJoinCommunity}
          className="shrink-0 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
        >
          Join
        </button>
      </form>

      {/* search */}
      <div className="relative mt-6">
        <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#EDE7DA]/35" />
        <input
          type="text"
          placeholder="Search your communities"
          className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/40 py-2.5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-cyan-400/60"
        />
      </div>

      {/* community list */}
      <div className="mt-4 flex-1 space-y-1.5 overflow-y-auto">
        <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
          Created
        </p>

        {communities.length > 0 ? (
          communities.map((community) => (
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
            />
          ))
        ) : (
          <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0B0D12]/30">
            <p className="px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
              Create a community to see it here
            </p>
          </div>
        )}
        <p className="mb-1 mt-5 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
          Joined
        </p>

        {joinedCommunities.length > 0 ? (
          joinedCommunities.map((community) => {
            console.log(joinedCommunities);
            return (
              <CommunityCard
                key={community._id}
                name={community.name}
                members={community.members.length}
                community={community}
                setActiveCommunity={setActiveCommunity}
                activeCommunity={activeCommunity}
                getCommunities={getCommunities}
                setMessages={setMessages}
              />
            );
          })
        ) : (
          <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0B0D12]/30">
            <p className="px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EDE7DA]/40">
              No communities joined
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CommunitySidebar;
