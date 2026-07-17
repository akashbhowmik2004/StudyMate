
import StudyMateHeader from "../components/StudyMateHeader.jsx";
import ChangeEmail from "../components/Setting/ChangeEmail.jsx";
import ChangePassword from "../components/Setting/ChangePassword.jsx";
import DeleteProfile from "../components/Setting/DeleteProfile.jsx";

export default function Setting() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09131a] text-slate-100">
      <StudyMateHeader />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(45,212,191,0.16),transparent_30%),radial-gradient(circle_at_90%_0%,rgba(251,191,36,0.16),transparent_28%),linear-gradient(180deg,rgba(9,19,26,1),rgba(5,10,14,1))]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-48 h-80 w-80 rounded-full bg-amber-300/12 blur-3xl" />

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-2xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/75">
            Account Settings
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Manage your account details in one place.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Update your email, refresh your password, or remove your account if
            you no longer need StudyMate.
          </p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          <ChangeEmail/>
          <ChangePassword/>
          <DeleteProfile/>
        </section>
      </main>
    </div>
  );
}
