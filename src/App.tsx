import { motion } from "framer-motion";
import { Heatmap } from "./Heatmap";
import { ScrollTour, type TourStep } from "./ScrollTour";

const PLAY = "https://play.google.com/store/apps/details?id=app.kept.habits";

// Copy follows the Play Store screenshots (tracker/store/screenshots/src/store.html); the screens are captures of the
// real app (tracker/store/screenshots/raw/), and each zoom's numbers are what that capture shows.
const TOUR: TourStep[] = [
  { shot: "today", eyebrow: "Today", title: "Your whole day, one glance",
    text: "Habits, to-dos and your calendar in one list. Tap or swipe to tick." },
  { shot: "health", eyebrow: "Health Connect", title: "Fitbit ticks them for you",
    text: "Steps, sleep, water and workouts come in from Health Connect and tick the habits they belong to.",
    zoom: { scale: 1.6, x: 0.72, y: 0.53, label: "8,412 steps ticked Walk; 7:42 of sleep ticked Sleep 7 h" } },
  { shot: "calendar", eyebrow: "Calendar", title: "Your calendar, beside your habits",
    text: "Month, day and agenda views. Events and to-dos in one agenda, and any event can become a to-do." },
  { shot: "todos", eyebrow: "To-dos", title: "To-dos that nag just enough",
    text: "Priorities that remind you, steps that tick the to-do off when they're all done, and repeats." },
  { shot: "stats-charts", eyebrow: "Streaks and stats", title: "See what's working",
    text: "Completion over time, a heatmap of every day, your best weekday and hour.",
    zoom: { scale: 1.3, x: 0.5, y: 0.37, label: "87% on average over 30 days, best on 5 Sep" } },
  { shot: "focus", eyebrow: "Focus", title: "Focus, in rounds",
    text: "A timer with breaks and presets, a calm full-screen clock, and every session kept.",
    zoom: { scale: 1.3, x: 0.5, y: 0.56, label: "Today: Spanish 25 min, Deep work 25 min" } },
  { shot: "journal", eyebrow: "Journal", title: "A journal for every day",
    text: "Write the day down, or a note for each habit you kept, in a full-screen writing view. Private notes stay covered." },
  { shot: "groceries", eyebrow: "Groceries and recipes", title: "A list that remembers",
    text: "Sorted by aisle, it knows what you usually buy, and a recipe fills the list in one tap." },
  { shot: "widgets", eyebrow: "Widgets", title: "Tick it from the home screen",
    text: "8 widgets: habits, to-dos, calendar, groceries, journal, focus, heatmap and progress." },
  { shot: "privacy", eyebrow: "Privacy", title: "No account. No server.",
    text: "Your data stays on your phone. Sync to your own Google Drive, if you want. No ads, no analytics." },
  { shot: "dark", eyebrow: "Made for Android", title: "Native. Fast. Material.",
    text: "Built in Kotlin and Material 3. Light, dark and your wallpaper's colours." },
];

const POLICY = "https://ivansortino.github.io/kept-policy/";

const rise = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { type: "spring", stiffness: 70, damping: 18 },
} as const;

function PlayButton({ small = false }) {
  return (
    <a
      className={`inline-flex items-center gap-2.5 rounded-full bg-primary font-semibold text-on-primary transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${small ? "min-h-11 px-4 text-sm" : "min-h-13 px-7 shadow-clay"}`}
      href={PLAY}
    >
      {small ? "Get it on Play" : <>Get it on Google Play <span aria-hidden="true">→</span></>}
    </a>
  );
}

export default function App() {
  return (
    <>
      <header className="flex min-h-svh flex-col">
        <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <a className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight" href="./">
            <img className="rounded-[22%]" src="assets/icon.svg" alt="" width={32} height={32} />
            Kept
          </a>
          <div className="flex items-center gap-7 font-semibold text-muted">
            <a className="hidden md:inline" href="#tour">Tour</a>
            <a className="hidden md:inline" href={POLICY}>Privacy</a>
            <PlayButton small />
          </div>
        </nav>
        <motion.div {...rise} className="px-4 pt-[6svh] text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-card py-1.5 pr-4 pl-1.5 text-sm font-semibold text-muted shadow-clay">
            <b className="rounded-full bg-primary px-2.5 py-0.5 text-xs text-on-primary">Free</b>
            No ads, no account, no server
          </p>
          <h1 className="mt-6 text-[clamp(46px,7vw,100px)] leading-[.96] tracking-[-.045em]">
            Every good day,<br />
            <span className="text-primary">filled in.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty md:text-xl">
            Habits, to-dos, calendar, journal and groceries in one calm Android app. Tick a day and watch the year fill
            up. Your data stays on your phone.
          </p>
          <div className="mt-8"><PlayButton /></div>
        </motion.div>
        <div className="flex flex-1 flex-col justify-end overflow-hidden pt-9 pb-12">
          <Heatmap />
        </div>
      </header>

      <main id="tour">
        <ScrollTour steps={TOUR} />
      </main>

      <section className="px-4 py-24 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">Free, with nothing to sign up for</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">One optional purchase removes the support pop-up. That's all.</p>
        <div className="mt-8"><PlayButton /></div>
      </section>

      <footer className="flex flex-wrap justify-center gap-x-6 px-4 pb-12 text-muted">
        <a className="inline-flex min-h-11 items-center underline" href={POLICY}>Privacy policy</a>
        <a className="inline-flex min-h-11 items-center underline" href="https://ivansortino.github.io/kept-policy/it">Informativa sulla privacy</a>
        <a className="inline-flex min-h-11 items-center underline" href="mailto:kept.habit.tracker@gmail.com">kept.habit.tracker@gmail.com</a>
      </footer>
    </>
  );
}
