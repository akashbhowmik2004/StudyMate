import React, { useState } from "react";
import { Link,useNavigate } from "react-router";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../lib/api.js";

const SignupPage = () => {
  const navigate = useNavigate();
  

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  


  const handleSignup = async (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const response = await api.post("/signup", input);
      console.log(response);

      
      
      toast.success("Signup successful!");
      navigate("/community");
    } catch (error) {
      // Log actual error for debugging
      console.error("Signup error:", error.response?.data || error.message);
      const errorMessage = "An error occurred during signup.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="glass-card">
          {/* Header */}
          <div className="px-6 py-8 border-b border-white/20 text-center">
            <h1 className="text-2xl font-semibold text-white mb-2">StudyMate</h1>
            <p className="text-white/70 text-sm">Create your account</p>
          </div>

          {/* Form Container */}
          <div className="px-6 py-8">
            <form className="space-y-5" onSubmit={handleSignup}>
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="glass-input w-full px-4 py-2.5 rounded text-white placeholder-white/50"
                  onChange={handleChange}
                />
              </div>

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
                  name="email"
                  placeholder="name@example.com"
                  className="glass-input w-full px-4 py-2.5 rounded text-white placeholder-white/50"
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Create a strong password"
                  className="glass-input w-full px-4 py-2.5 rounded text-white placeholder-white/50"
                  onChange={handleChange}
                />
              </div>
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full glass-button text-white font-medium py-2.5 rounded"
              >
                Create Account
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

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <Link to={"/login"}>
                <p className="text-slate-600 text-sm">
                  Already have an account?{" "}
                  <span className="text-slate-900 hover:underline font-medium">
                    Sign In
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

export default SignupPage;
