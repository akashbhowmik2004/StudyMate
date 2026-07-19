/**
 * StudyMate Schedule — full planner page
 * ---------------------------------------
 * This is where the Dashboard's "Today's Page" card points when someone
 * taps "Calendar". Same desk-at-night identity, but built out as an
 * actual weekly planner rather than a 3-item preview:
 *
 *  - A week strip you can scan at a glance, with a dot per day that has
 *    sessions and the current day held in the lamp's glow.
 *  - The selected day's full timeline (more entries than the Dashboard
 *    preview), each session tagged by kind — Deep Focus / Collaboration /
 *    Practice / Review — reusing the same colour language as subjects
 *    elsewhere in the app, so a "Deep Focus" tag always reads the same.
 *  - Added, because a planner felt incomplete without them: a "this week
 *    at a glance" breakdown by session type, an "Add session" composer,
 *    and a short look at what's coming up on other days.
 *
 * All mock data / decorative state — no handlers wired up.
 */
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
  focus: { label: "Deep Focus", chip: "bg-[#F2735B]/15 text-[#FF8B72] border-[#F2735B]/30", dot: "bg-[#F2735B]" },
  collab: { label: "Collaboration", chip: "bg-[#6FCF97]/15 text-[#8FE0AE] border-[#6FCF97]/30", dot: "bg-[#6FCF97]" },
  practice: { label: "Practice", chip: "bg-[#E8A33D]/15 text-[#F2BE6D] border-[#E8A33D]/30", dot: "bg-[#E8A33D]" },
  review: { label: "Review", chip: "bg-[#A996D9]/15 text-[#C3B6EA] border-[#A996D9]/30", dot: "bg-[#A996D9]" },
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
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA]">
      <StudyMateHeader />

      {/* lamp glow, matches Dashboard / Notes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(232,163,61,0.16),transparent_38%),radial-gradient(circle_at_100%_20%,rgba(111,207,151,0.08),transparent_35%),linear-gradient(180deg,rgba(11,13,18,1),rgba(7,8,11,1))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#E8A33D]/10 blur-[110px]" />

      <main className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        {/* ------------------------------ header ------------------------------ */}
        <section className="flex flex-col gap-6 rounded-4xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-[#E8A33D]/80">
              <IoSparkles className="text-sm" />
              Week of 13 – 19 July
            </p>
            <h1 className="mt-3 font-['Fraunces',_serif] text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
              Your Schedule
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#EDE7DA]/65 sm:text-base">
              Plan sessions, keep the streak alive, and see the week at a glance.
            </p>
          </div>

          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#E8A33D] px-5 py-3 font-semibold text-[#0B0D12] shadow-[0_14px_36px_rgba(232,163,61,0.28)] transition hover:-translate-y-0.5 hover:bg-[#F2BE6D]">
            <FaPlus className="text-sm" />
            Add Session
          </button>
        </section>

        {/* ------------------------------ week strip ------------------------------ */}
        <section className="mt-6 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10">
            <FaChevronLeft className="text-xs" />
          </button>

          <div className="grid flex-1 grid-cols-7 gap-2">
            {weekStrip.map((d) => (
              <button
                key={d.day}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 transition ${
                  d.today
                    ? "border-[#E8A33D]/50 bg-[#E8A33D]/[0.12] shadow-[0_0_0_1px_rgba(232,163,61,0.25)_inset]"
                    : "border-white/8 bg-transparent hover:bg-white/[0.05]"
                }`}
              >
                <span className={`text-[11px] uppercase tracking-wide ${d.today ? "text-[#F2BE6D]" : "text-[#EDE7DA]/45"}`}>
                  {d.day}
                </span>
                <span className={`font-['JetBrains_Mono',_monospace] text-base font-semibold ${d.today ? "text-white" : "text-[#EDE7DA]/80"}`}>
                  {d.date}
                </span>
                <span className="flex gap-0.5">
                  {Array.from({ length: Math.min(d.sessions, 3) }).map((_, i) => (
                    <span key={i} className={`h-1 w-1 rounded-full ${d.today ? "bg-[#E8A33D]" : "bg-[#EDE7DA]/35"}`} />
                  ))}
                  {d.sessions === 0 && <span className="h-1 w-1 rounded-full bg-transparent" />}
                </span>
              </button>
            ))}
          </div>

          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10">
            <FaChevronRight className="text-xs" />
          </button>
        </section>

        {/* ------------------------------ main grid ------------------------------ */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Thursday's full timeline */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Fraunces',_serif] text-xl font-medium text-white sm:text-2xl">Thursday, 16 July</h2>
                <p className="mt-1 text-xs text-[#EDE7DA]/45">5 sessions · 5h 15m planned</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8A33D]/30 bg-[#E8A33D]/10 px-3 py-1.5 text-xs font-medium text-[#F2BE6D]">
                <FaFire className="text-[10px]" />
                Day 17 of the streak
              </span>
            </div>

            <div className="mt-6 space-y-0 border-l border-dashed border-white/15 pl-5">
              {todaySessions.map((s, i) => (
                <div key={s.title} className="relative pb-6 last:pb-0">
                  <span className={`absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#0B0D12] ${kind[s.k].dot}`} />
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">{s.title}</h3>
                      <p className="mt-0.5 text-xs text-[#EDE7DA]/45">{s.subject}</p>
                    </div>
                    <span className={`w-fit rounded-full border px-3 py-1 text-xs ${kind[s.k].chip}`}>
                      {kind[s.k].label}
                    </span>
                  </div>
                  <p className="mt-2 inline-flex items-center gap-1.5 font-['JetBrains_Mono',_monospace] text-xs tracking-wide text-[#EDE7DA]/55">
                    <FaRegClock className="text-[10px]" />
                    {s.time} – {s.end}
                  </p>
                  {i !== todaySessions.length - 1 && <div className="mt-5 h-px w-full bg-white/5" />}
                </div>
              ))}
            </div>
          </article>

          {/* right column: composer + week breakdown + upcoming */}
          <div className="flex flex-col gap-6">
            {/* quick add composer */}
            <article className="rounded-3xl border border-[#EDE7DA]/12 bg-[#F3ECDD]/[0.05] p-5 sm:p-6">
              <h2 className="font-['Fraunces',_serif] text-lg font-medium text-white">Add a session</h2>
              <form className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Session title"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-[#EDE7DA]/35 focus:border-[#E8A33D]/60 focus:ring-2 focus:ring-[#E8A33D]/20"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="time"
                    defaultValue="18:00"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#E8A33D]/60 focus:ring-2 focus:ring-[#E8A33D]/20"
                  />
                  <input
                    type="time"
                    defaultValue="19:00"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0D12]/50 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#E8A33D]/60 focus:ring-2 focus:ring-[#E8A33D]/20"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(kind).map(([key, v]) => (
                    <button
                      type="button"
                      key={key}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        key === "focus" ? v.chip : "border-white/12 bg-white/5 text-[#EDE7DA]/60 hover:bg-white/10"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E8A33D] px-4 py-2.5 text-sm font-semibold text-[#0B0D12] shadow-[0_8px_24px_-8px_rgba(232,163,61,0.5)] transition hover:bg-[#F2BE6D] active:scale-[0.99]"
                >
                  <FaPlus className="text-xs" />
                  Save session
                </button>
              </form>
            </article>

            {/* week breakdown */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-['Fraunces',_serif] text-lg font-medium text-white">This week</h2>
                <span className="font-['JetBrains_Mono',_monospace] text-sm text-[#EDE7DA]/60">{totalWeekHours}h planned</span>
              </div>

              <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-white/8">
                {weekBreakdown.map((w) => (
                  <span
                    key={w.k}
                    className={kind[w.k].dot}
                    style={{ width: `${(w.hours / totalWeekHours) * 100}%` }}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {weekBreakdown.map((w) => (
                  <div key={w.k} className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 text-[#EDE7DA]/75">
                      <span className={`h-2 w-2 rounded-full ${kind[w.k].dot}`} />
                      {kind[w.k].label}
                    </span>
                    <span className="font-['JetBrains_Mono',_monospace] text-[#EDE7DA]/55">{w.hours}h</span>
                  </div>
                ))}
              </div>
            </article>

            {/* upcoming */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <h2 className="font-['Fraunces',_serif] text-lg font-medium text-white">Coming up</h2>
              <div className="mt-4 space-y-3">
                {upcoming.map((u) => (
                  <div key={u.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0D12]/40 p-3">
                    <span className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[10px] font-semibold uppercase text-[#EDE7DA]/60">
                      {u.day}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{u.title}</p>
                      <p className="text-xs text-[#EDE7DA]/45">{u.time}</p>
                    </div>
                    <span className={`h-2 w-2 shrink-0 rounded-full ${kind[u.k].dot}`} />
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* ------------------------------ footer stat strip ------------------------------ */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#E8A33D]">
              <FaCalendarAlt className="text-sm" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#EDE7DA]/45">Sessions this week</p>
              <p className="font-['JetBrains_Mono',_monospace] text-lg font-semibold text-white">14</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#6FCF97]">
              <FaUsers className="text-sm" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#EDE7DA]/45">Group sessions</p>
              <p className="font-['JetBrains_Mono',_monospace] text-lg font-semibold text-white">3</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#A996D9]">
              <FaBrain className="text-sm" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#EDE7DA]/45">Focus hours</p>
              <p className="font-['JetBrains_Mono',_monospace] text-lg font-semibold text-white">6.5h</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}