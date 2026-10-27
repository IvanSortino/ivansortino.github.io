import { motion } from "framer-motion";
import { Phone } from "./Phone";

const PLAY = "https://play.google.com/store/apps/details?id=app.kept.habits";

// Copy follows the Play Store screenshots (tracker/store/screenshots/src/store.html).
const FEATURES = [
  { clip: "today", eyebrow: "Today", title: "Your whole day, one glance",
    text: "Habits, to-dos and your calendar in one list. Tap or swipe to tick." },
  { still: "health", eyebrow: "Health Connect", title: "Fitbit ticks them for you",
    text: "Steps, sleep, water and workouts come in from Health Connect and tick the habits they belong to." },
  { clip: "calendar", eyebrow: "Calendar", title: "Your calendar, beside your habits",
    text: "Month, day and agenda views. Events and to-dos in one agenda, and any event can become a to-do." },
  { clip: "todos", eyebrow: "To-dos", title: "To-dos that nag just enough",
    text: "Priorities that remind you, steps that tick the to-do off when they're all done, and repeats." },
  { clip: "routines", eyebrow: "Streaks and stats", title: "Watch your streaks grow",
    text: "Heatmaps, week grids and a history of every day. Rates, streaks and trends for every habit, against the month before." },
  { clip: "focus", eyebrow: "Focus", title: "Focus, in rounds",
    text: "A timer with breaks and presets, a calm full-screen clock, and every session kept." },
  { clip: "journal", eyebrow: "Journal", title: "A journal for every day",
    text: "Write the day down, beside the habits you kept. Private notes stay covered." },
  { clip: "groceries", eyebrow: "Groceries and recipes", title: "A list that remembers",
    text: "Sorted by aisle, it knows what you usually buy, and a recipe fills the list in one tap." },
  { clip: "widgets", eyebrow: "Widgets", title: "Tick it from the home screen",
    text: "8 widgets: habits, to-dos, calendar, groceries, journal, focus, heatmap and progress." },
  { clip: "privacy", eyebrow: "Privacy", title: "No account. No server.",
    text: "Your data stays on your phone. Sync to your own Google Drive, if you want. No ads, no analytics." },
  { still: "dark", eyebrow: "Made for Android", title: "Native. Fast. Material.",
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
      <header className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-14 pb-16 text-center md:grid-cols-2 md:pt-24 md:text-left">
        <motion.div {...rise}>
          <img className="mx-auto rounded-[22%] shadow-clay md:mx-0" src="assets/icon-512.png" alt="" width={72} height={72} />
          <h1 className="mt-5 text-5xl font-extrabold tracking-tight md:text-6xl">Kept</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">
            Habits, to-dos, calendar, journal and groceries in one calm app. Offline, and synced to your own Google Drive.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-medium shadow-clay">
                <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8"><PlayButton /></div>
        </motion.div>
        <motion.div {...rise} transition={{ ...rise.transition, delay: 0.15 }}>
          <Phone clip="today" alt="Ticking to-dos and habits on the Today screen" />
        </motion.div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 md:gap-10">
        {FEATURES.slice(1).map((f, i) => (
          <motion.section
            {...rise}
            key={f.eyebrow}
            className="grid items-center gap-10 rounded-[2.5rem] bg-card px-6 py-12 shadow-clay md:grid-cols-2 md:gap-16 md:px-16 md:py-16"
          >
            <div className={`text-center md:text-left ${i % 2 ? "md:order-2" : ""}`}>
              <p className="text-sm font-bold uppercase tracking-widest text-amber">{f.eyebrow}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance md:text-4xl">{f.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{f.text}</p>
            </div>
            <Phone clip={f.clip} still={f.still} alt={f.title} />
          </motion.section>
        ))}
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
