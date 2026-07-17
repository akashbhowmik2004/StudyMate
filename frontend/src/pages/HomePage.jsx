import { FaBook, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";
import { Features } from "../lib/Features.js";
import FeaturesCard from "../components/FeaturesCard.jsx";

export default function HomePage() {


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.35),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.24),transparent_28%),linear-gradient(180deg,rgba(4,10,24,0.92),rgba(9,15,30,1))]" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-96 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

      <Navbar />

      <section className="relative px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
              Glassmorphism study space for notes, doubts, and collaboration
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Your Study Partner
                <span className="block bg-linear-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent">
                  is Here
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Connect with students, clear your doubts, share notes, and build
                a community focused on learning together.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-2xl border border-cyan-200/30 bg-white px-8 py-4 font-semibold text-slate-950 shadow-[0_20px_60px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-50">
                Get Started
              </button>
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/15">
                Learn More
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/12 bg-white/8 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">10K+</p>
                <p className="mt-1 text-sm text-slate-300">Active learners</p>
              </div>
              <div className="rounded-3xl border border-white/12 bg-white/8 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">500+</p>
                <p className="mt-1 text-sm text-slate-300">Communities</p>
              </div>
              <div className="rounded-3xl border border-white/12 bg-white/8 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">24/7</p>
                <p className="mt-1 text-sm text-slate-300">Study support</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 m-auto h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="relative w-full max-w-md rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                <div>
                  <p className="text-sm text-slate-300">Today&apos;s focus</p>
                  <p className="text-lg font-semibold text-white">StudyMate Hub</p>
                </div>
                <div className="rounded-2xl bg-cyan-300/15 px-3 py-2 text-xs font-semibold text-cyan-200">
                  Live
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-linear-to-br from-white/15 to-white/5 p-5 backdrop-blur-xl">
                  <p className="text-sm text-slate-300">Notes shared</p>
                  <p className="mt-3 text-3xl font-semibold text-white">1.2K</p>
                  <p className="mt-2 text-sm text-cyan-200">Organized and searchable</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-linear-to-br from-indigo-400/20 to-white/5 p-5 backdrop-blur-xl">
                  <p className="text-sm text-slate-300">Questions solved</p>
                  <p className="mt-3 text-3xl font-semibold text-white">8.4K</p>
                  <p className="mt-2 text-sm text-indigo-200">Fast community replies</p>
                </div>
                <div className="col-span-2 rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white/12 p-4 text-cyan-200 shadow-inner shadow-white/5">
                      <FaBook className="text-4xl" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                        Student-first platform
                      </p>
                      <p className="mt-2 text-xl font-semibold text-white">
                        Notes, doubt solving, and peer learning in one place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-white/6 px-6 py-12 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:px-8 lg:px-10">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Powerful Features for Better Learning
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Everything you need to succeed in your studies
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Features.map((feature, index) => (
              <div
                key={feature?.title ?? index}
                className="rounded-3xl border border-white/10 bg-linear-to-br from-white/12 to-white/5 p-1 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <FeaturesCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-white/6 px-6 py-12 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:px-8 lg:px-10">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              How StudyMate Works
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["1", "Sign Up", "Create your account and join the StudyMate community."],
              ["2", "Connect", "Find and join communities related to your courses."],
              ["3", "Share & Learn", "Share notes, ask doubts, and help other students."],
              ["4", "Grow", "Build your skills and academic reputation."],
            ].map(([step, title, description]) => (
              <div
                key={title}
                className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6 text-center backdrop-blur-xl"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-200/20 bg-linear-to-br from-cyan-300/30 to-indigo-500/30 text-2xl font-semibold text-white shadow-[0_10px_35px_rgba(34,211,238,0.15)]">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-white/6 px-6 py-12 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:px-8 lg:px-10">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Why Choose StudyMate?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Join thousands of students already learning together
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["10K+", "Active Students"],
              ["500+", "Communities"],
              ["50K+", "Questions Answered"],
              ["100K+", "Study Notes"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-linear-to-br from-white/12 to-white/5 p-6 text-center backdrop-blur-xl"
              >
                <h3 className="text-4xl font-semibold text-white">{value}</h3>
                <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              ["Collaborative Learning", "Learn from peers and experts in real-time discussions."],
              ["Quality Content", "Access curated notes and verified solutions from the community."],
              ["24/7 Support", "Get help anytime from our active community members."],
              ["Growth Tracking", "Monitor your progress and celebrate your achievements."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="flex gap-4 rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-linear-to-br from-cyan-300/20 to-indigo-500/20 text-cyan-200 shadow-[0_10px_30px_rgba(34,211,238,0.12)]">
                  <FaCheckCircle className="text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-br from-white/14 via-white/8 to-cyan-300/10 px-6 py-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to Start Learning Together?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Join thousands of students and transform your learning experience today.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-50">
              Sign Up Now
            </button>
            <button className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/15">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-slate-950/80 px-4 py-12 text-slate-300 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2">
                <FaBook className="text-xl text-cyan-300" />
                <span className="text-xl font-semibold text-white">StudyMate</span>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Your ultimate study partner for collaborative learning.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-white font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="transition hover:text-cyan-300">Features</a></li>
                <li><a href="#" className="transition hover:text-cyan-300">Pricing</a></li>
                <li><a href="#" className="transition hover:text-cyan-300">FAQs</a></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-white font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="transition hover:text-cyan-300">About Us</a></li>
                <li><a href="#" className="transition hover:text-cyan-300">Blog</a></li>
                <li><a href="#" className="transition hover:text-cyan-300">Careers</a></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-white font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="transition hover:text-cyan-300">Privacy Policy</a></li>
                <li><a href="#" className="transition hover:text-cyan-300">Terms of Service</a></li>
                <li><a href="#" className="transition hover:text-cyan-300">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-sm text-slate-400">© 2024 StudyMate. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="transition hover:text-cyan-300">Twitter</a>
              <a href="#" className="transition hover:text-cyan-300">Facebook</a>
              <a href="#" className="transition hover:text-cyan-300">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
