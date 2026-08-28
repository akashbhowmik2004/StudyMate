
const Upcomings = ({ kind, weekStrip, upcomingSessions }) => {

  return (
    
    <article className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
      <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white border-b border-white/5 pb-5">
        Coming up
      </h2>
      <div className="mt-6 space-y-3">
        {upcomingSessions?.map((u) => (
          <div
            key={u._id}
            className="group flex items-center gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]"
          >
            <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
              {weekStrip.find((d) => d.fullDate === u.date)?.day ||
                new Date(`${u.date}T00:00:00`).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#EDE7DA] group-hover:text-white transition-colors">
                {u.title}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {u.startTime} - {u.endTime}
              </p>
            </div>
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${kind[u.type].dot} ${kind[u.type].shadow} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default Upcomings;
