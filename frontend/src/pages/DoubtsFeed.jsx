import { useState } from "react";
import {  FaFeatherAlt } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import DoubtComposer from "../components/DoubtFeed/DoubtComposer.jsx";
import DashboardSidebar from "../components/DoubtFeed/DashboardSidebar.jsx";
import DoubtCard from "../components/DoubtFeed/DoubtCard.jsx";
import { useToast } from "../context/ToastContext.jsx";

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

const Avatar = ({ name, size = "h-10 w-10", className = "" }) => {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-2xl border text-xs font-bold backdrop-blur-md ${paletteFor(
        name,
      )} ${className}`}
    >
      {initials(name)}
    </span>
  );
};

const seedDoubts = [
  {
    id: 3,
    author: "Priya Verma",
    username: "priya_v",
    title: "Why does recursion cause a stack overflow?",
    content:
      "I get how recursive functions call themselves, but I don't fully understand why deep recursion crashes with a stack overflow. Is there a rule of thumb for when to switch to iteration?",
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
    timestamp: "3h ago",
    likes: 12,
    likedByMe: false,
    comments: [],
  },
];

const DoubtsFeed = () => {
  const [doubts, setDoubts] = useState(seedDoubts);
  const { showToast } = useToast();


  const handlePost = ({ title, content, image }) => {
    // Generate a temporary local URL for the preview (since we aren't uploading to a real backend here)
    const localImageUrl = image ? URL.createObjectURL(image) : null;

    const newDoubt = {
      id: Date.now(),
      author: CURRENT_USER.name,
      username: CURRENT_USER.username,
      title,
      content,
      imageUrl: localImageUrl, // Save the image URL in the doubt object
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
          ? {
              ...d,
              likedByMe: !d.likedByMe,
              likes: d.likedByMe ? d.likes - 1 : d.likes + 1,
            }
          : d,
      ),
    );
  };

  const handleDelete = (id) => {
    setDoubts((prev) => prev.filter((d) => d.id !== id));
    showToast("Doubt deleted.");
  };

  const handleEdit = (id, updates) => {
    setDoubts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    );
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
                {
                  id: Date.now(),
                  author: CURRENT_USER.name,
                  text,
                  timestamp: "Just now",
                },
              ],
            }
          : d,
      ),
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
          <DashboardSidebar Avatar={Avatar} currentUser={CURRENT_USER} />

          <section className="w-full flex-1 space-y-8 overflow-y-auto pb-24 no-scrollbar">
            <header className="mb-2">
              <h1 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA]">
                Community Feed
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-400">
                Explore discussions, answer questions, and level up your
                knowledge.
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
                  currentUser={CURRENT_USER}
                  Avatar={Avatar}
                />
              ))}

              {doubts.length === 0 && (
                <div className="rounded-[2rem] border border-dashed border-white/10 bg-[#0B0D12]/30 py-20 text-center backdrop-blur-sm">
                  <FaFeatherAlt className="mx-auto mb-4 text-3xl text-cyan-500/20" />
                  <p className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">
                    It's quiet here...
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Be the first to ask a question today.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default DoubtsFeed;
