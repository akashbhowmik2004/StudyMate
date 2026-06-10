
import {FaBook} from "react-icons/fa";
import {Link} from "react-router";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaBook className="text-2xl text-indigo-500" />
            <span className="text-2xl font-bold text-slate-800">StudyMate</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-indigo-500 font-medium transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-600 hover:text-indigo-500 font-medium transition"
            >
              How it Works
            </a>
            <a
              href="#why-us"
              className="text-slate-600 hover:text-indigo-500 font-medium transition"
            >
              Why Us
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <Link to={"/login"}>
              <button className="px-6 py-2 text-indigo-500 font-semibold hover:text-indigo-600 transition">
                Login
              </button>
            </Link>

            <Link to={"/signup"}>
              <button className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition">
                Sign Up
              </button>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
