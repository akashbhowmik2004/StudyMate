import { useRef, useState } from "react";
import { auth } from "../lib/axois.js";
import { useNavigate } from "react-router";
import RateLimiterCard from "../components/RateLimiterCard.jsx";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../context/useAuth.jsx";
import {BeatLoader} from "react-spinners";

const SignUp = () => {
  const dialog = useRef();
  const {setUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      toast.success(res.data.message);
    } catch (err) {
      const status = err.response.status;
      if (status === 429) {
        dialog.current.open();
      }
      setErrors({
        [err.response.data.field]: err.response.data.message,
        ErrorCode: err.response.status,
      });
      if(errors.ErrorCode === 11000){
        console.log("User already exists");
      }
    }finally{
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <BeatLoader color="#06b6d4" size={18} />
      </div>
    );
  }
  return (
    <>
      {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <BeatLoader
                cssOverride={{}}
                loading
                margin={5}
                speedMultiplier={1}
            />
          </div>
      )}
      <RateLimiterCard ref={dialog} />
      <main className="relative min-h-screen overflow-hidden bg-[#07111f] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.28),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,rgba(4,10,24,0.92),rgba(9,15,30,1))]" />
        <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
          <section className="w-full rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/20 bg-white/10 text-cyan-200 shadow-inner shadow-white/5">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M12 3v18m9-9H3"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Sign Up
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
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
                  className={`w-full rounded-2xl border bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 backdrop-blur-xl ${
                    errors.username
                      ? "border-red-500 focus:border-red-400 focus:bg-slate-900"
                      : "border-white/10 focus:border-cyan-300 focus:bg-slate-900/80"
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
                  className={`w-full rounded-2xl border bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 backdrop-blur-xl ${
                    errors.email
                      ? "border-red-500 focus:border-red-400 focus:bg-slate-900"
                      : "border-white/10 focus:border-cyan-300 focus:bg-slate-900/80"
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className={`flex-1 rounded-2xl border bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 backdrop-blur-xl ${
                        errors.password
                          ? "border-red-500 focus:border-red-400 focus:bg-slate-900"
                          : "border-white/10 focus:border-cyan-300 focus:bg-slate-900/80"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="rounded-lg border border-white/10 bg-slate-950/70 px-3 py-3 text-slate-400 transition hover:border-cyan-300 hover:text-slate-200"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className={`flex-1 rounded-2xl border bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 backdrop-blur-xl ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-400 focus:bg-slate-900"
                          : "border-white/10 focus:border-cyan-300 focus:bg-slate-900/80"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="rounded-lg border border-white/10 bg-slate-950/70 px-3 py-3 text-slate-400 transition hover:border-cyan-300 hover:text-slate-200"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                className="w-full rounded-2xl bg-white px-4 py-3.5 font-semibold text-slate-950 shadow-[0_20px_60px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                Create account
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-cyan-300 transition hover:text-cyan-200"
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
