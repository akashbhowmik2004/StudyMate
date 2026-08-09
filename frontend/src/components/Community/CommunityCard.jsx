import { FiX } from "react-icons/fi";
import { api } from "../../lib/axois.js";
import toast from "react-hot-toast";
import socket from "../../lib/socket.js";
import ConfirmDialog from "../Common/ConfirmDialog.jsx";
import useAuth from "../../context/useAuth.jsx";
import {useToast} from "../../context/ToastContext.jsx";

const CommunityCard = ({
  name,
  members,
  community,
  activeCommunity,
  setActiveCommunity,
  getCommunities,
  getJoinedCommunities,
  setMessages,
  getCommunityDetails,
  fetchMessages,
  setShowConfirmDialog,
  showConfirmDialog,
}) => {
  const { user } = useAuth();
  const isActive = activeCommunity?._id === community._id;
  const isCreator = community.creatorId === user?._id;
  const { showToast } = useToast();

  const handleDeleteCommunity = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/communities/${community._id}`);
      showToast(response.data.message, true);
      await Promise.all([getCommunities(), getJoinedCommunities()]);
      setShowConfirmDialog(false);
      if (activeCommunity?._id === community._id) {
        setActiveCommunity(null);
      }
    } catch (err) {
      console.log(err.status);
      if (err.status === 403) {
        showToast("You can not delete this community", false);
      } else showToast("Failed to delete community", false);
    }
  };

  const onSelectCommunity = async () => {
    console.log("Selected community:", community);
    try {
      if (activeCommunity?._id) {
        socket.emit("leaveCommunity", activeCommunity._id);
      }
      socket.emit("joinCommunity", community._id);
      const messages = await fetchMessages(community._id);
      setMessages(messages);
      setActiveCommunity(community);
    } catch (err) {
      showToast("Failed to fetch messages", false);
      console.log(err);
    }
  };

  return (
    <>
      {showConfirmDialog && (
        <ConfirmDialog
          onConfirm={handleDeleteCommunity}
          onCancel={() => setShowConfirmDialog(false)}
          title="Delete Community"
          description="Are you sure you want to delete this community?"
        />
      )}
      <div
        className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-200 border ${
          isActive
            ? "border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-transparent shadow-[inset_4px_0_0_0_rgba(34,211,238,1)]"
            : "border-transparent hover:border-white/5 hover:bg-white/[0.04]"
        }`}
      >
        <button
          className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none"
          onClick={() => {
            onSelectCommunity();
            getCommunityDetails(community._id);
          }}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] text-sm font-bold transition-colors ${
              isActive
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-white/5 text-[#EDE7DA]/80 group-hover:bg-white/10 group-hover:text-white"
            }`}
          >
            {community.name[0].toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block truncate text-sm font-bold transition-colors ${
              isActive ? "text-cyan-50" : "text-[#EDE7DA] group-hover:text-white"
            }`}>
              {name}
            </span>
            <span className="block truncate text-[11px] font-medium text-slate-500">
              {members} {members === 1 ? 'member' : 'members'}
            </span>
          </span>
        </button>

        {isCreator && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmDialog(true);
            }}
            aria-label={`Delete ${name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-500 opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
    </>
  );
};

export default CommunityCard;