import { FaPlus } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5";

const ScheduleHeader = () => {
  return (
    <>
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
    </>
  );
};

export default ScheduleHeader;
