import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const RateLimiterCard = forwardRef((props, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
                document.documentElement.style.filter = "blur(4px)";
            }
        }
    })

    const handleClose = (e) => {
        e.preventDefault();
        document.documentElement.style.filter = "none";
        dialog.current.close();
    }
    return createPortal((
            <>
                <style>{`
                    dialog::backdrop {
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                `}</style>
                <dialog
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-2xl shadow-black/50"
                    ref={dialog} onClose={handleClose}>
                    <div className="space-y-6 p-8">
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="rounded-full bg-red-500/20 p-4">
                                    <svg
                                        className="h-8 w-8 text-red-400"
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
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Too Many Requests
                            </h1>
                            <p className="mt-3 text-sm text-slate-400">
                                You've made too many requests. Please wait a moment before trying again.
                            </p>
                        </div>

                        <form onSubmit={handleClose} className="flex justify-center">
                            <button
                                type="submit"
                                className="rounded-2xl bg-cyan-400 px-8 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Understood
                            </button>
                        </form>
                    </div>
                </dialog>
            </>
        ),
        document.getElementById("error-dialog")
    )
});

export default RateLimiterCard
