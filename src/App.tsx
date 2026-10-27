import { motion } from "framer-motion";
import { ScrollTour, type TourStep } from "./ScrollTour";

const PLAY = "https://play.google.com/store/apps/details?id=app.kept.habits";

// Copy follows the Play Store screenshots (tracker/store/screenshots/src/store.html); the screens are captures of the
// real app (tracker/store/screenshots/raw/), and each zoom's numbers are what that capture shows.
const TOUR: TourStep[] = [
  { shot: "today", eyebrow: "Today", title: "Your whole day, one glance",
    text: "Habits, to-dos and your calendar in one list. Tap or swipe to tick." },
  { shot: "health", eyebrow: "Health Connect", title: "Fitbit ticks them for you",
    text: "Steps, sleep, water and workouts come in from Health Connect and tick the habits they belong to.",
    zoom: { scale: 1.6, x: 0.72, y: 0.62, label: "8,412 steps ticked Walk; 7:42 of sleep ticked Sleep 7 h" } },
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
    text: "Write the day down, beside the habits you kept. Private notes stay covered." },
  { shot: "groceries", eyebrow: "Groceries and recipes", title: "A list that remembers",
    text: "Sorted by aisle, it knows what you usually buy, and a recipe fills the list in one tap." },
  { shot: "widgets", eyebrow: "Widgets", title: "Tick it from the home screen",
    text: "8 widgets: habits, to-dos, calendar, groceries, journal, focus, heatmap and progress." },
  { shot: "privacy", eyebrow: "Privacy", title: "No account. No server.",
    text: "Your data stays on your phone. Sync to your own Google Drive, if you want. No ads, no analytics." },
  { shot: "dark", eyebrow: "Made for Android", title: "Native. Fast. Material.",
    text: "Built in Kotlin and Material 3. Light, dark and your wallpaper's colours." },
];

const PROMISES = ["Works offline", "No ads", "No account", "Syncs to your Drive"];

const rise = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { type: "spring", stiffness: 70, damping: 18 },
} as const;

function PlayButton() {
  return (
    <a
      className="inline-flex min-h-12 items-center rounded-full bg-primary px-7 font-semibold text-on-primary shadow-clay transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
      href={PLAY}
    >
      Get it on Google Play
    </a>
  );
}

export default function App() {
  return (
    <>
      <header className="mx-auto max-w-2xl px-4 pt-14 pb-10 text-center md:pt-24">
        <motion.div {...rise}>
          <img className="mx-auto rounded-[22%] shadow-clay" src="assets/icon-512.png" alt="" width={72} height={72} />
          <h1 className="mt-5 text-5xl font-extrabold tracking-tight md:text-6xl">Kept</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">
            Habits, to-dos, calendar, journal and groceries in one calm app. Offline, and synced to your own Google Drive.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-medium shadow-clay">
                <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8"><PlayButton /></div>
        </motion.div>
      </header>

      <main>
        <ScrollTour steps={TOUR} />
      </main>

      <section className="px-4 py-24 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">Free, with nothing to sign up for</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">One optional purchase removes the support pop-up. That's all.</p>
        <div className="mt-8"><PlayButton /></div>
      </section>

      <footer className="flex flex-wrap justify-center gap-x-6 px-4 pb-12 text-muted">
        <a className="inline-flex min-h-11 items-center underline" href="https://ivansortino.github.io/kept-policy/">Privacy policy</a>
        <a className="inline-flex min-h-11 items-center underline" href="https://ivansortino.github.io/kept-policy/it">Informativa sulla privacy</a>
        <a className="inline-flex min-h-11 items-center underline" href="mailto:kept.habit.tracker@gmail.com">kept.habit.tracker@gmail.com</a>
      </footer>
    </>
  );
}
