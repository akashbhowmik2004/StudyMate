import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaUserMinus, FaSpinner } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import useAuth from "../../context/useAuth.jsx";
import toast from "react-hot-toast";


const CommunityMemberCard = ({
  setMembersOpen,
  activeCommunity,
  communityMembers,
  getCommunityDetails,
  getJoinedCommunities,
  getCommunities,
}) => {
  let isAdmin = false;
  const { user } = useAuth();
  const [confirmingId, setConfirmingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [canRemoveMembers, setCanRemoveMembers] = useState(false);

  if(activeCommunity?.creatorId === user?._id) {
    isAdmin = true;
  }

  useEffect(() => {
    if (!activeCommunity) return;
    if (activeCommunity?.creatorId === user?._id) {
      setCanRemoveMembers(true);
    }
  }, [activeCommunity, user]);

  // lock background scroll while the modal is open
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
      toast.success(`${member?.username || "Member"} removed successfully`);
      // Refresh community details after removing a member
      await getCommunityDetails(activeCommunity?._id);
      await getCommunities();
      await getJoinedCommunities();
      setMembersOpen(false);
    } catch (error) {
      console.error("Error removing member:", error.response);
      if(error.response?.status === 403) {
        toast.error(error.response?.data.message || "You are not authorized to remove this member.");
      }
      else {
        toast.error("Failed to remove member");
      }
    } finally {
      setRemovingId(null);
      setConfirmingId(null);
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm px-4 pt-24 pb-4"
      onClick={() => setMembersOpen(false)}
    >
      <div
        className="flex max-h-[75vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/95 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="font-['Fraunces',_serif] text-base font-medium text-white">
              Members
            </h3>
            <p className="text-xs text-[#EDE7DA]/45">
              {communityMembers?.length || 0} total
            </p>
          </div>
          <button
            onClick={() => setMembersOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#EDE7DA]/60 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Close members list"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {communityMembers?.length ? (
            communityMembers.map((member) => {
              const displayName =
                member?.username || member?.name || member?.email || "Unknown";
              const id = member?._id || member?.id || displayName;
              const isConfirming = confirmingId === id;
              const isRemoving = removingId === id;
              const memberIsAdmin = member?._id === activeCommunity?.creatorId;
              return (
                <div
                  key={id}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.06]"
                >
                  {member?.avatar ? (
                    <img
                      src={member.avatar}
                      alt={displayName}
                      className="h-9 w-9 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EDE7DA]/15 text-sm font-semibold text-white">
                      {displayName[0]?.toUpperCase()}
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {displayName}
                    </p>
                    {member?.email && member?.username && (
                      <p className="truncate text-xs text-[#EDE7DA]/45">
                        {member.email}
                      </p>
                    )}
                  </div>
                  {memberIsAdmin ? (
                    <span className="flex shrink-0 items-center gap-1 rounded-lg bg-[#EDE7DA]/10 px-2 py-1 text-[10px] font-medium text-[#EDE7DA]/70">
                      Admin
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1 rounded-lg bg-[#EDE7DA]/10 px-2 py-1 text-[10px] font-medium text-[#EDE7DA]/70">
                      Member
                    </span>
                  )}

                  {canRemoveMembers && (
                    <button
                      onClick={() => handleRemoveClick(member)}
                      disabled={isRemoving}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                        isConfirming
                          ? "bg-red-500/20 text-red-400"
                          : "text-[#EDE7DA]/0 group-hover:text-[#EDE7DA]/50 hover:!bg-red-500/10 hover:!text-red-400"
                      } disabled:opacity-60`}
                      aria-label={
                        isConfirming
                          ? `Confirm removal of ${displayName}`
                          : `Remove ${displayName}`
                      }
                    >
                      {isRemoving ? (
                        <FaSpinner className="animate-spin text-xs" />
                      ) : (
                        <FaUserMinus className="text-xs" />
                      )}
                      {isConfirming && (
                        <span>{isRemoving ? "Removing…" : "Confirm"}</span>
                      )}
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="px-3 py-6 text-center text-sm text-[#EDE7DA]/45">
              No members to show.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CommunityMemberCard;