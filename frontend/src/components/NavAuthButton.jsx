import {Link} from "react-router";

const NavAuthButton = () => {
  return(
      <div className="flex items-center gap-3">
          <Link to={"/login"}>
              <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 font-semibold text-slate-200 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white">
                  Login
              </button>
          </Link>

          <Link to={"/signup"}>
              <button className="rounded-2xl border border-cyan-200/20 bg-white px-5 py-2.5 font-semibold text-slate-950 shadow-[0_18px_50px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50">
                  Sign Up
              </button>
          </Link>
      </div>
  )
}

export default NavAuthButton;