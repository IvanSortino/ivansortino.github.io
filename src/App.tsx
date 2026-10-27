import { StickyScrollCards } from "./components/ui/sticky-scroll-cards";

// TODO: refine copy for each feature
const FEATURES = [
  { title: "Today", src: "/assets/shots/1-today.jpg" },
  { title: "Health Connect", src: "/assets/shots/2-health-connect.jpg" },
  { title: "Calendar", src: "/assets/shots/3-calendar.jpg" },
  { title: "Widgets", src: "/assets/shots/4-widgets.jpg" },
  { title: "Journal", src: "/assets/shots/5-journal.jpg" },
  { title: "Groceries", src: "/assets/shots/6-groceries.jpg" },
  { title: "Private", src: "/assets/shots/7-privacy.jpg" },
];

export default function App() {
  return (
    <>
      <header className="px-4 pt-16 pb-8 text-center">
        <img className="mx-auto rounded-[22%]" src="/assets/icon-512.png" alt="" width={96} height={96} />
        <h1 className="my-2 text-4xl font-bold">Kept</h1>
        <p className="mx-auto mb-6 max-w-lg text-muted">
          Habits, to-dos, a journal and groceries. Offline, no ads, synced to your own Google Drive.
        </p>
        <a
          className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-on-accent"
          href="https://play.google.com/store/apps/details?id=app.kept.habits"
        >
          Get it on Google Play
        </a>
      </header>

      <StickyScrollCards cards={FEATURES} />

      <footer className="px-4 py-12 text-center text-muted">
        <a className="underline" href="/kept-policy/">Privacy policy</a> ·{" "}
        <a className="underline" href="/kept-policy/it">Informativa sulla privacy</a> ·{" "}
        <a className="underline" href="mailto:kept.habit.tracker@gmail.com">kept.habit.tracker@gmail.com</a>
      </footer>
    </>
  );
}
