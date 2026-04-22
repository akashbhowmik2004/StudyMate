import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../lib/api.js";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form,setFormData] = useState({
    email: "",
    password: ""
  })

  const handelLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login",form);
      if (!res) {
        toast.error("Login failed! Please check your credentials.");
      }

      toast.success("Login successful!");
      navigate("/community");
    } catch (error) {
      toast.error("An error occurred during login.");
      console.log(error);
      
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="glass-card">
          {/* Header */}
          <div className="px-6 py-8 border-b border-white/20 text-center">
            <h1 className="text-2xl font-semibold text-white mb-2">
              StudyMate
            </h1>
            <p className="text-white/70 text-sm">Sign in to your account</p>
          </div>

          {/* Form Container */}
          <div className="px-6 py-8">
            <form className="space-y-5" onSubmit={handelLogin}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="name@example.com"
                  className="glass-input w-full px-4 py-2.5 rounded text-white placeholder-white/50"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="glass-input w-full px-4 py-2.5 rounded text-white placeholder-white/50"
                />
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}

              <button
                type="submit"
                className="w-full glass-button text-white font-medium py-2.5 rounded"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="px-3 text-white/50 text-sm">OR</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <button className="w-full glass-button flex items-center justify-center gap-3 px-4 py-2.5 rounded">
                <FaGoogle className="text-white text-lg" />
                <span className="text-white font-medium">
                  Continue with Google
                </span>
              </button>
              <button className="w-full glass-button flex items-center justify-center gap-3 px-4 py-2.5 rounded">
                <FaGithub className="text-white text-lg" />
                <span className="text-white font-medium">
                  Continue with GitHub
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <Link to={"/signup"}>
                <p className="text-white/70 text-sm">
                  Don't have an account?{" "}
                  <span className="text-white hover:underline font-medium transition-colors">
                    Create one
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
