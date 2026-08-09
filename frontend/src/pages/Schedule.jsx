import {
  FaBrain,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaFire,
  FaPlus,
  FaRegClock,
  FaUsers,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import StudyMateHeader from "../components/StudyMateHeader.jsx";

/* ---------------------------------- data --------------------------------- */

const kind = {
  focus: { 
    label: "Deep Focus", 
    chip: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30", 
    dot: "bg-fuchsia-500",
    shadow: "shadow-fuchsia-500/50" 
  },
  collab: { 
    label: "Collaboration", 
    chip: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30", 
    dot: "bg-cyan-500",
    shadow: "shadow-cyan-500/50"
  },
  practice: { 
    label: "Practice", 
    chip: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", 
    dot: "bg-emerald-500",
    shadow: "shadow-emerald-500/50"
  },
  review: { 
    label: "Review", 
    chip: "bg-amber-500/15 text-amber-400 border-amber-500/30", 
    dot: "bg-amber-500",
    shadow: "shadow-amber-500/50"
  },
};

const weekStrip = [
  { day: "Mon", date: 13, sessions: 2 },
  { day: "Tue", date: 14, sessions: 1 },
  { day: "Wed", date: 15, sessions: 3 },
  { day: "Thu", date: 16, sessions: 5, today: true },
  { day: "Fri", date: 17, sessions: 2 },
  { day: "Sat", date: 18, sessions: 1 },
  { day: "Sun", date: 19, sessions: 0 },
];

const todaySessions = [
  { time: "07:00", end: "07:30", title: "Morning Recap", subject: "Mathematics", k: "review" },
  { time: "08:30", end: "09:45", title: "Data Structures Revision", subject: "Algorithms", k: "focus" },
  { time: "11:00", end: "12:00", title: "Group Doubt Session", subject: "Database Systems", k: "collab" },
  { time: "14:00", end: "14:45", title: "Flashcard Review", subject: "Database Systems", k: "review" },
  { time: "17:30", end: "18:30", title: "Operating Systems Quiz Prep", subject: "Operating Systems", k: "practice" },
];

const weekBreakdown = [
  { k: "focus", hours: 6.5 },
  { k: "collab", hours: 3 },
  { k: "practice", hours: 4.5 },
  { k: "review", hours: 2 },
];

const upcoming = [
  { day: "Fri", title: "Computer Networks Quiz Prep", time: "09:00 – 10:00", k: "practice" },
  { day: "Fri", title: "Logic League — live session", time: "18:00 – 19:00", k: "collab" },
  { day: "Sat", title: "Weekly reflection & replan", time: "10:00 – 10:30", k: "review" },
];

/* -------------------------------- component ------------------------------- */

export default function Schedule() {
  const totalWeekHours = weekBreakdown.reduce((sum, w) => sum + w.hours, 0);

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
        
        {/* ------------------------------ header ------------------------------ */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#12141B]/40 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                <IoSparkles className="text-xs" />
                Week of 13 – 19 July
              </p>
              <h1 className="mt-5 font-['Fraunces',_serif] text-4xl font-black leading-[1.15] tracking-tight text-[#EDE7DA] sm:text-5xl">
                Your Schedule
              </h1>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                Plan sessions, keep the streak alive, and see the week at a glance.
              </p>
            </div>

            <button className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-cyan-500 px-8 py-4 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/40 active:scale-95">
              <FaPlus className="text-sm" />
              Add Session
            </button>
          </div>
        </section>

        {/* ------------------------------ week strip ------------------------------ */}
        <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center rounded-[2rem] border border-white/5 bg-black/20 p-4 backdrop-blur-md">
          <button className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white">
            <FaChevronLeft className="text-xs" />
          </button>

          <div className="grid flex-1 grid-cols-7 gap-2 overflow-x-auto no-scrollbar">
            {weekStrip.map((d) => (
              <button
                key={d.day}
                className={`group flex min-w-[3.5rem] flex-col items-center gap-2 rounded-[1.5rem] border px-2 py-4 transition-all duration-300 ${
                  d.today
                    ? "border-cyan-500/30 bg-cyan-500/10 shadow-[inset_0_0_20px_rgba(34,211,238,0.15)]"
                    : "border-transparent bg-transparent hover:bg-white/[0.04] hover:border-white/5"
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${d.today ? "text-cyan-300" : "text-slate-500 group-hover:text-slate-400"}`}>
                  {d.day}
                </span>
                <span className={`font-['Fraunces',_serif] text-xl font-bold transition-colors ${d.today ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-[#EDE7DA]/80 group-hover:text-white"}`}>
                  {d.date}
                </span>
                <span className="flex h-1.5 items-center gap-1">
                  {Array.from({ length: Math.min(d.sessions, 3) }).map((_, i) => (
                    <span key={i} className={`h-1.5 w-1.5 rounded-full ${d.today ? "bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" : "bg-white/20"}`} />
                  ))}
                  {d.sessions === 0 && <span className="h-1.5 w-1.5 rounded-full bg-transparent" />}
                </span>
              </button>
            ))}
          </div>

          <button className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white">
            <FaChevronRight className="text-xs" />
          </button>
        </section>

        {/* ------------------------------ main grid ------------------------------ */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Thursday's full timeline */}
          <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
              <div>
                <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">Thursday, 16 July</h2>
                <p className="mt-1 text-xs font-medium text-slate-400">5 sessions · 5h 15m planned</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
                <FaFire className="text-[13px] drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                Day 17 Streak
              </span>
            </div>

            <div className="mt-8 space-y-0 border-l-2 border-dashed border-white/10 pl-6 ml-2">
              {todaySessions.map((s, i) => (
                <div key={s.title} className="group relative pb-8 last:pb-0">
                  {/* Glowing Timeline Dot */}
                  <span className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-4 border-[#0B0D12] ${kind[s.k].dot} shadow-[0_0_10px_rgba(255,255,255,0.2)] ${kind[s.k].shadow}`} />
                  
                  <div className="flex flex-col gap-3 rounded-2xl border border-transparent p-4 transition-all hover:border-white/5 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between -mt-3 -ml-4">
                    <div>
                      <h3 className="text-base font-bold text-[#EDE7DA] transition-colors group-hover:text-white">{s.title}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-500">{s.subject}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <FaRegClock className="text-[11px]" />
                        {s.time} – {s.end}
                      </p>
                    </div>
                    <span className={`w-fit rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${kind[s.k].chip}`}>
                      {kind[s.k].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* right column: composer + week breakdown + upcoming */}
          <div className="flex flex-col gap-8">
            
            {/* quick add composer */}
            <article className="rounded-[2.5rem] border border-white/5 bg-[#12141B]/40 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white">Add a session</h2>
              <form className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
                  <input
                    type="text"
                    placeholder="Session title"
                    className="w-full bg-transparent text-sm font-bold text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
                    <input
                      type="time"
                      defaultValue="18:00"
                      className="w-full bg-transparent text-sm font-bold text-[#EDE7DA] outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
                    <input
                      type="time"
                      defaultValue="19:00"
                      className="w-full bg-transparent text-sm font-bold text-[#EDE7DA] outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {Object.entries(kind).map(([key, v]) => (
                    <button
                      type="button"
                      key={key}
                      className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                        key === "focus" 
                          ? v.chip 
                          : "border-white/10 bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-cyan-500 px-6 py-4 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/40 active:scale-95"
                >
                  <FaPlus className="text-[11px]" />
                  Save Session
                </button>
              </form>
            </article>

            {/* week breakdown */}
            <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-5">
                <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white">This week</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{totalWeekHours}h planned</span>
              </div>

              <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-black/40 shadow-inner">
                {weekBreakdown.map((w) => (
                  <span
                    key={w.k}
                    className={`h-full ${kind[w.k].dot} transition-all duration-1000`}
                    style={{ width: `${(w.hours / totalWeekHours) * 100}%` }}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {weekBreakdown.map((w) => (
                  <div key={w.k} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.04]">
                    <span className="inline-flex items-center gap-3 text-xs font-bold text-[#EDE7DA]">
                      <span className={`h-2.5 w-2.5 rounded-full ${kind[w.k].dot} ${kind[w.k].shadow} shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
                      {kind[w.k].label}
                    </span>
                    <span className="font-medium text-slate-400 text-sm">{w.hours}h</span>
                  </div>
                ))}
              </div>
            </article>

            {/* upcoming */}
            <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
              <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white border-b border-white/5 pb-5">Coming up</h2>
              <div className="mt-6 space-y-3">
                {upcoming.map((u) => (
                  <div key={u.title} className="group flex items-center gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]">
                    <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                      {u.day}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#EDE7DA] group-hover:text-white transition-colors">{u.title}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{u.time}</p>
                    </div>
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${kind[u.k].dot} ${kind[u.k].shadow} shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* ------------------------------ footer stat strip ------------------------------ */}
        <section className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-5 rounded-[2rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl shadow-xl transition hover:bg-white/[0.02]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
              <FaCalendarAlt className="text-xl" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sessions this week</p>
              <p className="mt-1 font-['Fraunces',_serif] text-3xl font-black text-white">14</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-[2rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl shadow-xl transition hover:bg-white/[0.02]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
              <FaUsers className="text-xl" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Group sessions</p>
              <p className="mt-1 font-['Fraunces',_serif] text-3xl font-black text-white">3</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-[2rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl shadow-xl transition hover:bg-white/[0.02]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_-3px_rgba(217,70,239,0.2)]">
              <FaBrain className="text-xl" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Focus hours</p>
              <p className="mt-1 font-['Fraunces',_serif] text-3xl font-black text-white">6.5h</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}