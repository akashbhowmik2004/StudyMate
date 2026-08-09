import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaUserMinus, FaSpinner } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import useAuth from "../../context/useAuth.jsx";
import {useToast} from "../../context/ToastContext.jsx";

const CommunityMemberCard = ({
  setMembersOpen,
  activeCommunity,
  communityMembers,
  getCommunityDetails,
  getJoinedCommunities,
  getCommunities,
}) => {
  const { user } = useAuth();
  const [confirmingId, setConfirmingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [canRemoveMembers, setCanRemoveMembers] = useState(false);
  const {showToast} = useToast();

  useEffect(() => {
    if (!activeCommunity) return;
    if (activeCommunity?.creatorId === user?._id) {
      setCanRemoveMembers(true);
    }
  }, [activeCommunity, user]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleRemoveClick = (member) => {
    const id = member?._id ;
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }
    handleConfirmRemove(member);
  };

  const handleConfirmRemove = async (member) => {
    const memberId = member?._id;
    try {
      setRemovingId(memberId);
      await api.put(`/communities/remove-member/${memberId}`, { id: activeCommunity?._id });
      showToast(`${member?.username || "Member"} removed successfully`, true);
      await getCommunityDetails(activeCommunity?._id);
      await getCommunities();
      await getJoinedCommunities();
      setMembersOpen(false);
    } catch (error) {
      console.error("Error removing member:", error.response);
      if(error.response?.status === 403) {
        showToast(error.response?.data.message || "You are not authorized to remove this member.", false);
      }
      else {
        showToast("Failed to remove member", false);
      }
    } finally {
      setRemovingId(null);
      setConfirmingId(null);
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#0B0D12]/80 px-4 py-8 backdrop-blur-xl transition-all"
      onClick={() => setMembersOpen(false)}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#12141B] to-[#0B0D12] shadow-2xl shadow-cyan-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-6 py-5">
          <div>
            <h3 className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">
              Hub Members
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {communityMembers?.length || 0} active members
            </p>
          </div>
          <button
            onClick={() => setMembersOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Close members list"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 no-scrollbar">
          {communityMembers?.length ? (
            communityMembers.map((member) => {
              const displayName = member?.username || member?.name || member?.email || "Unknown";
              const id = member?._id || member?.id || displayName;
              const isConfirming = confirmingId === id;
              const isRemoving = removingId === id;
              const memberIsAdmin = member?._id === activeCommunity?.creatorId;
              
              return (
                <div
                  key={id}
                  className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-white/[0.04]"
                >
                  {member?.avatar ? (
                    <img
                      src={member.avatar}
                      alt={displayName}
                      className="h-11 w-11 shrink-0 rounded-[1rem] object-cover border border-white/10"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-cyan-500/10 border border-cyan-500/20 text-sm font-bold text-cyan-300">
                      {displayName[0]?.toUpperCase()}
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#EDE7DA]">
                      {displayName}
                    </p>
                    {member?.email && member?.username && (
                      <p className="truncate text-[11px] font-medium text-slate-500">
                        {member.email}
                      </p>
                    )}
                  </div>
                  
                  {memberIsAdmin ? (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Admin
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Member
                    </span>
                  )}

                  {canRemoveMembers && !memberIsAdmin && (
                    <button
                      onClick={() => handleRemoveClick(member)}
                      disabled={isRemoving}
                      className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        isConfirming
                          ? "bg-red-500/20 text-red-400"
                          : "bg-transparent text-[#EDE7DA]/0 group-hover:bg-red-500/10 group-hover:text-red-400"
                      } disabled:opacity-50`}
                      aria-label={isConfirming ? `Confirm removal of ${displayName}` : `Remove ${displayName}`}
                    >
                      {isRemoving ? <FaSpinner className="animate-spin text-sm" /> : <FaUserMinus className="text-sm" />}
                      {isConfirming && <span>{isRemoving ? "..." : "Confirm"}</span>}
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="py-10 text-center text-sm font-medium text-slate-500 italic">
              No members found.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CommunityMemberCard;