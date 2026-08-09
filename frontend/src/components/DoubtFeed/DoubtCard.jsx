import { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaShareAlt,
  FaEllipsisH,
  FaEdit,
  FaTrashAlt,
  FaPaperPlane,
} from "react-icons/fa";
import CommentBlock from "./CommentBlock.jsx";
import formatTime from "../../lib/formateTime.js";
import useAuth from "../../context/useAuth.jsx";

const DoubtCard = ({
  doubt,
  onLike,
  onDelete,
  onEdit,
  onAddComment,
  onShare,
  currentUser,
  Avatar,
  userInfo,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(doubt.title);
  const [editContent, setEditContent] = useState(doubt.content);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const menuRef = useRef(null);
  const { user } = useAuth();

  const isMine = doubt.userId === user._id;

  
  const saveEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(doubt.id, { title: editTitle.trim(), content: editContent.trim() });
    setIsEditing(false);
  };
  console.log("DoubtCard Rendered:", doubt.createdAt); // Debugging log
  console.log("DoubtCard Rendered:", doubt); // Debugging log
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-1 transition-all hover:border-white/10 hover:shadow-xl hover:shadow-cyan-900/10">
      <div className="rounded-[1.75rem] bg-[#0B0D12]/80 p-6 backdrop-blur-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={userInfo?.username || "Unknown"} />
            <div>
              <p className="text-sm font-bold text-[#EDE7DA]">{userInfo?.username || "Unknown"}</p>
              <p className="text-[11px] font-medium tracking-wide text-cyan-200/50 uppercase">
                {formatTime(doubt.createdAt)}
              </p>
            </div>
          </div>

          {isMine && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#EDE7DA]/40 transition hover:bg-white/10 hover:text-[#EDE7DA]"
              >
                <FaEllipsisH className="text-xs" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#12141B]/95 p-1 backdrop-blur-xl shadow-2xl">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setIsEditing(true);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#EDE7DA]/80 transition hover:bg-cyan-500/10 hover:text-cyan-200"
                  >
                    <FaEdit className="text-[11px]" /> Edit Post
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(doubt.id);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <FaTrashAlt className="text-[11px]" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        {isEditing ? (
          <div className="mt-5 space-y-4 rounded-2xl bg-white/[0.02] p-4 border border-white/10">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-transparent font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA] outline-none"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#EDE7DA]/70 outline-none"
            />
            <div className="flex justify-end gap-2 border-t border-white/5 pt-3">
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#EDE7DA]/50 hover:bg-white/5 hover:text-[#EDE7DA]"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="rounded-lg bg-cyan-500/20 px-4 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 pl-2">
            <h2 className="font-['Fraunces',_serif] text-2xl font-bold leading-tight text-[#EDE7DA] group-hover:text-cyan-50 transition-colors">
              {doubt.title}
            </h2>
            {doubt.content && (
              <p className="mt-3 text-sm leading-relaxed text-[#EDE7DA]/60">
                {doubt.content}
              </p>
            )}
            {doubt.imageUrl && (
              <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-white/5">
                <img
                  src={doubt.imageUrl}
                  alt="Doubt attachment"
                  className="w-full object-cover max-h-96 hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            )}
          </div>
        )}

        {/* Action Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onLike(doubt.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
              doubt.likedByMe
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                : "border-white/10 bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10 hover:text-[#EDE7DA]"
            }`}
          >
            {doubt.likedByMe ? (
              <FaHeart className="text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            ) : (
              <FaRegHeart className="text-sm" />
            )}
            {doubt.likes}
          </button>

          <button
            onClick={() => setShowComments((p) => !p)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-[#EDE7DA]"
          >
            <FaRegCommentDots className="text-sm" />

            <span className="hidden sm:inline">Answers</span>
          </button>

          <button
            onClick={() => onShare(doubt)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-[#EDE7DA] ml-auto"
          >
            <FaShareAlt className="text-xs" />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 animate-in slide-in-from-top-2 relative border-t border-white/5 pt-2">
            <div className="space-y-2 pl-4">
              {doubt.comments.length > 0 ? (
                doubt.comments.map((c) => (
                  <CommentBlock key={c.id} comment={c} Avatar={Avatar} />
                ))
              ) : (
                <div className="py-6 text-center text-sm font-medium text-slate-500 italic">
                  No answers yet. Share your knowledge!
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-2 transition-colors focus-within:border-cyan-500/30 focus-within:bg-white/[0.04]">
              <Avatar
                name={currentUser.name}
                size="h-9 w-9"
                className="rounded-xl ml-1"
              />
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  commentText.trim() &&
                  (onAddComment(doubt.id, commentText), setCommentText(""))
                }
                placeholder="Write an answer..."
                className="flex-1 bg-transparent px-2 text-sm text-[#EDE7DA] placeholder:text-[#EDE7DA]/30 outline-none"
              />
              <button
                onClick={() => {
                  onAddComment(doubt.id, commentText);
                  setCommentText("");
                }}
                disabled={!commentText.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-[#0B0D12] transition hover:bg-cyan-400 disabled:opacity-20 disabled:hover:bg-cyan-500 mr-1"
              >
                <FaPaperPlane className="text-[11px] ml-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtCard;
