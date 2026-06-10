import React, {useRef, useState} from 'react'
import {auth} from "../lib/axois.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";
import RateLimiterCard from "../components/RateLimiterCard.jsx";

const Login = () => {
    const dialog = useRef();
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
            navigate("/signup");
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
            <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
                    <section
                        className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Login
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
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
                                    className={`w-full rounded-2xl border bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
                                        errors.email
                                            ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                            : 'border-white/10 focus:border-cyan-400 focus:bg-slate-900'
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
                                    className={`w-full rounded-2xl border bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
                                        errors.password
                                            ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                            : 'border-white/10 focus:border-cyan-400 focus:bg-slate-900'
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
                                        className="w-4 h-4 rounded border-white/10 bg-slate-900/70 text-cyan-400 cursor-pointer"
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-cyan-400 px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300 mt-2"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-400">
                            Don't have an account?{' '}
                            <a
                                href="/signup"
                                className="text-cyan-400 font-medium hover:text-cyan-300 transition"
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
