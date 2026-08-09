import { FaUsers } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import CommunitySidebar from "../components/Community/CommunitySidebar.jsx";
import CommunityHeader from "../components/Community/CommunityHeader.jsx";
import MessageFeed from "../components/Community/MessageFeed.jsx";
import MessageComposer from "../components/Community/MessageComposer.jsx";
import { useState } from "react";
import { api } from "../lib/axois.js";
import { useToast } from "../context/ToastContext.jsx";

export default function Community() {
  const [activeCommunity, setActiveCommunity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { showToast } = useToast();

  const getJoinedCommunities = async () => {
    try {
      const response = await api.get("/communities/joined");
      setJoinedCommunities(response.data.joinedCommunities);
    } catch (err) {
      console.log(err);
      showToast("Failed to fetch joined communities", false);
    }
  };

  const getCommunities = async () => {
    try {
      const response = await api.get("/communities");
      setCommunities(response.data.communities);
    } catch (err) {
      console.log(err);
      showToast("Failed to fetch communities", false);
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
      showToast("Failed to fetch messages", false);
      return [];
    }
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      
      {/* 1. Top Navbar Wrapper — fixed explicit height so children can offset against it reliably */}
      <div className="flex-none h-20 relative z-50 border-b border-white/10 bg-[#0B0D12]/80 backdrop-blur-md">
        <StudyMateHeader />
      </div>

      {/* Modern Ambient Backglow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[20%] w-[1000px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-[100%]" />
        <div className="absolute bottom-0 right-[10%] w-[800px] h-[600px] bg-fuchsia-500/5 blur-[150px] rounded-[100%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <main className="relative z-10 flex min-h-0 flex-1 overflow-hidden">
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

        <section className="flex flex-col h-full flex-1 min-w-0 overflow-hidden relative">
          {!activeCommunity ? (
            <div className="flex h-full items-center justify-center p-10 text-center">
              <div className="max-w-md rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-8 py-12 backdrop-blur-sm">
                <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)]">
                  <FaUsers className="text-3xl" />
                </span>
                <p className="font-['Fraunces',_serif] text-2xl font-bold text-[#EDE7DA]">
                  Welcome to Community
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Select a community from the sidebar, or create a new one to start collaborating and learning together.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* 2. Community Header */}
              <div className="flex-none w-full relative z-20 bg-white/[0.01] border-b border-white/10 backdrop-blur-sm">
                <CommunityHeader
                  activeCommunity={activeCommunity}
                  getCommunities={getCommunities}
                  setActiveCommunity={setActiveCommunity}
                  getJoinedCommunities={getJoinedCommunities}
                  communityMembers={communityMembers}
                  getCommunityDetails={getCommunityDetails}
                  setShowConfirmDialog={setShowConfirmDialog}
                  showConfirmDialog={showConfirmDialog}
                />
              </div>

              {/* 3. Messages Wrapper */}
              <div className="flex-1 min-h-0 relative w-full overflow-hidden">
                <MessageFeed
                  messages={messages}
                  setMessages={setMessages}
                  fetchMessages={fetchMessages}
                  setShowConfirmDialog={setShowConfirmDialog}
                  showConfirmDialog={showConfirmDialog}
                />
              </div>

              {/* 4. Composer Wrapper */}
              <div className="flex-none w-full relative z-20 pb-4 px-4 lg:px-8 bg-gradient-to-t from-[#0B0D12] to-transparent">
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