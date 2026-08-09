import { FaCheck, FaTimes } from "react-icons/fa";

const ToastNotification = ({ message, success }) => {
  // Dynamically set styles based on the success prop
  const borderColor = success ? "border-emerald-500/50" : "border-red-500/50";
  const shadowColor = success
    ? "shadow-[0_10px_50px_-10px_rgba(16,185,129,0.6)]"
    : "shadow-[0_10px_50px_-10px_rgba(239,68,68,0.6)]";
  const iconBgColor = success ? "bg-emerald-500" : "bg-red-500";
  const iconShadowColor = success
    ? "shadow-[0_0_20px_rgba(16,185,129,0.8)]"
    : "shadow-[0_0_20px_rgba(239,68,68,0.8)]";
  const titleColor = success ? "text-emerald-400" : "text-red-400";
  const titleText = success ? "Success" : "Error";
  const Icon = success ? FaCheck : FaTimes;

  return (
    <div
      className={`fixed top-10 left-1/2 z-[9999] flex w-[90%] max-w-sm -translate-x-1/2 items-center gap-4 rounded-[1.25rem] border-2 ${borderColor} bg-[#12141B]/95 p-4 ${shadowColor} backdrop-blur-xl
      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        message
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-16 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      {/* Intensely glowing solid icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBgColor} text-[#0B0D12] ${iconShadowColor} transition-all duration-500 delay-100 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          message
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 -rotate-45 opacity-0"
        }`}
      >
        <Icon className="text-sm" />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`font-['Fraunces',_serif] text-base font-bold tracking-wide ${titleColor}`}
        >
          {titleText}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-slate-200">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ToastNotification;
