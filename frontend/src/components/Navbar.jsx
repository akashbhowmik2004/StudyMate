import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass-container border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-8 flex-wrap sm:flex-nowrap">
        {/* Logo Section */}
        <Link to={"/"}>
          <div className="cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="text-2xl sm:text-xl font-bold text-white tracking-wide">
              StudyMate
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-6 sm:gap-8 list-none m-0 p-0 flex-wrap justify-center">
            <Link to={"/"}>
              <li>
                <span className="text-white font-medium text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full pb-2">
                  Home
                </span>
              </li>
            </Link>
            <Link to={"/features"}>
              <li>
                <span className="text-white font-medium text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full pb-2">
                  Features
                </span>
              </li>
            </Link>
            <Link to={"/about"}>
              <li>
                <span className="text-white font-medium text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full pb-2">
                  About
                </span>
              </li>
            </Link>
            <Link to={"/contact"}>
              <li>
                <span className="text-white font-medium text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full pb-2">
                  Contact
                </span>
              </li>
            </Link>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 sm:gap-4 items-center w-full sm:w-auto justify-center sm:justify-end">
          <Link to="/login">
            <button className="glass-button px-4 sm:px-6 py-2 sm:py-2.5 border border-white/30 text-white font-semibold rounded-md text-sm sm:text-base hover:-translate-y-0.5 transition-all duration-300">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="glass-button px-4 sm:px-6 py-2 sm:py-2.5 text-white font-semibold rounded-md text-sm sm:text-base border border-white/30 hover:-translate-y-0.5 transition-all duration-300 bg-white/20">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
