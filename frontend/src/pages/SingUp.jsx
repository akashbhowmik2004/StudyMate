import { useRef, useState } from "react";
import { auth } from "../lib/axois.js";
import { useNavigate } from "react-router";
import RateLimiterCard from "../components/RateLimiterCard.jsx";
import { Link } from "react-router";
import useAuth from "../context/useAuth.jsx";
import { BeatLoader } from "react-spinners";
import socket from "../lib/socket.js";
import { useToast } from "../context/ToastContext.jsx";

const SignUp = () => {
  const dialog = useRef();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "", // <-- Added name to state
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.post("/signup", signupData);
      setUser(res.data.otherDetails);
      setLoading(true);
      navigate("/");
      showToast(res.data.message, res.data.status); // Show toast notification on successful signup
    } catch (err) {
      const status = err.response?.status;
      if (status === 429) {
        dialog.current.open();
      }
      setErrors({
        [err.response?.data?.field]: err.response?.data?.message,
        ErrorCode: err.response?.status,
      });
      if (errors.ErrorCode === 11000) {
        showToast("Username or Email already exists", "error");
      }
    } finally {
      setLoading(false);
      socket.connect(); // Connect the socket after successful signup
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0D12]">
        <BeatLoader color="#22d3ee" size={18} />
      </div>
    );
  }

  return (
    <>
      <RateLimiterCard ref={dialog} />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0D12] px-4 py-10 selection:bg-cyan-500/30 sm:px-6 lg:px-8">
        {/* Modern Ambient Backglow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[20%] w-[1000px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-[100%]" />
          <div className="absolute bottom-0 right-[10%] w-[800px] h-[600px] bg-fuchsia-500/10 blur-[150px] rounded-[100%]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <section className="w-full rounded-[2.5rem] border border-white/10 bg-[#12141B]/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-10">
            <div className="mb-10 text-center">
              <h1 className="font-['Fraunces',_serif] text-3xl font-bold tracking-tight text-[#EDE7DA] sm:text-4xl">
                Create Account
              </h1>
              <p className="mt-3 text-sm font-medium text-slate-400">
                Join StudyMate and start learning together.
              </p>
            </div>

            <form className="space-y-5" onSubmit={createUser}>
              {/* Name Field (NEW) */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50"
                >
                  Full Name
                </label>
                <div
                  className={`rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                    errors.name
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  <input
                    id="name"
                    name="name"
                    value={signupData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm font-medium text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                </div>

                {/* Displays the backend error message for 'name' */}
                {errors.name && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50"
                >
                  Username
                </label>
                <div
                  className={`rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                    errors.username
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  <input
                    id="username"
                    name="username"
                    value={signupData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    type="text"
                    placeholder="Enter username"
                    className="w-full bg-transparent text-sm font-medium text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50"
                >
                  Email
                </label>
                <div
                  className={`rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                    errors.email
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  <input
                    id="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    type="email"
                    placeholder="Enter email address"
                    className="w-full bg-transparent text-sm font-medium text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50"
                >
                  Password
                </label>
                <div
                  className={`flex items-center rounded-2xl border py-2 pl-4 pr-2 transition-all duration-300 ${
                    errors.password
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  <input
                    id="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="flex-1 bg-transparent py-1.5 text-sm font-medium text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#EDE7DA]/50 transition hover:bg-white/10 hover:text-white"
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3l18 18m-9-15a9 9 0 019 9m0 0a9 9 0 01-9 9m9-9H3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-[#EDE7DA]/50"
                >
                  Confirm Password
                </label>
                <div
                  className={`flex items-center rounded-2xl border py-2 pl-4 pr-2 transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="flex-1 bg-transparent py-1.5 text-sm font-medium text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#EDE7DA]/50 transition hover:bg-white/10 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3l18 18m-9-15a9 9 0 019 9m0 0a9 9 0 01-9 9m9-9H3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-cyan-500 px-4 py-4 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-400 active:scale-[0.98]"
              >
                Create account
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-cyan-400 transition hover:text-cyan-300"
              >
                Log in
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SignUp;
