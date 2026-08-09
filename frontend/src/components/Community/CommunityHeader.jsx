import { useEffect, useRef, useState } from "react";
import {
  FaHashtag,
  FaUsers,
  FaEllipsisV,
  FaKey,
  FaBell,
  FaSignOutAlt,
  FaCopy,
} from "react-icons/fa";

import { api } from "../../lib/axois.js";
import socket from "../../lib/socket.js";
import toast from "react-hot-toast";
import CommunityMemberCard from "./CommunityMemberCard.jsx";
import ConfirmDialog from "../Common/ConfirmDialog.jsx";
import useAuth from "../../context/useAuth.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const CommunityHeader = ({
  activeCommunity,
  getCommunities,
  setActiveCommunity,
  getJoinedCommunities,
  communityMembers,
  getCommunityDetails,
  setShowConfirmDialog,
  showConfirmDialog,
}) => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const menuRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLeaveCommunity = async () => {
    try {
      if(activeCommunity?.creatorId === user._id) {
        showToast("You cannot leave the community as you are the creator.", false);
        setShowConfirmDialog(false);
        return;
      }
      const response = await api.put(
        `/communities/leave/${activeCommunity._id}`,
      );
      showToast(response.data.message, true);
      await Promise.all([getCommunities(), getJoinedCommunities()]);
      socket.emit("leaveCommunity", activeCommunity._id);
      setActiveCommunity(null);
      setShowConfirmDialog(false);
    } catch (err) {
      console.log(err);
      showToast("Failed to leave community", false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        showToast("Copied to clipboard!", true);
        console.log("Copied to clipboard:", text);
      },
      (err) => {
        showToast("Failed to copy text!", false);
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="w-full flex items-center justify-between gap-4 px-6 py-4 sm:px-8 border-b border-white/10 bg-white/[0.01] backdrop-blur-sm">
      {showConfirmDialog && (
        <ConfirmDialog
          title="Leave Community"
          description="Are you sure you want to leave this community?"
          onCancel={() => setShowConfirmDialog(false)}
          onConfirm={handleLeaveCommunity}
          confirmButtonText="Leave"
        />
      )}
      
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xl font-bold text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
          {activeCommunity?.name?.[0]?.toUpperCase() || "?"}
        </span>
        <div className="min-w-0">
          <h2 className="truncate font-['Fraunces',_serif] text-lg font-bold text-[#EDE7DA]">
            {activeCommunity?.name || "Loading Hub..."}
          </h2>
          <p className="flex items-center gap-1.5 mt-1 truncate text-xs font-medium text-slate-400">
            <FaHashtag className="text-[10px] text-cyan-500/50" />
            General <span className="mx-1.5 h-1 w-1 rounded-full bg-slate-600" /> 
            {activeCommunity?.members?.length || 0} Members
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          onClick={() => setMembersOpen(true)}
          className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#EDE7DA]/80 transition hover:bg-white/10 hover:text-white sm:inline-flex"
        >
          <FaUsers className="text-sm" />
          Members
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#EDE7DA]/80 transition hover:bg-white/10 hover:text-white"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <FaEllipsisV className="text-sm" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#12141B]/95 p-1 shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => {
                  copyToClipboard(activeCommunity?.uniqueCode);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#EDE7DA] transition hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-2.5">
                  <FaKey className="text-xs text-cyan-400" />
                  <span>{activeCommunity?.uniqueCode}</span>
                </div>
                <FaCopy className="text-xs text-slate-500" />
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#EDE7DA] transition hover:bg-white/[0.06]"
              >
                <FaBell className="text-xs text-amber-400" />
                Notifications
              </button>

              <div className="my-1 h-px bg-white/5" />

              <button
                onClick={() => {
                  setShowConfirmDialog(true);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <FaSignOutAlt className="text-xs" />
                Leave Community
              </button>
            </div>
          )}
        </div>
      </div>

      {membersOpen && (
        <CommunityMemberCard
          setMembersOpen={setMembersOpen}
          activeCommunity={activeCommunity}
          communityMembers={communityMembers}
          getCommunityDetails={getCommunityDetails}
          getCommunities={getCommunities}
          getJoinedCommunities={getJoinedCommunities}
        />
      )}
    </div>
  );
};

export default CommunityHeader;