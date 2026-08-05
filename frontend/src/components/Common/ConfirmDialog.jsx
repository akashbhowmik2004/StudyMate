
import { createPortal } from "react-dom";

const ConfirmDialog = ({ onConfirm, onCancel, title, description, confirmButtonText }) => {
    
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12141B] shadow-2xl shadow-black/50"
      >
        <div className="border-b border-white/10 px-6 py-5">
          <h3
            id="confirm-dialog-title"
            className="text-lg font-semibold text-[#F3ECDD]"
          >
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#EDE7DA]/65">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-5">
          <button className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-[#EDE7DA]/75 transition hover:bg-white/5 hover:text-[#F3ECDD]" onClick={onCancel}>
            Cancel
          </button>
          <button className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400" onClick={onConfirm}>
            {confirmButtonText || "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDialog
