/**
 * StudyMate Dashboard — "Desk at night" redesign
 * ------------------------------------------------
 * Design concept: a study desk lit by a single warm lamp. The page background
 * is ink-dark like the room; content lives on two kinds of surfaces —
 * glass "desk" panels (schedule, actions) and warm paper "index cards"
 * (notes, subjects, streak) that sit on top of the desk, tilted slightly,
 * the way real study cards do.
 *
 * Fonts used (add once to index.html <head>, or your global CSS):
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * No functional logic was changed — only markup, structure, and styling.
 */
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

/* ---------------------------------- data --------------------------------- */

const streak = {
  days: 17,
  label: "day streak",
  note: "Longest this semester",
};

const focusStats = [
  { label: "Today", value: "3h 40m", icon: FaClock },
  { label: "This week", value: "21h 10m", icon: FaCalendarAlt },
  { label: "Tasks done", value: "26 / 34", icon: FaCheckCircle },
];

const todaySchedule = [
  { time: "08:30", end: "09:45", title: "Data Structures Revision", type: "Deep Focus" },
  { time: "11:00", end: "12:00", title: "Group Doubt Session", type: "Collaboration" },
  { time: "17:30", end: "18:30", title: "Operating Systems Quiz Prep", type: "Practice" },
];

const recentNotes = [
  { title: "Binary Trees — Traversals", subject: "Algorithms", updated: "2h ago", tint: "coral" },
  { title: "Normalization Cheatsheet", subject: "Database Systems", updated: "Yesterday", tint: "mint" },
  { title: "TCP vs UDP, quick diagram", subject: "Computer Networks", updated: "2 days ago", tint: "lav" },
];

const subjects = [
  { subject: "Algorithms", progress: 76, tint: "coral" },
  { subject: "Database Systems", progress: 64, tint: "mint" },
  { subject: "Computer Networks", progress: 52, tint: "lav" },
  { subject: "Mathematics", progress: 83, tint: "amber" },
];

// Swap for [] to preview the empty state.
const joinedCommunities = [
  { name: "Logic League", members: 42, activity: "6 posts today", initials: "LL", tint: "coral" },
  { name: "DB Study Circle", members: 18, activity: "Live session at 6 PM", initials: "DB", tint: "mint" },
];

const quickActions = [
  { label: "Add note", icon: FaPlus },
  { label: "New task", icon: FaTasks },
  { label: "Discussion", icon: FaRegCommentDots },
  { label: "Resources", icon: FaFolderOpen },
];

const tint = {
  coral: { chip: "bg-[#F2735B]/15 text-[#FF8B72] border-[#F2735B]/30", bar: "bg-[#F2735B]", dot: "bg-[#F2735B]" },
  mint: { chip: "bg-[#6FCF97]/15 text-[#8FE0AE] border-[#6FCF97]/30", bar: "bg-[#6FCF97]", dot: "bg-[#6FCF97]" },
  lav: { chip: "bg-[#A996D9]/15 text-[#C3B6EA] border-[#A996D9]/30", bar: "bg-[#A996D9]", dot: "bg-[#A996D9]" },
  amber: { chip: "bg-[#E8A33D]/15 text-[#F2BE6D] border-[#E8A33D]/30", bar: "bg-[#E8A33D]", dot: "bg-[#E8A33D]" },
};

/* --------------------------------- utils --------------------------------- */

function StreakChain({ count }) {
  const dots = Array.from({ length: count });
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {dots.map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            i === dots.length - 1
              ? "bg-[#E8A33D] shadow-[0_0_10px_2px_rgba(232,163,61,0.55)]"
              : "bg-[#E8A33D]/45"
          }`}
        />
      ))}
      <FaFire className="ml-1 shrink-0 text-[#E8A33D] drop-shadow-[0_0_6px_rgba(232,163,61,0.5)]" />
    </div>
  );
}

/* -------------------------------- component ------------------------------- */

export default function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA]">
      <StudyMateHeader />

      {/* lamp glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(232,163,61,0.16),transparent_38%),radial-gradient(circle_at_100%_20%,rgba(111,207,151,0.08),transparent_35%),linear-gradient(180deg,rgba(11,13,18,1),rgba(7,8,11,1))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#E8A33D]/10 blur-[110px]" />

      <main className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        {/* ---------------------------- hero ---------------------------- */}
        <section className="rounded-4xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-[#E8A33D]/80">
                <IoSparkles className="text-sm" />
                Your desk, tonight
              </p>
              <h1 className="mt-3 max-w-xl font-['Fraunces',_serif] text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                Welcome back — the lamp's still on and your streak is glowing.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#EDE7DA]/65 sm:text-base">
                Everything you're studying, sharing, and joining — in one place.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link to={"/community"}>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E8A33D] px-5 py-3 font-semibold text-[#0B0D12] shadow-[0_14px_36px_rgba(232,163,61,0.28)] transition hover:-translate-y-0.5 hover:bg-[#F2BE6D]">
                  <IoPeople className="text-xl" />
                  Explore Community
                </button>
              </Link>
              <Link to={"/notes"}>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                  <FaBookOpen className="text-lg" />
                  Browse Notes
                </button>
              </Link>
            </div>
          </div>

          {/* streak + focus strip */}
          <div className="mt-7 grid gap-4 rounded-3xl border border-white/10 bg-[#0B0D12]/50 p-4 sm:grid-cols-[1.3fr_1px_1fr_1fr_1fr] sm:items-center sm:p-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#EDE7DA]/50">Study streak</p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-['JetBrains_Mono',_monospace] text-2xl font-semibold text-white">
                  {streak.days}
                </span>
                <span className="text-sm text-[#EDE7DA]/60">{streak.label}</span>
              </div>
              <div className="mt-2">
                <StreakChain count={streak.days} />
              </div>
              <p className="mt-1 text-xs text-[#EDE7DA]/45">{streak.note}</p>
            </div>

            <div className="hidden h-full w-px bg-white/10 sm:block" />

            {focusStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#E8A33D]">
                    <Icon className="text-sm" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#EDE7DA]/45">{s.label}</p>
                    <p className="font-['JetBrains_Mono',_monospace] text-lg font-semibold text-white">{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------ main two column ------------------------ */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* today's page */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Fraunces',_serif] text-xl font-medium text-white sm:text-2xl">
                Today's Page
              </h2>
              <Link to="/schedule">
              <button className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-[#EDE7DA]/80 transition hover:bg-white/10">
                Calendar <FaChevronRight className="text-[10px]" />
              </button>
              </Link>
            </div>

            <div className="mt-5 space-y-0 border-l border-dashed border-white/15 pl-5">
              {todaySchedule.map((item, i) => (
                <div key={item.title} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#0B0D12] bg-[#E8A33D]" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <span className="w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#EDE7DA]/70">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1.5 font-['JetBrains_Mono',_monospace] text-xs tracking-wide text-[#EDE7DA]/55">
                    {item.time} – {item.end}
                  </p>
                  {i !== todaySchedule.length - 1 && (
                    <div className="mt-5 h-px w-full bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* recent notes — index cards */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Fraunces',_serif] text-xl font-medium text-white sm:text-2xl">
                Recent Notes
              </h2>
              <Link to={"/notes"} className="inline-flex items-center gap-1 text-sm font-medium text-[#E8A33D]/90 hover:text-[#F2BE6D]">
                All notes <FaChevronRight className="text-[10px]" />
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#EDE7DA]/12 bg-[#F3ECDD]/[0.06] p-4 pr-9 transition hover:bg-[#F3ECDD]/[0.1]"
                >
                  <span className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 rotate-45 bg-[#0B0D12]" />
                  <FaThumbtack className="absolute right-3 top-3 text-xs text-[#EDE7DA]/35" />
                  <p className="text-sm font-semibold text-[#F3ECDD]">{note.title}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className={`rounded-full border px-2 py-0.5 ${tint[note.tint].chip}`}>
                      {note.subject}
                    </span>
                    <span className="text-[#EDE7DA]/40">{note.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* --------------------------- subjects --------------------------- */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
            <h2 className="font-['Fraunces',_serif] text-xl font-medium text-white">Subjects</h2>
            <div className="mt-5 space-y-3">
              {subjects.map((item) => (
                <div
                  key={item.subject}
                  className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0B0D12]/40 p-3.5 pl-4 border-l-[3px] ${
                    tint[item.tint].bar.replace("bg-", "border-l-")
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate text-[#EDE7DA]/90">{item.subject}</span>
                      <span className="font-['JetBrains_Mono',_monospace] font-medium text-white">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/8">
                      <div
                        className={`h-full rounded-full ${tint[item.tint].bar}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* communities */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Fraunces',_serif] text-xl font-medium text-white">Your Communities</h2>
              <Link to={"/community"} className="inline-flex items-center gap-1 text-sm font-medium text-[#E8A33D]/90 hover:text-[#F2BE6D]">
                Browse <FaChevronRight className="text-[10px]" />
              </Link>
            </div>

            {joinedCommunities.length > 0 ? (
              <div className="mt-5 space-y-3">
                {joinedCommunities.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0D12]/40 p-3.5"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold ${tint[c.tint].chip}`}
                    >
                      {c.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{c.name}</p>
                      <p className="truncate text-xs text-[#EDE7DA]/50">
                        {c.members} members · {c.activity}
                      </p>
                    </div>
                    <button className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#EDE7DA]/80 transition hover:bg-white/10">
                      Open
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[#0B0D12]/30 px-4 py-8 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/50">
                  <FaUsers />
                </span>
                <p className="text-sm font-medium text-[#EDE7DA]/80">No communities yet</p>
                <p className="max-w-[220px] text-xs text-[#EDE7DA]/45">
                  Join a study group to swap notes and stay accountable.
                </p>
                <Link to={"/community"}>
                  <button className="mt-1 rounded-xl bg-[#E8A33D] px-4 py-2 text-xs font-semibold text-[#0B0D12] transition hover:bg-[#F2BE6D]">
                    Browse communities
                  </button>
                </Link>
              </div>
            )}
          </article>
        </section>

        {/* ------------------------- quick actions ------------------------- */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#EDE7DA]/45">Desk tools</p>
              <h2 className="mt-1 font-['Fraunces',_serif] text-lg font-medium text-white">Quick actions</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-[#EDE7DA]/85 transition hover:border-[#E8A33D]/40 hover:bg-white/10"
                  >
                    <Icon className="text-xs text-[#E8A33D]" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 border-t border-white/8 pt-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[#EDE7DA]/70">
              <FaGraduationCap />
              Semester 5
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[#EDE7DA]/70">
              <FaUserFriends />
              Team: Logic League
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}