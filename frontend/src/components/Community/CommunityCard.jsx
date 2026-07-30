import { FiX } from "react-icons/fi";
import { api } from "../../lib/axois.js";
import toast from "react-hot-toast";
const CommunityCard = ({
  name,
  members,
  community,
  activeCommunity,
  setActiveCommunity,
  getCommunities,
  setMessages
}) => {
  const isActive = activeCommunity?._id === community._id;
  const handleDeleteCommunity = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/communities/${community._id}`);
      toast.success(response.data.message);
      await getCommunities();
      if (activeCommunity?._id === community._id) {
        setActiveCommunity(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete community");
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/${community?._id}`);
      setMessages(response.data.messages);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch messages");
    }
  };

  return (
    <>
      <div
        className={`group flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition ${
          isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
        }`}
      >
        <button
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          onClick={() => {
            setActiveCommunity(community);
            fetchMessages();
          }}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
              isActive
                ? "bg-[#EDE7DA]/15 text-white"
                : "bg-white/[0.06] text-[#EDE7DA]/80"
            }`}
          >
            {community.name[0].toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-white">
              {name}
            </span>
            <span className="block truncate text-xs text-[#EDE7DA]/45">
              {members} members
            </span>
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCommunity(e);
          }}
          aria-label={`Delete ${name}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#EDE7DA]/40 opacity-0 transition hover:bg-white/[0.08] hover:text-white group-hover:opacity-100"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

export default CommunityCard;
