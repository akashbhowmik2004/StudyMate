import {useRef, useState} from "react";
import {auth} from "../lib/axois.js";
import {useNavigate} from "react-router";
import RateLimiterCard from "../components/RateLimiterCard.jsx";
import toast from "react-hot-toast";

const SignUp = () => {
    const dialog = useRef();
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
    };
    const createUser = async (e) => {
        e.preventDefault();
        try {
            const res = await auth.post("/signup", signupData);
            navigate("/login");
            toast.success(res.data.message);

        } catch (err) {
            const status = err.response.status
            if (status === 429){
                dialog.current.open();
            }
            setErrors({
                [err.response.data.field]: err.response.data.message,
                "ErrorCode": err.response.status
            });
        }
    }
    return (
        <>
            <RateLimiterCard ref={dialog}/>
            <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
                    <section
                        className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Sign Up
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                                Create your StudyMate account.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={createUser}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    value={signupData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    type="text"
                                    placeholder="Enter username"
                                    className={`w-full rounded-2xl border bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
                                        errors.username
                                            ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                            : 'border-white/10 focus:border-cyan-400 focus:bg-slate-900'
                                    }`}
                                />
                                {errors.username && (
                                    <p className="mt-1.5 text-xs font-medium text-red-400">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

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
                                    value={signupData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    type="email"
                                    placeholder="Enter email"
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

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Password
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="password"
                                            name="password"
                                            value={signupData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            className={`flex-1 rounded-2xl border bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
                                                errors.password
                                                    ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                                    : 'border-white/10 focus:border-cyan-400 focus:bg-slate-900'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-3 text-slate-400 hover:text-slate-200 hover:border-cyan-400 transition"
                                        >
                                            {showPassword ? (
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 3l18 18m-9-15a9 9 0 019 9m0 0a9 9 0 01-9 9m9-9H3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 text-xs font-medium text-red-400">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Confirm password
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={signupData.confirmPassword}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm password"
                                            className={`flex-1 rounded-2xl border bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
                                                errors.confirmPassword
                                                    ? 'border-red-500 focus:border-red-400 focus:bg-slate-900'
                                                    : 'border-white/10 focus:border-cyan-400 focus:bg-slate-900'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-3 text-slate-400 hover:text-slate-200 hover:border-cyan-400 transition"
                                        >
                                            {showConfirmPassword ? (
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 3l18 18m-9-15a9 9 0 019 9m0 0a9 9 0 01-9 9m9-9H3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-1.5 text-xs font-medium text-red-400">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-cyan-400 px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
                            >
                                Create account
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
};

export default SignUp;
