import { createPortal } from "react-dom";

const ConfirmDialog = ({ onConfirm, onCancel, title, description, confirmButtonText }) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0D12]/80 px-4 py-8 backdrop-blur-xl transition-all">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#12141B] to-[#0B0D12] shadow-2xl shadow-red-900/20"
      >
        <div className="border-b border-white/5 px-6 py-6">
          <h3
            id="confirm-dialog-title"
            className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]"
          >
            {title}
          </h3>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 bg-black/20 px-6 py-5">
          <button 
            className="rounded-xl px-5 py-2.5 text-xs font-bold text-[#EDE7DA]/60 transition hover:bg-white/10 hover:text-white" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="rounded-xl bg-red-500 px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_15px_-3px_rgba(239,68,68,0.4)] transition hover:bg-red-400 active:scale-95" 
            onClick={onConfirm}
          >
            {confirmButtonText || "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDialog;