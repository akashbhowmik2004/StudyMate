import { FaBook, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";
import { Features } from "../lib/Features.js";
import FeaturesCard from "../components/FeaturesCard.jsx";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#EDE7DA] selection:bg-cyan-500/30">
      
      {/* Modern Ambient Backglow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[20%] w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-[100%]" />
        <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[600px] bg-fuchsia-500/10 blur-[150px] rounded-[100%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 lg:pt-32">
        {/* HERO SECTION */}
        <section className="relative px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-10">
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                  </span>
                  Study smarter, together
                </div>
                <h1 className="font-['Fraunces',_serif] max-w-2xl text-5xl font-black leading-[1.1] tracking-tight text-[#EDE7DA] sm:text-6xl lg:text-7xl">
                  Your Study Partner
                  <span className="mt-2 block bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-sm">
                    is Here
                  </span>
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
                  Connect with students, clear your doubts, share notes, and build
                  a community focused on learning together.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="inline-flex h-14 items-center justify-center rounded-2xl bg-cyan-500 px-8 font-bold text-[#0B0D12] shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] transition-all hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/40 active:scale-95">
                  Get Started for Free
                </button>
                <button className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 font-bold text-[#EDE7DA] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20 active:scale-95">
                  Explore Features
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 pt-4">
                {[
                  ["10K+", "Active learners"],
                  ["500+", "Communities"],
                  ["24/7", "Study support"]
                ].map(([stat, label]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5 backdrop-blur-md transition hover:bg-white/[0.04]">
                    <p className="font-['Fraunces',_serif] text-3xl font-black text-cyan-50">{stat}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO WIDGET */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 m-auto h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-[100px]" />
              <div className="relative w-full max-w-md rounded-[2.5rem] border border-white/10 bg-[#12141B]/80 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-2xl sm:p-8">
                
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.04] px-5 py-4 backdrop-blur-md">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Today's focus</p>
                    <p className="mt-1 font-['Fraunces',_serif] text-lg font-bold text-[#EDE7DA]">StudyMate Hub</p>
                  </div>
                  <div className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">
                    Live
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-[1.5rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-5 backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-200/50">Notes shared</p>
                    <p className="mt-2 font-['Fraunces',_serif] text-3xl font-black text-cyan-400">1.2K</p>
                    <p className="mt-2 text-xs font-medium text-cyan-200/70">Organized and searchable</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-5 backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-200/50">Questions solved</p>
                    <p className="mt-2 font-['Fraunces',_serif] text-3xl font-black text-fuchsia-400">8.4K</p>
                    <p className="mt-2 text-xs font-medium text-fuchsia-200/70">Fast community replies</p>
                  </div>
                  <div className="col-span-2 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl hover:bg-white/[0.04] transition">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                        <FaBook className="text-xl" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Student-first platform
                        </p>
                        <p className="mt-1.5 text-sm font-bold leading-relaxed text-[#EDE7DA]">
                          Notes, doubt solving, and peer learning in one seamless place.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/5 bg-[#12141B]/40 px-6 py-16 backdrop-blur-md sm:px-8 lg:px-12 shadow-2xl shadow-black/50">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA] sm:text-5xl">
                Powerful Features
              </h2>
              <p className="mt-4 text-lg font-medium text-slate-400">
                Everything you need to succeed in your studies, perfectly organized.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Features.map((feature, index) => (
                <div
                  key={feature?.title ?? index}
                  className="overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-1 transition-all hover:border-white/10 hover:bg-white/[0.02]"
                >
                  <FeaturesCard feature={feature} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA] sm:text-5xl">
                How StudyMate Works
              </h2>
              <p className="mt-4 text-lg font-medium text-slate-400">
                Get started in just four simple steps
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
                  className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-xl transition hover:border-cyan-500/30 hover:bg-white/[0.04]"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-2xl font-black text-cyan-400 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] transition-transform group-hover:scale-110 group-hover:bg-cyan-500/20">
                    {step}
                  </div>
                  <h3 className="font-['Fraunces',_serif] text-2xl font-bold text-[#EDE7DA]">{title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US SECTION */}
        <section id="why-us" className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/5 bg-[#12141B]/40 px-6 py-16 backdrop-blur-md sm:px-8 lg:px-12 shadow-2xl shadow-black/50">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA] sm:text-5xl">
                Why Choose Us?
              </h2>
              <p className="mt-4 text-lg font-medium text-slate-400">
                Join thousands of students already learning together
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["10K+", "Active Students"],
                ["500+", "Communities"],
                ["50K+", "Questions Answered"],
                ["100K+", "Study Notes"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center backdrop-blur-xl"
                >
                  <h3 className="font-['Fraunces',_serif] text-4xl font-black text-cyan-400">{value}</h3>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {[
                ["Collaborative Learning", "Learn from peers and experts in real-time discussions."],
                ["Quality Content", "Access curated notes and verified solutions from the community."],
                ["24/7 Support", "Get help anytime from our active community members."],
                ["Growth Tracking", "Monitor your progress and celebrate your achievements."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="flex items-start gap-5 rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:bg-white/[0.04]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-['Fraunces',_serif] text-xl font-bold text-[#EDE7DA]">{title}</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-cyan-500/20 bg-gradient-to-br from-[#12141B] to-[#0B0D12] px-6 py-20 text-center shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] backdrop-blur-2xl sm:px-12">
            <h2 className="font-['Fraunces',_serif] text-4xl font-black tracking-tight text-[#EDE7DA] sm:text-5xl">
              Ready to Start Learning?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-400">
              Join thousands of students and completely transform your learning experience today.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="inline-flex h-14 items-center justify-center rounded-2xl bg-cyan-500 px-10 font-bold text-[#0B0D12] shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] transition-all hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/40 active:scale-95">
                Sign Up Now
              </button>
              <button className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 font-bold text-[#EDE7DA] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20 active:scale-95">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#0B0D12] px-4 py-16 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                  <FaBook className="text-lg" />
                </div>
                <span className="font-['Fraunces',_serif] text-2xl font-bold text-[#EDE7DA]">StudyMate</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-500">
                Your ultimate study partner for collaborative and organized learning.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#EDE7DA]">Product</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><a href="#" className="transition hover:text-cyan-400">Features</a></li>
                <li><a href="#" className="transition hover:text-cyan-400">Pricing</a></li>
                <li><a href="#" className="transition hover:text-cyan-400">FAQs</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#EDE7DA]">Company</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><a href="#" className="transition hover:text-cyan-400">About Us</a></li>
                <li><a href="#" className="transition hover:text-cyan-400">Blog</a></li>
                <li><a href="#" className="transition hover:text-cyan-400">Careers</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#EDE7DA]">Legal</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><a href="#" className="transition hover:text-cyan-400">Privacy Policy</a></li>
                <li><a href="#" className="transition hover:text-cyan-400">Terms of Service</a></li>
                <li><a href="#" className="transition hover:text-cyan-400">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
            <p className="text-xs font-medium text-slate-500">© 2024 StudyMate. All rights reserved.</p>
            <div className="flex gap-6 text-sm font-bold text-slate-500">
              <a href="#" className="transition hover:text-cyan-400">Twitter</a>
              <a href="#" className="transition hover:text-cyan-400">Facebook</a>
              <a href="#" className="transition hover:text-cyan-400">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}