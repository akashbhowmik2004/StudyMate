import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const RateLimiterCard = forwardRef((props, ref) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const handleClose = (e) => {
    e.preventDefault();
    dialog.current.close();
  };
  return createPortal(
    <>
      <style>{`
                    dialog::backdrop {
                        background:
                            radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 34%),
                            rgba(2, 6, 23, 0.72);
                        backdrop-filter: blur(10px);
                    }
                `}</style>
      <dialog
        className="fixed left-1/2 top-1/2 z-1000 w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-4xl border border-white/10 bg-white/8 text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        ref={dialog}
        onClose={handleClose}
      >
        <div className="space-y-6 p-7 sm:p-8">
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 shadow-inner shadow-white/5">
                <svg
                  className="h-8 w-8 text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Too Many Requests
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              You've made too many requests. Please wait a moment before trying
              again.
            </p>
          </div>

          <form onSubmit={handleClose} className="flex justify-center">
            <button
              type="submit"
              className="rounded-2xl bg-white px-8 py-2.5 font-semibold text-slate-950 shadow-[0_20px_60px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Understood
            </button>
          </form>
        </div>
      </dialog>
    </>,
    document.getElementById("error-dialog"),
  );
});

export default RateLimiterCard;
