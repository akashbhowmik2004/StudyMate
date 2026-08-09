import { useRef, useState } from "react";
import { auth } from "../lib/axois.js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import RateLimiterCard from "../components/RateLimiterCard.jsx";
import useAuth from "../context/useAuth.jsx";
import { BeatLoader } from "react-spinners";
import socket from "../lib/socket.js";

const Login = () => {
  const dialog = useRef();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const verifyUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.post("/login", loginData);
      setUser(res.data.otherDetails);
      navigate("/");
      toast.success(res.data.message);
    } catch (err) {
      const status = err.response.status;
      const ErrorMessage = err.response.data.message;
      toast.error(ErrorMessage);
      if (status === 429) {
        dialog.current.open();
      }
      setErrors({
        [err.response.data.field]: err.response.data.message,
        ErrorCode: err.response.status,
      });
    } finally {
      setLoading(false);
      socket.connect(); // Connect the socket after successful login
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0D12]">
        <BeatLoader color="#22d3ee" size={18} />
      </div>
    );
  }

  console.log(errors);
  
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
                Welcome Back
              </h1>
              <p className="mt-3 text-sm font-medium text-slate-400">
                Log in to continue to StudyMate.
              </p>
            </div>

            <form onSubmit={verifyUser} className="space-y-5">
              
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
                    value={loginData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
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
                  className={`rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                    errors.password
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/5 bg-white/[0.02] focus-within:border-cyan-500/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  <input
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm font-medium text-[#EDE7DA] outline-none placeholder:text-[#EDE7DA]/30"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 px-1 text-xs font-bold text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer rounded border-white/10 bg-white/5 text-cyan-500 accent-cyan-500 outline-none"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-cyan-400 transition hover:text-cyan-300"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-cyan-500 px-4 py-4 text-sm font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-400 active:scale-[0.98]"
              >
                Log In
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-cyan-400 transition hover:text-cyan-300"
              >
                Sign up
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;