import { FaFire, FaRegClock, FaTrash, FaCheck } from "react-icons/fa";
import { useEffect } from "react";

const SessionTimeline = ({
  kind,
  getLocalDate,
  sessions,
  selectedDate,
  fetchSessionsForDate,
  onToggleComplete, 
  onDeleteSession,  
}) => {
  const d = selectedDate ? selectedDate : getLocalDate();
  const date = new Date(d);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    fetchSessionsForDate(selectedDate);
  }, [selectedDate]);

  const calculateTotalDuration = (sessions) => {
    let totalDuration = 0;
    sessions.forEach((session) => {
      const [startHour, startMinute] = session.startTime.split(":").map(Number);
      const [endHour, endMinute] = session.endTime.split(":").map(Number);
      const start = startHour * 60 + startMinute;
      const end = endHour * 60 + endMinute;
      if (Number.isFinite(start) && Number.isFinite(end)) {
        totalDuration += Math.max(0, end - start);
      }
    });
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;

    const formattedDuration = `${hours}h ${minutes}m `;
    return formattedDuration;
  };

  return (
    <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="font-['Fraunces',_serif] text-2xl font-bold text-white">
            {formattedDate}
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-400">
            {sessions.length} sessions · {calculateTotalDuration(sessions)}
            planned
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
          <FaFire className="text-[13px] drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
          Day 17 Streak
        </span>
      </div>

      <div className="mt-8 space-y-0 border-l-2 border-dashed border-white/10 pl-6 ml-2">
        {sessions.map((s, index) => (
          <div key={s._id || s.title || index} className="group relative pb-8 last:pb-0">
            {/* Glowing Timeline Dot */}
            <span
              className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-4 border-[#0B0D12] ${kind[s.type].dot} shadow-[0_0_10px_rgba(255,255,255,0.2)] ${kind[s.type].shadow}`}
            />

            <div className="flex flex-col gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-white/5 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between -mt-3 -ml-4">
              {/* Left Side: Session Info */}
              <div>
                <h3 
                  className={`text-base font-bold transition-colors ${
                    s.completed 
                      ? "text-slate-500 line-through" 
                      : "text-[#EDE7DA] group-hover:text-white"
                  }`}
                >
                  {s.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {s.subject}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <FaRegClock className="text-[11px]" />
                  {s.startTime} – {s.endTime}
                </p>
              </div>
              
              {/* Right Side: Chips and Actions */}
              <div className="flex items-center gap-3">
                <span
                  className={`w-fit rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${kind[s.type].chip}`}
                >
                  {kind[s.type].label}
                </span>
                
                {/* Checkbox Button */}
                <button
                  onClick={() => onToggleComplete(s._id)}
                  className={`flex h-6 w-6 items-center justify-center rounded border transition-colors ${
                    s.completed
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : "border-white/20 bg-transparent text-transparent hover:border-white/40"
                  }`}
                  aria-label="Mark as complete"
                >
                  <FaCheck className="text-[12px]" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteSession(s._id)}
                  className="flex h-6 w-6 items-center justify-center rounded text-slate-500 transition-colors hover:bg-red-500/20 hover:text-red-400"
                  aria-label="Delete session"
                >
                  <FaTrash className="text-[12px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default SessionTimeline;