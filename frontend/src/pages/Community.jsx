import { FaUsers } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import CommunitySidebar from "../components/Community/CommunitySidebar.jsx";
import CommunityHeader from "../components/Community/CommunityHeader.jsx";
import MessageFeed from "../components/Community/MessageFeed.jsx";
import MessageComposer from "../components/Community/MessageComposer.jsx";
import { useState } from "react";
import { api } from "../lib/axois.js";
import toast from "react-hot-toast";

export default function Community() {
  const [activeCommunity, setActiveCommunity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const getJoinedCommunities = async () => {
    try {
      const response = await api.get("/communities/joined");
      setJoinedCommunities(response.data.joinedCommunities);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch joined communities");
    }
  };
  const getCommunities = async () => {
    try {
      const response = await api.get("/communities");
      setCommunities(response.data.communities);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch communities");
    }
  };

  const getCommunityDetails = async (communityId) => {
    try {
      const response = await api.get(`/communities/${communityId}`);
      console.log(response.data.community.members);
      setCommunityMembers(response.data.community.members);
      return response.data.community;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async (activeCommunityId) => {
    const communityId = activeCommunityId || activeCommunity?._id;
    try {
      const response = await api.get(`/messages/${communityId}`);
      console.log("Api response for messages:", response.data);
      setMessages(response.data.messages ?? []);
      return response.data.messages ?? [];
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch messages");
      return [];
    }
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0B0D12] text-[#EDE7DA]">
      {/* header no longer needs a fixed height assumption */}
      <div className="shrink-0">
        <StudyMateHeader />
      </div>

      {/* lamp glow — cyan tint to match Note/Dashboard's cyan accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_92%_12%,rgba(34,211,238,0.06),transparent_32%),linear-gradient(180deg,rgba(11,13,18,1),rgba(7,8,11,1))]" />
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-60 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />

      {/* main now fills remaining space automatically via flex-1 + min-h-0 */}
      <main className="relative flex min-h-0 flex-1 overflow-hidden">
        {/* ---------------- Sidebar: communities ---------------- */}
        <CommunitySidebar
          setActiveCommunity={setActiveCommunity}
          activeCommunity={activeCommunity}
          setMessages={setMessages}
          getCommunities={getCommunities}
          communities={communities}
          joinedCommunities={joinedCommunities}
          setJoinedCommunities={setJoinedCommunities}
          getJoinedCommunities={getJoinedCommunities}
          getCommunityDetails={getCommunityDetails}
          fetchMessages={fetchMessages}
          setShowConfirmDialog={setShowConfirmDialog}
          showConfirmDialog={showConfirmDialog}
        />

        {/* ---------------- Main panel: community feed ---------------- */}
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {!activeCommunity ? (
            <div className="flex h-full items-center justify-center p-10 text-center">
              <div className="max-w-sm rounded-3xl border border-dashed border-white/15 bg-[#0B0D12]/30 px-6 py-10">
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/50">
                  <FaUsers className="text-lg" />
                </span>
                <p className="font-['Fraunces',_serif] text-xl font-medium text-white">
                  Select a community
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#EDE7DA]/50">
                  Pick a community from the left, or create/join one to start
                  asking doubts and chatting.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* community header — fixed */}
              <div className="shrink-0">
                <CommunityHeader
                  activeCommunity={activeCommunity}
                  getCommunities={getCommunities}
                  setActiveCommunity={setActiveCommunity}
                  getJoinedCommunities={getJoinedCommunities}
                  communityMembers={communityMembers}
                  getCommunityDetails={getCommunityDetails}
                  getJoinedCommunities={getJoinedCommunities}
                  setShowConfirmDialog={setShowConfirmDialog}
                  showConfirmDialog={showConfirmDialog}
                />
              </div>

              {/* messages / doubts feed — the only scrollable area */}
              <MessageFeed
                messages={messages}
                setMessages={setMessages}
                fetchMessages={fetchMessages}
                setShowConfirmDialog={setShowConfirmDialog}
                showConfirmDialog={showConfirmDialog}
              />

              {/* composer — fixed */}
              <div className="shrink-0">
                <MessageComposer
                  message={message}
                  setMessage={setMessage}
                  messages={messages}
                  setMessages={setMessages}
                  activeCommunity={activeCommunity}
                />
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
