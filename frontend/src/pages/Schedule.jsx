import { FaBrain, FaCalendarAlt, FaUsers } from "react-icons/fa";
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import ScheduleHeader from "../components/Schedule/ScheduleHeader.jsx";
import WeekStrip from "../components/Schedule/WeekStrip.jsx";
import SessionTimeline from "../components/Schedule/SessionTimeline.jsx";
import SessionComposer from "../components/Schedule/SessionComposer.jsx";
import { useState, useEffect } from "react";
import { api } from "../lib/axois.js";
import { useToast } from "../context/ToastContext.jsx";
import Upcomings from "../components/Schedule/Upcomings.jsx";

/* ---------------------------------- data --------------------------------- */

const kind = {
  focus: {
    label: "Deep Focus",
    chip: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
    dot: "bg-fuchsia-500",
    shadow: "shadow-fuchsia-500/50",
  },
  collab: {
    label: "Collaboration",
    chip: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    dot: "bg-cyan-500",
    shadow: "shadow-cyan-500/50",
  },
  practice: {
    label: "Practice",
    chip: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-500",
    shadow: "shadow-emerald-500/50",
  },
  review: {
    label: "Review",
    chip: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    dot: "bg-amber-500",
    shadow: "shadow-amber-500/50",
  },
};

const getSessionDurationHours = (session) => {
  const [startHour, startMinute] = (session.startTime || "").split(":").map(Number);
  const [endHour, endMinute] = (session.endTime || "").split(":").map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (
    !Number.isFinite(startMinutes) ||
    !Number.isFinite(endMinutes) ||
    endMinutes <= startMinutes
  ) {
    return 0;
  }

  return (endMinutes - startMinutes) / 60;
};

// const weekStrip = [
//   { day: "Mon", date: 13, sessions: 2 },
//   { day: "Tue", date: 14, sessions: 1 },
//   { day: "Wed", date: 15, sessions: 3 },
//   { day: "Thu", date: 16, sessions: 5, today: true },
//   { day: "Fri", date: 17, sessions: 2 },
//   { day: "Sat", date: 18, sessions: 1 },
//   { day: "Sun", date: 19, sessions: 0 },
// ];

/* -------------------------------- component ------------------------------- */

export default function Schedule() {
  const getLocalDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const { showToast } = useToast();
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [sessionInputs, setSessionInputs] = useState({
    title: "",
    subject: "",
    date: selectedDate || getLocalDate(),
    startTime: "",
    endTime: "",
    type: "focus",
  });
  const [weekStrip, setWeekStrip] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [weekSessions, setWeekSessions] = useState([]);

  const generateWeekStrip = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();
    // console.log(dayOfWeek);
    const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + difference);

    const week = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const fullDate = `${year}-${month}-${day}`;

      return {
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: date.getDate(),
        fullDate,
        sessions: 0,
        today: fullDate === getLocalDate(),
      };
    });

    setWeekStrip(week);
  };
  const fetchWeekSessions = async () => {
    try {
      const sessionsByDate = await Promise.all(
        weekStrip.map(async (day) => {
          const response = await api.get(
            `/schedule/find-session?date=${day.fullDate}`,
          );
          return response.data.sessions || [];
        }),
      );
      const allSessions = sessionsByDate.flat();
      setWeekSessions(allSessions);
      setWeekStrip((currentWeek) =>
        currentWeek.map((day) => ({
          ...day,
          sessions: allSessions.filter((session) => session.date === day.fullDate)
            .length,
        })),
      );
    } catch (error) {
      console.error("Error fetching weekly sessions:", error);
    }
  };
  const fetchSessionsForDate = async (date) => {
    try {
      const response = await api.get(`/schedule/find-session?date=${date}`);
      console.log("Fetched sessions for date:", response.data);
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const fetchUpcomingSessions = async () => {
    try {
      const response = await api.get("/schedule/upcoming-sessions");
      setUpcomingSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching upcoming sessions:", error);
    }
  };
  useEffect(() => {
    generateWeekStrip();
  }, []);
  useEffect(() => {
    if (weekStrip.length) {
      fetchWeekSessions();
    }
  }, [weekStrip.length]);
  useEffect(() => {
    fetchSessionsForDate(selectedDate);
  }, [selectedDate]);
  useEffect(() => {
    setSessionInputs((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  }, [selectedDate]);
  const onDeleteSession = async (sessionId) => {
    try {
      await api.delete(`/schedule/delete-session/${sessionId}`);
      showToast("Session deleted successfully!", true);
      await fetchSessionsForDate(selectedDate);
      await fetchUpcomingSessions();
      await fetchWeekSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
      showToast("Failed to delete session.", false);
    }
  };
  const onToggleComplete = async (sessionId) => {
    try {
      const data = await api.patch(
        `/schedule/set-session-completion/${sessionId}`,
      );
      console.log(data);
      showToast("Session marked as completed!", true);
      await fetchSessionsForDate(selectedDate);
      await fetchUpcomingSessions();
      await fetchWeekSessions();
    } catch (error) {
      console.error("Error marking session as completed:", error);
      showToast(error.response.data.message, false);
    }
  };
  const weekBreakdown = Object.keys(kind).map((type) => ({
    k: type,
    hours: weekSessions
      .filter((session) => session.type === type)
      .reduce((hours, session) => hours + getSessionDurationHours(session), 0),
  }));
  const integerWeekBreakdown = weekBreakdown.map((item) => ({
    ...item,
    hours: Math.max(0, Math.round(item.hours)),
  }));
  const totalWeekHours = integerWeekBreakdown.reduce((sum, w) => sum + w.hours, 0);
  const groupSessions = weekSessions.filter((session) => session.type === "collab").length;
  const focusHours = integerWeekBreakdown.find((item) => item.k === "focus")?.hours || 0;
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
          <ScheduleHeader />
        </section>

        {/* ------------------------------ week strip ------------------------------ */}
        <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center rounded-[2rem] border border-white/5 bg-black/20 p-4 backdrop-blur-md">
          <WeekStrip
            weekStrip={weekStrip}
            setDate={setSelectedDate}
            getLocalDate={getLocalDate}
          />
        </section>

        {/* ------------------------------ main grid ------------------------------ */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Thursday's full timeline */}
          <SessionTimeline
            kind={kind}
            getLocalDate={getLocalDate}
            sessions={sessions}
            selectedDate={selectedDate}
            fetchSessionsForDate={fetchSessionsForDate}
            onDeleteSession={onDeleteSession}
            onToggleComplete={onToggleComplete}
          />

          {/* right column: composer + week breakdown + upcoming */}
          <div className="flex flex-col gap-8">
            {/* quick add composer */}
            <SessionComposer
              kind={kind}
              setSessions={setSessions}
              getLocalDate={getLocalDate}
              sessionInputs={sessionInputs}
              setSessionInputs={setSessionInputs}
              selectedDate={selectedDate}
              fetchSessionsForDate={fetchSessionsForDate}
              fetchUpcomingSessions={fetchUpcomingSessions}
              fetchWeekSessions={fetchWeekSessions}
            />

            {/* week breakdown */}
            <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-5">
                <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white">
                  This week
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  {totalWeekHours}h planned
                </span>
              </div>

              <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-black/40 shadow-inner">
                {integerWeekBreakdown.map((w) => (
                  <span
                    key={w.k}
                    className={`h-full ${kind[w.k].dot} transition-all duration-1000`}
                    style={{
                      width: totalWeekHours ? `${(w.hours / totalWeekHours) * 100}%` : "0%",
                    }}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {integerWeekBreakdown.map((w) => (
                  <div
                    key={w.k}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.04]"
                  >
                    <span className="inline-flex items-center gap-3 text-xs font-bold text-[#EDE7DA]">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${kind[w.k].dot} ${kind[w.k].shadow} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}
                      />
                      {kind[w.k].label}
                    </span>
                    <span className="font-medium text-slate-400 text-sm">
                      {w.hours}h
                    </span>
                  </div>
                ))}
              </div>
            </article>

            {/* upcoming */}
            {upcomingSessions.length > 0 ? (
              <Upcomings
                kind={kind}
                weekStrip={weekStrip}
                upcomingSessions={upcomingSessions}
              />
            ) : (
              <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
                <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white border-b border-white/5 pb-5">
                  Coming up
                </h2>
                <p className="mt-6 text-sm font-medium text-slate-400">
                  No upcoming sessions.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ------------------------------ footer stat strip ------------------------------ */}
        <section className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-5 rounded-[2rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl shadow-xl transition hover:bg-white/[0.02]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
              <FaCalendarAlt className="text-xl" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Sessions this week
              </p>
              <p className="mt-1 font-['Fraunces',_serif] text-3xl font-black text-white">
                {weekSessions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-[2rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl shadow-xl transition hover:bg-white/[0.02]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
              <FaUsers className="text-xl" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Group sessions
              </p>
              <p className="mt-1 font-['Fraunces',_serif] text-3xl font-black text-white">
                {groupSessions}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-[2rem] border border-white/5 bg-[#12141B]/40 p-6 backdrop-blur-xl shadow-xl transition hover:bg-white/[0.02]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_-3px_rgba(217,70,239,0.2)]">
              <FaBrain className="text-xl" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Focus hours
              </p>
              <p className="mt-1 font-['Fraunces',_serif] text-3xl font-black text-white">
                {focusHours}h
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
