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
  FaCheck,
  FaTimes,
  FaHome,
  FaCompass,
  FaBookmark,
  FaUserCircle,
  FaFire,
  FaTrophy,
  FaHashtag,
  FaFeatherAlt,
} from "react-icons/fa";

const CURRENT_USER = { name: "Akash Sharma", username: "akash123" };

const AVATAR_PALETTES = [
  "bg-cyan-500/15 text-cyan-200",
  "bg-fuchsia-500/15 text-fuchsia-200",
  "bg-amber-500/15 text-amber-200",
  "bg-emerald-500/15 text-emerald-200",
];

const paletteFor = (name) =>
  AVATAR_PALETTES[name.charCodeAt(0) % AVATAR_PALETTES.length];

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({ name, size = "h-9 w-9" }) => (
  <span
    className={`flex ${size} shrink-0 items-center justify-center rounded-full text-xs font-semibold ${paletteFor(
      name
    )}`}
  >
    {initials(name)}
  </span>
);

const seedDoubts = [
  {
    id: 3,
    author: "Akash Sharma",
    username: "akash123",
    title: "Why does recursion cause a stack overflow?",
    content:
      "I get how recursive functions call themselves, but I don't fully understand why deep recursion crashes with a stack overflow. Is there a rule of thumb for when to switch to iteration?",
    timestamp: "10m ago",
    likes: 3,
    likedByMe: false,
    comments: [
      {
        id: 1,
        author: "Priya Verma",
        text: "Each call adds a frame to the call stack, and the stack has a fixed size — too many frames and it overflows. Deep, unbounded recursion is usually the sign to switch to iteration or memoization.",
        timestamp: "5m ago",
      },
    ],
  },
  {
    id: 2,
    author: "Rohit Das",
    username: "rohitd",
    title: "Difference between let, const and var?",
    content:
      "I keep mixing these up. When should I actually use var over let, if ever?",
    timestamp: "1h ago",
    likes: 7,
    likedByMe: true,
    comments: [],
  },
  {
    id: 1,
    author: "Sneha Iyer",
    username: "sneha_i",
    title: "How does the event loop handle async/await?",
    content:
      "I understand promises but I'm lost on how await actually pauses execution without blocking the main thread.",
    timestamp: "3h ago",
    likes: 12,
    likedByMe: false,
    comments: [
      {
        id: 1,
        author: "Akash Sharma",
        text: "await just pauses the async function itself and hands control back to the event loop — the rest of the app keeps running.",
        timestamp: "2h ago",
      },
    ],
  },
];

const DoubtComposer = ({ onPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (!title.trim()) return;
    onPost({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start gap-3">
        <Avatar name={CURRENT_USER.name} />
        <div className="flex-1 space-y-2.5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your doubt?"
            className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2.5 text-sm font-medium text-[#F3ECDD] placeholder:text-[#EDE7DA]/30 outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add more detail (optional)..."
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2.5 text-sm leading-relaxed text-[#EDE7DA]/80 placeholder:text-[#EDE7DA]/25 outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
          />
          <div className="flex justify-end">
            <button
              onClick={handlePost}
              disabled={!title.trim()}
              className="rounded-xl bg-cyan-300/90 px-4 py-2 text-xs font-semibold text-[#0B0D12] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-cyan-300/90"
            >
              Post Doubt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentRow = ({ comment }) => (
  <div className="flex items-start gap-2.5">
    <Avatar name={comment.author} size="h-7 w-7" />
    <div className="min-w-0 flex-1 rounded-xl bg-[#0B0D12]/50 px-3 py-2">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-semibold text-[#F3ECDD]">
          {comment.author}
        </span>
        <span className="text-[10px] text-slate-500">{comment.timestamp}</span>
      </div>
      <p className="mt-0.5 text-xs leading-relaxed text-[#EDE7DA]/70">
        {comment.text}
      </p>
    </div>
  </div>
);

const DoubtCard = ({ doubt, onLike, onDelete, onEdit, onAddComment, onShare }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(doubt.title);
  const [editContent, setEditContent] = useState(doubt.content);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const isMine = doubt.username === CURRENT_USER.username;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(doubt.id, { title: editTitle.trim(), content: editContent.trim() });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(doubt.title);
    setEditContent(doubt.content);
    setIsEditing(false);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    onAddComment(doubt.id, commentText.trim());
    setCommentText("");
  };

  const handleShare = () => {
    onShare(doubt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.055]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={doubt.author} />
          <div>
            <p className="text-sm font-semibold text-[#F3ECDD]">
              {doubt.author}
            </p>
            <p className="text-[11px] text-slate-500">{doubt.timestamp}</p>
          </div>
        </div>

        {isMine && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="rounded-md p-1.5 text-[#EDE7DA]/30 transition hover:bg-white/5 hover:text-[#EDE7DA]/60"
            >
              <FaEllipsisH className="text-xs" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-20 w-32 overflow-hidden rounded-xl border border-white/10 bg-[#12141B] shadow-lg shadow-black/40">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setIsEditing(true);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#EDE7DA]/80 transition hover:bg-white/5"
                >
                  <FaEdit className="text-[11px] text-cyan-200/70" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setConfirmingDelete(true);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#FF8B72] transition hover:bg-white/5"
                >
                  <FaTrashAlt className="text-[11px]" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {confirmingDelete && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-[#FF8B72]/25 bg-[#FF8B72]/[0.06] px-3 py-2">
          <span className="text-xs text-[#EDE7DA]/75">Delete this doubt?</span>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmingDelete(false)}
              className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-[#EDE7DA]/60 transition hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(doubt.id)}
              className="rounded-lg bg-[#FF8B72]/90 px-2.5 py-1 text-[11px] font-semibold text-[#0B0D12] transition hover:bg-[#FF8B72]"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Body / Edit form */}
      {isEditing ? (
        <div className="mt-3 space-y-2.5">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2 text-sm font-medium text-[#F3ECDD] outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2 text-sm leading-relaxed text-[#EDE7DA]/80 outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-medium text-[#EDE7DA]/70 transition hover:bg-white/5"
            >
              <FaTimes className="text-[10px]" />
              Cancel
            </button>
            <button
              onClick={saveEdit}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-300/90 px-3 py-1.5 text-[11px] font-semibold text-[#0B0D12] transition hover:bg-cyan-200"
            >
              <FaCheck className="text-[10px]" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-sm font-semibold leading-snug text-[#F3ECDD]">
            {doubt.title}
          </p>
          {doubt.content && (
            <p className="mt-1.5 text-xs leading-relaxed text-[#EDE7DA]/60">
              {doubt.content}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-5 border-t border-white/5 pt-3">
        <button
          onClick={() => onLike(doubt.id)}
          className={`flex items-center gap-1.5 text-xs transition ${
            doubt.likedByMe
              ? "text-[#FF8B72]"
              : "text-[#EDE7DA]/45 hover:text-[#EDE7DA]/75"
          }`}
        >
          {doubt.likedByMe ? (
            <FaHeart className="text-[13px]" />
          ) : (
            <FaRegHeart className="text-[13px]" />
          )}
          {doubt.likes}
        </button>

        <button
          onClick={() => setShowComments((p) => !p)}
          className="flex items-center gap-1.5 text-xs text-[#EDE7DA]/45 transition hover:text-[#EDE7DA]/75"
        >
          <FaRegCommentDots className="text-[13px]" />
          {doubt.comments.length}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs text-[#EDE7DA]/45 transition hover:text-[#EDE7DA]/75"
        >
          <FaShareAlt className="text-[11px]" />
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-3 space-y-3 border-t border-white/5 pt-3">
          {doubt.comments.length > 0 ? (
            doubt.comments.map((c) => <CommentRow key={c.id} comment={c} />)
          ) : (
            <p className="text-xs text-slate-500">
              No comments yet — be the first to help out.
            </p>
          )}

          <div className="flex items-center gap-2.5">
            <Avatar name={CURRENT_USER.name} size="h-7 w-7" />
            <div className="flex flex-1 items-center gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitComment()}
                placeholder="Write a comment..."
                className="flex-1 rounded-xl border border-white/10 bg-[#0B0D12]/60 px-3 py-2 text-xs text-[#EDE7DA]/85 placeholder:text-[#EDE7DA]/25 outline-none transition focus:border-cyan-300/40 focus:ring-1 focus:ring-cyan-300/30"
              />
              <button
                onClick={submitComment}
                disabled={!commentText.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-300/90 text-[#0B0D12] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FaPaperPlane className="text-[11px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NAV_LINKS = [
  { label: "Home", icon: FaHome, active: false },
  { label: "Doubts", icon: FaCompass, active: true },
  { label: "Bookmarks", icon: FaBookmark, active: false },
  { label: "Profile", icon: FaUserCircle, active: false },
];

const TRENDING_TOPICS = [
  { tag: "javascript", count: "1.2k doubts" },
  { tag: "dsa", count: "890 doubts" },
  { tag: "react", count: "654 doubts" },
  { tag: "exams", count: "410 doubts" },
];

const TOP_CONTRIBUTORS = [
  { name: "Priya Verma", points: 1240 },
  { name: "Rohit Das", points: 980 },
  { name: "Sneha Iyer", points: 875 },
];

const LeftSidebar = () => (
  <aside className="hidden w-56 shrink-0 lg:block">
    <div className="sticky top-8 space-y-6">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-200">
          <FaFeatherAlt className="text-sm" />
        </span>
        <div>
          <p className="text-sm font-bold text-[#F3ECDD]">StudyMate</p>
          <p className="text-[10px] text-slate-500">Learn. Share. Grow.</p>
        </div>
      </div>

      <nav className="space-y-1">
        {NAV_LINKS.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-cyan-400/10 text-cyan-200"
                : "text-[#EDE7DA]/60 hover:bg-white/5 hover:text-[#EDE7DA]/90"
            }`}
          >
            <Icon className="text-[15px]" />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
        <Avatar name={CURRENT_USER.name} />
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-[#F3ECDD]">
            {CURRENT_USER.name}
          </p>
          <p className="truncate text-[11px] text-slate-500">
            @{CURRENT_USER.username}
          </p>
        </div>
      </div>
    </div>
  </aside>
);

const RightSidebar = () => (
  <aside className="hidden w-64 shrink-0 xl:block">
    <div className="sticky top-8 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2">
          <FaFire className="text-xs text-[#FF8B72]" />
          <p className="text-xs font-semibold uppercase tracking-wide text-[#EDE7DA]/50">
            Trending topics
          </p>
        </div>
        <div className="space-y-2.5">
          {TRENDING_TOPICS.map((t) => (
            <button
              key={t.tag}
              className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition hover:bg-white/5"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#EDE7DA]/80">
                <FaHashtag className="text-[10px] text-cyan-300/70" />
                {t.tag}
              </span>
              <span className="text-[10px] text-slate-500">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2">
          <FaTrophy className="text-xs text-amber-300/80" />
          <p className="text-xs font-semibold uppercase tracking-wide text-[#EDE7DA]/50">
            Top contributors
          </p>
        </div>
        <div className="space-y-3">
          {TOP_CONTRIBUTORS.map((c, i) => (
            <div key={c.name} className="flex items-center gap-2.5">
              <span className="w-3 text-[11px] font-semibold text-slate-500">
                {i + 1}
              </span>
              <Avatar name={c.name} size="h-7 w-7" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#EDE7DA]/85">
                  {c.name}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-cyan-200/70">
                {c.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </aside>
);

const DoubtsFeed = () => {
  const [doubts, setDoubts] = useState(seedDoubts);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const handlePost = ({ title, content }) => {
    const newDoubt = {
      id: Date.now(),
      author: CURRENT_USER.name,
      username: CURRENT_USER.username,
      title,
      content,
      timestamp: "Just now",
      likes: 0,
      likedByMe: false,
      comments: [],
    };
    setDoubts((prev) => [newDoubt, ...prev]);
    showToast("Doubt posted!");
  };

  const handleLike = (id) => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              likedByMe: !d.likedByMe,
              likes: d.likedByMe ? d.likes - 1 : d.likes + 1,
            }
          : d
      )
    );
  };

  const handleDelete = (id) => {
    setDoubts((prev) => prev.filter((d) => d.id !== id));
    showToast("Doubt deleted");
  };

  const handleEdit = (id, updates) => {
    setDoubts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    showToast("Doubt updated");
  };

  const handleAddComment = (id, text) => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              comments: [
                ...d.comments,
                {
                  id: Date.now(),
                  author: CURRENT_USER.name,
                  text,
                  timestamp: "Just now",
                },
              ],
            }
          : d
      )
    );
  };

  const handleShare = (doubt) => {
    const shareUrl = `https://studymate.app/doubts/${doubt.id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] px-4 py-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-start gap-8">
        <LeftSidebar />

        <main className="w-full max-w-xl flex-1 space-y-4">
          <div>
            <h1 className="text-lg font-bold text-[#F3ECDD]">Doubts</h1>
            <p className="text-xs text-slate-500">
              Ask a question, help others, learn together.
            </p>
          </div>

          <DoubtComposer onPost={handlePost} />

          <div className="space-y-3">
            {doubts.map((doubt) => (
              <DoubtCard
                key={doubt.id}
                doubt={doubt}
                onLike={handleLike}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAddComment={handleAddComment}
                onShare={handleShare}
              />
            ))}

            {doubts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center">
                <p className="text-sm text-slate-500">
                  No doubts yet. Ask the first one!
                </p>
              </div>
            )}
          </div>
        </main>

        <RightSidebar />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/10 bg-[#12141B] px-4 py-2.5 text-xs font-medium text-[#F3ECDD] shadow-lg shadow-black/40">
          {toast}
        </div>
      )}
    </div>
  );
};

export default DoubtsFeed;