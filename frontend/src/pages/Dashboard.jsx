import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaFire,
  FaFolderOpen,
  FaGraduationCap,
  FaPlus,
  FaRegCommentDots,
  FaTasks,
  FaThumbtack,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { IoPeople, IoSparkles } from "react-icons/io5";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { api } from "../lib/axois.js"; // note: misspelled axois.js

/* ---------------------------------- icon map --------------------------------- */
const iconMap = {
  FaClock: FaClock,
  FaCalendarAlt: FaCalendarAlt,
  FaCheckCircle: FaCheckCircle,
  FaPlus: FaPlus,
  FaTasks: FaTasks,
  FaRegCommentDots: FaRegCommentDots,
  FaFolderOpen: FaFolderOpen,
};

/* ---------------------------------- data --------------------------------- */
const quickActions = [
  { label: "Add note", icon: "FaPlus" },
  { label: "New task", icon: "FaTasks" },
  { label: "Discussion", icon: "FaRegCommentDots" },
  { label: "Resources", icon: "FaFolderOpen" },
];

const tint = {
  coral: {
    chip: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
    bar: "bg-fuchsia-500",
    dot: "bg-fuchsia-500",
  },
  mint: {
    chip: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
  },
  lav: {
    chip: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    bar: "bg-indigo-500",
    dot: "bg-indigo-500",
  },
  amber: {
    chip: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
  },
};

/* --------------------------------- utils --------------------------------- */
function StreakChain({ count }) {
  if (!count) count = 0;
  const dots = Array.from({ length: count });
  if (count === 0) return <div className="text-xs text-slate-500">No streak yet</div>;
  
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {dots.map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
            i === dots.length - 1
              ? "bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)] scale-110"
              : "bg-cyan-500/20"
          }`}
        />
      ))}
      <FaFire className="ml-1 shrink-0 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
    </div>
  );
}

/* -------------------------------- component ------------------------------- */
export default function Dashboard() {
  const [data, setData] = useState({
    streak: { days: 0, label: "day streak", note: "Loading..." },
    focusStats: [],
    todaySchedule: [],
    recentNotes: [],
    subjects: [],
    joinedCommunities: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard");
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const { streak, focusStats, todaySchedule, recentNotes, subjects, joinedCommunities } = data;

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA] flex items-center justify-center">
        <div className="text-cyan-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      <div className="relative z-50 flex-none">
        <StudyMateHeader />
      </div>

      {/* Modern Ambient Backglow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[0%] left-[10%] w-[800px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-[100%]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[500px] bg-fuchsia-500/10 blur-[120px] rounded-[100%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        
        {/* ---------------------------- hero ---------------------------- */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#12141B]/40 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                <IoSparkles className="text-xs" />
                Your desk, tonight
              </p>
              <h1 className="mt-5 font-['Fraunces',_serif] text-4xl font-black leading-[1.15] tracking-tight text-[#EDE7DA] sm:text-5xl">
                Welcome back — the lamp's still on and your streak is{" "}
                <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">glowing.</span>
              </h1>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                Everything you're studying, sharing, and joining — right where you left it.
              </p>
            </div>

            <div className="grid shrink-0 gap-3 sm:grid-cols-2 lg:flex lg:flex-col xl:flex-row w-full lg:w-auto">
              <Link to={"/community"} className="w-full">
                <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-cyan-500 px-6 py-4 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/40 active:scale-95">
                  <IoPeople className="text-lg" />
                  Explore Community
                </button>
              </Link>
              <Link to={"/notes"} className="w-full">
                <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-[#EDE7DA] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20 active:scale-95">
                  <FaBookOpen className="text-base" />
                  Browse Notes
                </button>
              </Link>
            </div>
          </div>

          {/* streak + focus strip */}
          <div className="relative mt-10 grid gap-6 rounded-[2rem] border border-white/5 bg-black/20 p-5 sm:grid-cols-[1.3fr_1px_1fr_1fr_1fr] sm:items-center sm:p-6 backdrop-blur-md">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Study streak
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-['Fraunces',_serif] text-4xl font-black text-white drop-shadow-md">
                  {streak.days}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400/80">
                  {streak.label}
                </span>
              </div>
              <div className="mt-3">
                <StreakChain count={streak.days} />
              </div>
              <p className="mt-2 text-[11px] font-medium text-slate-500">{streak.note}</p>
            </div>

            <div className="hidden h-full w-px bg-white/5 sm:block" />

            {focusStats.map((s) => {
              const Icon = iconMap[s.iconName];
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
                    {Icon && <Icon className="text-lg" />}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {s.label}
                    </p>
                    <p className="mt-1 font-['Fraunces',_serif] text-2xl font-bold text-white">
                      {s.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------ main two column ------------------------ */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          
          {/* today's page */}
          <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
                Today's Page
              </h2>
              <Link to="/schedule">
                <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#EDE7DA]/80 transition hover:bg-white/10 hover:text-white">
                  Calendar <FaChevronRight className="text-[10px]" />
                </button>
              </Link>
            </div>

            <div className="mt-6 space-y-0 border-l-2 border-dashed border-white/10 pl-6 ml-2">
              {todaySchedule.map((item, i) => (
                <div key={item.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-4 border-[#0B0D12] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-bold text-[#EDE7DA] transition-colors hover:text-cyan-50">
                      {item.title}
                    </h3>
                    <span className="w-fit rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
                    {item.startTime} – {item.endTime}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* recent notes — index cards */}
          <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
                Recent Notes
              </h2>
              <Link
                to={"/notes"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 transition hover:text-cyan-300"
              >
                All notes <FaChevronRight className="text-[10px]" />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {recentNotes.map((note) => (
                <div
                  key={note.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-cyan-900/10 hover:border-white/10"
                >
                  <span className="absolute right-0 top-0 h-8 w-8 -translate-y-1/2 translate-x-1/2 rotate-45 bg-white/10 transition-transform duration-300 group-hover:scale-110" />
                  <FaThumbtack className="absolute right-4 top-4 text-xs text-[#EDE7DA]/20 transition-colors group-hover:text-cyan-400/50" />
                  <p className="pr-6 text-base font-bold text-[#EDE7DA] transition-colors group-hover:text-white">
                    {note.title}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs">
                    <span
                      className={`rounded-full border px-3 py-1 font-bold ${tint[note.tint].chip}`}
                    >
                      {note.subject}
                    </span>
                    <span className="font-medium text-slate-500">{note.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* --------------------------- subjects --------------------------- */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
            <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white border-b border-white/5 pb-5">
              Subjects
            </h2>
            <div className="mt-6 space-y-4">
              {subjects.map((item) => (
                <div
                  key={item.subject}
                  className="group flex items-center gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-4 pl-5 transition-all duration-300 hover:bg-white/[0.04] relative overflow-hidden"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${tint[item.tint].bar}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate font-bold text-[#EDE7DA] group-hover:text-white transition-colors">
                        {item.subject}
                      </span>
                      <span className="font-bold text-slate-400">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-black/40 overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${tint[item.tint].bar}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* communities */}
          <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
                Your Hubs
              </h2>
              <Link
                to={"/community"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 transition hover:text-cyan-300"
              >
                Browse <FaChevronRight className="text-[10px]" />
              </Link>
            </div>

            {joinedCommunities.length > 0 ? (
              <div className="mt-6 space-y-4">
                {joinedCommunities.map((c) => (
                  <div
                    key={c.name}
                    className="group flex items-center gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.04]"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border text-sm font-bold shadow-lg ${tint[c.tint].chip}`}
                    >
                      {c.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-bold text-white">
                        {c.name}
                      </p>
                      <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        {c.members} members <span className="mx-1">•</span> {c.activity}
                      </p>
                    </div>
                    <button className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#EDE7DA] transition hover:bg-white/10 hover:text-white">
                      Open
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.01] px-4 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                  <FaUsers className="text-xl" />
                </span>
                <div>
                  <p className="text-base font-bold text-[#EDE7DA]">
                    No Hubs Yet
                  </p>
                  <p className="mt-1 max-w-[250px] text-xs font-medium text-slate-500">
                    Join a study group to swap notes and stay accountable.
                  </p>
                </div>
                <Link to={"/community"}>
                  <button className="mt-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-[#0B0D12] transition hover:bg-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)]">
                    Browse Hubs
                  </button>
                </Link>
              </div>
            )}
          </article>
        </section>

        {/* ------------------------- quick actions ------------------------- */}
        <section className="mt-8 rounded-[2.5rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl sm:p-8 shadow-xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Desk tools
              </p>
              <h2 className="mt-1 font-['Fraunces',_serif] text-2xl font-bold text-white">
                Quick actions
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => {
                const Icon = iconMap[action.icon];
                return (
                  <button
                    key={action.label}
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-[#EDE7DA] transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-100"
                  >
                    {Icon && <Icon className="text-xs text-cyan-400" />}
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-xs font-bold text-slate-400">
              <FaGraduationCap className="text-cyan-400/70 text-sm" />
              Semester 6
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-xs font-bold text-slate-400">
              <FaUserFriends className="text-fuchsia-400/70 text-sm" />
              Team: StudyMate Backend
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}