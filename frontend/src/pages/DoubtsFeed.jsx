import { useState, useEffect } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import DoubtComposer from "../components/DoubtFeed/DoubtComposer.jsx";
import DashboardSidebar from "../components/DoubtFeed/DashboardSidebar.jsx";
import DoubtCard from "../components/DoubtFeed/DoubtCard.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { api } from "../lib/axois.js";
import ConfirmDialog from "../components/Common/ConfirmDialog.jsx";

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

const DoubtsFeed = () => {
  const [doubts, setDoubts] = useState([]);
  const { showToast } = useToast();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [doubtId, setDoubtId] = useState(null);
  

  const fetchAllDoubts = async () => {
    const response = await api.get("/doubts");
    console.log("Fetched doubts:", response.data);
    
    setDoubts(response.data.doubts);
  };

  useEffect(() => {
    fetchAllDoubts();
  }, []);

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(`https://studymate.app/doubts/${doubtId}`);
      showToast("Link copied to clipboard!");
    }
  };
  const deleteDoubt = async (doubtId) => {
    try {
      await api.delete(`/doubts/${doubtId}`);
      setDoubts((prevDoubts) => prevDoubts.filter((doubt) => doubt._id !== doubtId));
      setShowConfirmDelete(false);
      await fetchAllDoubts(); // Refresh the doubts list after deletion
      showToast("Doubt deleted successfully!", true);
    } catch (err) {
      console.log(err);
      showToast("Error deleting doubt.", false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      {showConfirmDelete && (
        <ConfirmDialog onCancel={() => setShowConfirmDelete(false)} title="Delete Doubt" description="Are you sure you want to delete this doubt?" onConfirm={() => deleteDoubt(doubtId)} />
      )}
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

            <DoubtComposer
              setDoubts={setDoubts}
              doubts={doubts}
              fetchAllDoubts={fetchAllDoubts}
            />

            <div className="space-y-6">
              {doubts.map((doubt) => (
                <DoubtCard
                  key={doubt._id}
                  doubt={doubt}
                  setDoubts={setDoubts}
                  fetchAllDoubts={fetchAllDoubts}
                  setShowConfirmDelete={setShowConfirmDelete}
                  onShare={handleShare}
                  currentUser={CURRENT_USER}
                  Avatar={Avatar}
                  deleteDoubt={deleteDoubt}
                  setDoubtId={setDoubtId}
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
