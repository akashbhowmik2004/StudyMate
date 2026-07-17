import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaFolderOpen,
  FaGraduationCap,
  FaPlus,
  FaRegCommentDots,
  FaRegStickyNote,
  FaTasks,
  FaUserFriends,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
const statCards = [
  {
    title: "Study Streak",
    value: "17 Days",
    note: "Keep your momentum",
    icon: FaFire,
    accent: "from-amber-300/35 to-orange-400/20",
  },
  {
    title: "Tasks Completed",
    value: "26 / 34",
    note: "This week",
    icon: FaCheckCircle,
    accent: "from-emerald-300/35 to-teal-400/20",
  },
  {
    title: "Notes Shared",
    value: "48",
    note: "Across 6 subjects",
    icon: FaRegStickyNote,
    accent: "from-sky-300/35 to-cyan-400/20",
  },
  {
    title: "Focus Time",
    value: "21h 10m",
    note: "Last 7 days",
    icon: FaClock,
    accent: "from-rose-300/35 to-pink-400/20",
  },
];

const todaySchedule = [
  {
    time: "08:30 - 09:45",
    title: "Data Structures Revision",
    type: "Deep Focus",
  },
  {
    time: "11:00 - 12:00",
    title: "Group Doubt Session",
    type: "Collaboration",
  },
  {
    time: "17:30 - 18:30",
    title: "Operating Systems Quiz Prep",
    type: "Practice",
  },
];

const subjectProgress = [
  { subject: "Algorithms", progress: 76 },
  { subject: "Database Systems", progress: 64 },
  { subject: "Computer Networks", progress: 52 },
  { subject: "Mathematics", progress: 83 },
];

const quickActions = [
  { label: "Add New Note", icon: FaPlus },
  { label: "Create Task", icon: FaTasks },
  { label: "Join Discussion", icon: FaRegCommentDots },
  { label: "Open Resources", icon: FaFolderOpen },
];

export default function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#081315] text-emerald-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_10%_10%,rgba(45,212,191,0.2),transparent_34%),linear-gradient(180deg,rgba(8,19,21,1),rgba(5,11,13,1))]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-44 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />

      <main className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur-2xl sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-emerald-200/70">
                Student Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Welcome back, keep building your learning streak.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/75 sm:text-base">
                Track progress, manage tasks, and stay connected with your study
                group from one focused workspace.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 shadow-[0_14px_40px_rgba(251,191,36,0.26)] transition hover:-translate-y-0.5 hover:bg-amber-200">
                <IoPeople className="text-2xl" />
                Explore Community
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                <FaBookOpen className="text-sm" />
                Browse Notes
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="group rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-xl transition hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-emerald-50/70">{card.title}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs text-emerald-100/70">
                      {card.note}
                    </p>
                  </div>
                  <div
                    className={`rounded-2xl border border-white/15 bg-gradient-to-br p-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] ${card.accent}`}
                  >
                    <Icon className="text-lg" />
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Today's Plan
              </h2>
              <button className="rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-emerald-100 transition hover:bg-white/15">
                View Calendar
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {todaySchedule.map((item) => (
                <div
                  key={item.time + item.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <span className="w-fit rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs text-emerald-100/85">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-100/70">
                    <FaCalendarAlt className="text-xs" />
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-xl sm:p-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            <div className="mt-4 grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-left text-sm font-medium text-emerald-50 transition hover:border-emerald-200/35 hover:bg-white/14"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300/20 text-emerald-100">
                      <Icon className="text-sm" />
                    </span>
                    {action.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200/15 bg-gradient-to-br from-emerald-300/15 to-transparent p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-100/80">
                Community Activity
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                3 study invites today
              </p>
              <p className="mt-1 text-sm text-emerald-100/75">
                Join a group session and improve consistency.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-xl sm:p-6">
            <h2 className="text-xl font-semibold text-white">Your Progress</h2>
            <div className="mt-5 space-y-4">
              {subjectProgress.map((item) => (
                <div key={item.subject}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-emerald-50/90">{item.subject}</span>
                    <span className="font-medium text-white">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-xl sm:p-6">
            <h2 className="text-xl font-semibold text-white">Focus Snapshot</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/70">
                  Badges
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">12</p>
                <p className="mt-1 text-sm text-emerald-100/70">
                  Consistency unlocked
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/70">
                  Peers Online
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">19</p>
                <p className="mt-1 text-sm text-emerald-100/70">
                  Ready to collaborate
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/70">
                  Weekly Goal
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">74%</p>
                <p className="mt-1 text-sm text-emerald-100/70">
                  6 of 8 targets done
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/70">
                  Shared Rooms
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">5</p>
                <p className="mt-1 text-sm text-emerald-100/70">
                  Active communities
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-emerald-100/80">
                <FaGraduationCap />
                Semester 5
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-emerald-100/80">
                <FaUserFriends />
                Team: Logic League
              </span>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
