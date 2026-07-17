import {useRef, useState} from 'react'
import {auth} from "../lib/axois.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";
import RateLimiterCard from "../components/RateLimiterCard.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const Login = () => {
    const dialog = useRef();
    const {setUser} = useAuth();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const verifyUser = async (e) => {
        e.preventDefault();
        try {
            const res = await auth.post("/login", loginData);
            setUser(res.data.otherDetails);
            navigate("/");
            toast.success(res.data.message);
        } catch (err) {
            const status = err.response.status;
            const ErrorMessage = err.response.data.message
            toast.error(ErrorMessage);
            if (status === 429){
                dialog.current.open();
            }
            setErrors({
                [err.response.data.field]: err.response.data.message,
                "ErrorCode": err.response.status,

            });
        }
    }
    console.log(errors)
    return (
        <>
            <RateLimiterCard ref={dialog}/>
            <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.28),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,rgba(4,10,24,0.92),rgba(9,15,30,1))]" />
                <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />

                <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
                    <section
                        className="w-full rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/20 bg-white/10 text-cyan-200 shadow-inner shadow-white/5">
                                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v18m9-9H3" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Login
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                                Welcome back to StudyMate.
                            </p>
                        </div>

                        <form onSubmit={verifyUser} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className={`w-full rounded-2xl border bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 backdrop-blur-xl ${
                                        errors.email
                                            ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                            : 'border-white/10 focus:border-cyan-300 focus:bg-slate-900/80'
                                    }`}

                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-xs font-medium text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    type="password"
                                    autoComplete= "current-password"
                                    placeholder="Enter your password"
                                    className={`w-full rounded-2xl border bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 backdrop-blur-xl ${
                                        errors.password
                                            ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                            : 'border-white/10 focus:border-cyan-300 focus:bg-slate-900/80'
                                    }`}
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-red-400">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 cursor-pointer rounded border-white/10 bg-slate-950/70 text-cyan-400"
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-cyan-300 transition hover:text-cyan-200"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full rounded-2xl bg-white px-4 py-3.5 font-semibold text-slate-950 shadow-[0_20px_60px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-400">
                            Don't have an account?{' '}
                            <a
                                href="/signup"
                                className="font-medium text-cyan-300 transition hover:text-cyan-200"
                            >
                                Sign up
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Login
