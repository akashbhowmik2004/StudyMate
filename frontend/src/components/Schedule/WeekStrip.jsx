import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
const WeekStrip = ({weekStrip, setDate, getLocalDate}) => {
  console.log(weekStrip);
  return (
    <>
      <button className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white">
        <FaChevronLeft className="text-xs" />
      </button>

      <div className="grid flex-1 grid-cols-7 gap-2 overflow-x-auto no-scrollbar">
        {weekStrip.map((d) => (
          <button
            key={d.fullDate}
            disabled={d.fullDate > getLocalDate()}
            className={`group flex min-w-[3.5rem] flex-col items-center gap-2 rounded-[1.5rem] border px-2 py-4 transition-all duration-300 ${
              d.today
                ? "border-cyan-500/30 bg-cyan-500/10 shadow-[inset_0_0_20px_rgba(34,211,238,0.15)]"
                : "border-transparent bg-transparent hover:bg-white/[0.04] hover:border-white/5"
            }`}
            onClick={() => {setDate(d.fullDate); setActiveDate(true);}}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${d.today ? "text-cyan-300" : "text-slate-500 group-hover:text-slate-400"}`}
            >
              {d.day}
            </span>
            <span
              className={`font-['Fraunces',_serif] text-xl font-bold transition-colors ${d.today ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-[#EDE7DA]/80 group-hover:text-white"}`}
            >
              {d.date}
            </span>
            <span className="flex h-1.5 items-center gap-1">
              {Array.from({ length: Math.min(d.length, 3) }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${d.today ? "bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" : "bg-white/20"}`}
                />
              ))}
              {d.sessions === 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
              )}
            </span>
          </button>
        ))}
      </div>

      <button className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white">
        <FaChevronRight className="text-xs" />
      </button>
    </>
  );
};

export default WeekStrip;
