import { FaPlus } from "react-icons/fa";
import { api } from "../../lib/axois.js";
import { useToast } from "../../context/ToastContext.jsx";
const SessionComposer = ({
  kind,
  setSessions,
  sessionInputs,
  setSessionInputs,
  selectedDate,
  fetchUpcomingSessions,
  fetchWeekSessions,
}) => {
  const { showToast } = useToast();
  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setSessionInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handlecreateSession = async (e) => {
    e.preventDefault();

    try {
      if (!sessionInputs.title || !sessionInputs.subject || !sessionInputs.startTime || !sessionInputs.endTime) {
        showToast("Please fill in all required fields.", false);
        return;
      }
      if (sessionInputs.endTime <= sessionInputs.startTime) {
        showToast("End time must be after start time.", false);
        return;
      }
      const response = await api.post(
        "/schedule/create-session",
        sessionInputs,
      );
      setSessions((prev) => [...prev, response.data.session]);
      showToast("Session created successfully!", true);
      await fetchUpcomingSessions();
      await fetchWeekSessions();
      setSessionInputs({
        title: "",
        subject: "",
        date: selectedDate,
        startTime: "",
        endTime: "",
        type: "focus",
      });
    } catch (error) {
      console.error("Error creating session:", error);
      showToast("Failed to create session.", false);
    }
  };
  return (
    <article className="rounded-[2.5rem] border border-white/5 bg-[#12141B]/40 p-6 shadow-xl backdrop-blur-xl sm:p-8">
      <h2 className="font-['Fraunces',_serif] text-xl font-bold text-white">
        Add a session
      </h2>
      <form className="mt-6 space-y-4" onSubmit={handlecreateSession}>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
          <input
            type="text"
            placeholder="Session title"
            className="w-full rounded-xl border border-cyan-500/10 bg-cyan-500/[0.04] px-3 py-2.5 text-sm font-bold text-[#EDE7DA] outline-none transition-all placeholder:text-[#EDE7DA]/30 focus:border-cyan-400/50 focus:bg-cyan-500/[0.08] focus:ring-2 focus:ring-cyan-400/10"
            name="title"
            value={sessionInputs.title}
            onChange={handleinputChange}
          />
          <input
            type="text"
            placeholder="Subject"
            className="mt-3 w-full rounded-xl border border-cyan-500/10 bg-cyan-500/[0.04] px-3 py-2.5 text-sm font-bold text-[#EDE7DA] outline-none transition-all placeholder:text-[#EDE7DA]/30 focus:border-cyan-400/50 focus:bg-cyan-500/[0.08] focus:ring-2 focus:ring-cyan-400/10"
            name="subject"
            value={sessionInputs.subject}
            onChange={handleinputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
            <input
              type="time"
              name="startTime"
              value={sessionInputs.startTime}
              className="w-full bg-transparent text-sm font-bold text-[#EDE7DA] outline-none [color-scheme:dark]"
              onChange={handleinputChange}
            />
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]">
            <input
              type="time"
              name="endTime"
              value={sessionInputs.endTime}
              className="w-full bg-transparent text-sm font-bold text-[#EDE7DA] outline-none [color-scheme:dark]"
              onChange={handleinputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {Object.entries(kind).map(([key, v]) => (
            <button
              type="button"
              onClick={() =>
                setSessionInputs((prev) => ({ ...prev, type: key }))
              }
              key={key}
              className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                key === sessionInputs.type
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
  );
};

export default SessionComposer;
