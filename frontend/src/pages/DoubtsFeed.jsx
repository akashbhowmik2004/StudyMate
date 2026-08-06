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
import StudyMateHeader from "../components/StudyMateHeader.jsx";

const CURRENT_USER = { name: "Akash Bhowmik", username: "akash_b" };

const AVATAR_PALETTES = [
  "bg-cyan-500/15 text-cyan-200 border-cyan-500/20",
  "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/20",
  "bg-amber-500/15 text-amber-200 border-amber-500/20",
  "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
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

const Avatar = ({ name, size = "h-10 w-10", className = "" }) => (
  <span
    className={`flex ${size} shrink-0 items-center justify-center rounded-2xl border text-xs font-bold backdrop-blur-md ${paletteFor(
      name
    )} ${className}`}
  >
    {initials(name)}
  </span>
);

const seedDoubts = [
  {
    id: 3,
    author: "Priya Verma",
    username: "priya_v",
    title: "Why does recursion cause a stack overflow?",
    content:
      "I get how recursive functions call themselves, but I don't fully understand why deep recursion crashes with a stack overflow. Is there a rule of thumb for when to switch to iteration?",
    timestamp: "10m ago",
    likes: 3,
    likedByMe: false,
    comments: [
      {
        id: 1,
        author: "Akash Bhowmik",
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
    comments: [],
  },
];

const DoubtComposer = ({ onPost }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const composerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (composerRef.current && !composerRef.current.contains(e.target) && !title && !content) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title, content]);

  const handlePost = () => {
    if (!title.trim()) return;
    onPost({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
    setIsExpanded(false);
  };

  return (
    <div
      ref={composerRef}
      className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 ease-in-out ${
        isExpanded
          ? "border-cyan-400/30 bg-gradient-to-br from-[#0B0D12] to-cyan-900/10 shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-transparent opacity-50" />
      
      <div className="p-6">
        <div className="flex items-center gap-4">
          <Avatar name={CURRENT_USER.name} size="h-12 w-12" className="rounded-full" />
          {!isExpanded ? (
            <input
              onFocus={() => setIsExpanded(true)}
              placeholder="What are you stuck on today?"
              className="w-full cursor-text bg-transparent text-lg font-medium text-[#EDE7DA] placeholder:text-[#EDE7DA]/40 outline-none"
            />
          ) : (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your doubt..."
              className="w-full bg-transparent font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA] placeholder:text-[#EDE7DA]/30 outline-none"
            />
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-4 pl-16">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide more context, paste code snippets, or share what you've tried..."
              rows={3}
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#EDE7DA]/80 placeholder:text-[#EDE7DA]/25 outline-none"
            />
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-[11px] text-cyan-200/50">Markdown supported</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-[#EDE7DA]/50 transition hover:bg-white/5 hover:text-[#EDE7DA]"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={!title.trim()}
                  className="rounded-xl bg-cyan-500 px-6 py-2 text-xs font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] transition hover:bg-cyan-400 hover:shadow-cyan-400/40 disabled:opacity-50 disabled:shadow-none"
                >
                  Post Doubt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentBlock = ({ comment }) => (
  <div className="group relative flex gap-4 pt-4">
    <div className="absolute -left-[27px] top-8 h-full w-px bg-white/5" />
    <Avatar name={comment.author} size="h-8 w-8" className="rounded-xl ring-4 ring-[#0B0D12]" />
    <div className="flex-1 rounded-2xl bg-white/[0.02] p-3.5 border border-white/5 transition group-hover:border-white/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#EDE7DA]">{comment.author}</span>
        <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">{comment.timestamp}</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-[#EDE7DA]/70">{comment.text}</p>
    </div>
  </div>
);

const DoubtCard = ({ doubt, onLike, onDelete, onEdit, onAddComment, onShare }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(doubt.title);
  const [editContent, setEditContent] = useState(doubt.content);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const menuRef = useRef(null);

  const isMine = doubt.username === CURRENT_USER.username;

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(doubt.id, { title: editTitle.trim(), content: editContent.trim() });
    setIsEditing(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-1 transition-all hover:border-white/10 hover:shadow-xl hover:shadow-cyan-900/10">
      <div className="rounded-[1.75rem] bg-[#0B0D12]/80 p-6 backdrop-blur-xl">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={doubt.author} />
            <div>
              <p className="text-sm font-bold text-[#EDE7DA]">{doubt.author}</p>
              <p className="text-[11px] font-medium tracking-wide text-cyan-200/50 uppercase">{doubt.timestamp}</p>
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
                    onClick={() => { setMenuOpen(false); setIsEditing(true); }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#EDE7DA]/80 transition hover:bg-cyan-500/10 hover:text-cyan-200"
                  >
                    <FaEdit className="text-[11px]" /> Edit Post
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(doubt.id); }}
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
              <button onClick={() => setIsEditing(false)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#EDE7DA]/50 hover:bg-white/5 hover:text-[#EDE7DA]">Cancel</button>
              <button onClick={saveEdit} className="rounded-lg bg-cyan-500/20 px-4 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30">Save Changes</button>
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
            {doubt.likedByMe ? <FaHeart className="text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" /> : <FaRegHeart className="text-sm" />}
            {doubt.likes}
          </button>

          <button
            onClick={() => setShowComments((p) => !p)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-[#EDE7DA]"
          >
            <FaRegCommentDots className="text-sm" />
            {doubt.comments.length} <span className="hidden sm:inline">Answers</span>
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
                doubt.comments.map((c) => <CommentBlock key={c.id} comment={c} />)
              ) : (
                <div className="py-6 text-center text-sm font-medium text-slate-500 italic">
                  No answers yet. Share your knowledge!
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-2 transition-colors focus-within:border-cyan-500/30 focus-within:bg-white/[0.04]">
              <Avatar name={CURRENT_USER.name} size="h-9 w-9" className="rounded-xl ml-1" />
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commentText.trim() && (onAddComment(doubt.id, commentText), setCommentText(""))}
                placeholder="Write an answer..."
                className="flex-1 bg-transparent px-2 text-sm text-[#EDE7DA] placeholder:text-[#EDE7DA]/30 outline-none"
              />
              <button
                onClick={() => { onAddComment(doubt.id, commentText); setCommentText(""); }}
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

const DashboardSidebar = () => {
  const NAV_LINKS = [
    { label: "Home Feed", icon: FaHome, active: false },
    { label: "Doubts & Q&A", icon: FaCompass, active: true },
    { label: "Saved Notes", icon: FaBookmark, active: false },
    { label: "My Profile", icon: FaUserCircle, active: false },
  ];

  const TRENDING = [
    { tag: "javascript", count: "1.2k" },
    { tag: "dsa", count: "890" },
    { tag: "react", count: "654" },
  ];

  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-8 space-y-6">
        
        {/* User Badge */}
        <div className="group flex cursor-pointer items-center gap-4 rounded-[2rem] border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-500/20 hover:bg-white/[0.04]">
          <Avatar name={CURRENT_USER.name} size="h-12 w-12" className="rounded-full shadow-lg" />
          <div className="min-w-0">
            <p className="truncate font-['Fraunces',_serif] text-base font-bold text-[#EDE7DA] group-hover:text-cyan-100">
              {CURRENT_USER.name}
            </p>
            <p className="truncate text-xs font-medium text-slate-500">
              @{CURRENT_USER.username}
            </p>
          </div>
        </div>

        {/* Navigation Bento */}
        <nav className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-3 shadow-2xl">
          {NAV_LINKS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                active
                  ? "bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-300 relative overflow-hidden"
                  : "text-[#EDE7DA]/50 hover:bg-white/5 hover:text-[#EDE7DA]"
              }`}
            >
              {active && <div className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400" />}
              <Icon className={active ? "text-lg drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-lg"} />
              {label}
            </button>
          ))}
        </nav>

        {/* Discovery Bento */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 shadow-2xl transition hover:border-white/10 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-300 mb-4">
              <FaTrophy className="text-lg" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#EDE7DA]/50 uppercase tracking-widest mb-1">Rank</p>
              <p className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">Top 5%</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 shadow-2xl transition hover:border-white/10 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-300 mb-4">
              <FaFire className="text-lg" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#EDE7DA]/50 uppercase tracking-widest mb-1">Streak</p>
              <p className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">12 Days</p>
            </div>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 shadow-2xl">
          <p className="text-xs font-bold text-[#EDE7DA]/50 uppercase tracking-widest mb-4">Popular Tags</p>
          <div className="flex flex-wrap gap-2">
            {TRENDING.map((t) => (
              <span key={t.tag} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0B0D12] px-3 py-1.5 text-xs font-bold text-[#EDE7DA]/70 hover:border-cyan-500/30 hover:text-cyan-200 cursor-pointer transition">
                <FaHashtag className="text-[10px] text-cyan-500/50" />
                {t.tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
};

const DoubtsFeed = () => {
  const [doubts, setDoubts] = useState(seedDoubts);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
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
    setDoubts([newDoubt, ...doubts]);
    showToast("Awesome! Doubt posted.");
  };

  const handleLike = (id) => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, likedByMe: !d.likedByMe, likes: d.likedByMe ? d.likes - 1 : d.likes + 1 }
          : d
      )
    );
  };

  const handleDelete = (id) => {
    setDoubts((prev) => prev.filter((d) => d.id !== id));
    showToast("Doubt deleted.");
  };

  const handleEdit = (id, updates) => {
    setDoubts((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
    showToast("Changes saved.");
  };

  const handleAddComment = (id, text) => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              comments: [
                ...d.comments,
                { id: Date.now(), author: CURRENT_USER.name, text, timestamp: "Just now" },
              ],
            }
          : d
      )
    );
  };

  const handleShare = (doubt) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(`https://studymate.app/doubts/${doubt.id}`);
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      <div className="shrink-0 relative z-50">
        <StudyMateHeader />
      </div>

      {/* Modern Ambient Backglow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[20%] w-[1000px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-[100%]" />
        <div className="absolute bottom-0 right-[10%] w-[800px] h-[600px] bg-fuchsia-500/5 blur-[150px] rounded-[100%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <main className="relative z-10 flex min-h-0 flex-1 overflow-hidden px-4 py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-start gap-12">
          

          <section className="w-full flex-1 space-y-8 overflow-y-auto pb-24 no-scrollbar">
            <header className="mb-2">
              <h1 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA]">
                Community Feed
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-400">
                Explore discussions, answer questions, and level up your knowledge.
              </p>
            </header>

            <DoubtComposer onPost={handlePost} />

            <div className="space-y-6">
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
                <div className="rounded-[2rem] border border-dashed border-white/10 bg-[#0B0D12]/30 py-20 text-center backdrop-blur-sm">
                  <FaFeatherAlt className="mx-auto mb-4 text-3xl text-cyan-500/20" />
                  <p className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">It's quiet here...</p>
                  <p className="mt-2 text-sm text-slate-500">Be the first to ask a question today.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-cyan-500/20 bg-[#12141B]/90 px-5 py-3 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
          <FaCheck className="text-[10px]" />
        </div>
        <span className="text-sm font-bold text-[#EDE7DA]">{toast}</span>
      </div>
    </div>
  );
};

export default DoubtsFeed;