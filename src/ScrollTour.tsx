import { useEffect, useRef } from "react";

export interface TourStep {
  shot: string;
  eyebrow: string;
  title: string;
  text: string;
  /** Zoom into a detail in the step's second half: the scale, the point (0..1 of the screen) and its label. */
  zoom?: { scale: number; x: number; y: number; label: string };
}

const STEP_VH = 90;
const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (t: number) => Math.min(1, Math.max(0, t));

// One pinned phone for the whole tour: each step slides its real screen in, and a step with a zoom closes in on its
// detail and labels it. Scroll position drives everything; the DOM is updated directly, once a frame, not through state.
export function ScrollTour({ steps }: { steps: TourStep[] }) {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shots = [...root.querySelectorAll<HTMLImageElement>("[data-shot]")];
    const texts = [...root.querySelectorAll<HTMLElement>("[data-text]")];
    const labels = [...root.querySelectorAll<HTMLElement>("[data-label]")];
    const bars = [...root.querySelectorAll<HTMLElement>("[data-bar]")];
    let shown = -1;

    const frame = () => {
      const r = root.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      const at = Math.min(steps.length - 1, Math.floor(p * steps.length));
      const t = p * steps.length - at;
      if (at !== shown) {
        shown = at;
        texts.forEach((el, i) => el.toggleAttribute("data-on", i === at));
        bars.forEach((el, i) => el.toggleAttribute("data-on", i <= at));
      }
      shots.forEach((img, i) => {
        const zoom = steps[i].zoom;
        const u = i === at && zoom && !still ? ease(clamp((t - 0.3) / 0.45)) : 0;
        const s = zoom ? 1 + (zoom.scale - 1) * u : 1;
        const slide = still ? 0 : i < at ? -12 : i > at ? 12 : 0;
        img.style.opacity = i === at ? "1" : "0";
        img.style.transform = zoom && u
          ? `translate(${-(zoom.x - 0.5) * s * u * 100}%, ${-(zoom.y - 0.5) * s * u * 100}%) scale(${s})`
          : `translateY(${slide}%)`;
      });
      labels.forEach((el) => el.toggleAttribute("data-on", Number(el.dataset.label) === at && t > 0.62));
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; frame(); });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    frame();
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, [steps]);

  return (
    <section ref={scene} className="relative" style={{ height: `${steps.length * STEP_VH + 100}vh` }} aria-label="Features">
      <div className="sticky top-0 mx-auto grid h-svh max-w-5xl grid-rows-[auto_1fr] content-start gap-5 px-4 pt-6 md:grid-cols-[1fr_auto] md:grid-rows-1 md:content-center md:items-center md:gap-16 md:pt-0">
        <div className="relative order-2 min-w-0 self-start md:order-1 md:self-center">
          <div className="mb-5 flex justify-center gap-1 md:justify-start" aria-hidden="true">
            {steps.map((s) => (
              <span key={s.eyebrow} data-bar className="h-1 w-5 rounded-full bg-line transition-colors duration-300 data-[on]:bg-primary" />
            ))}
          </div>
          <div className="grid">
            {steps.map((s) => (
              <div
                key={s.eyebrow}
                data-text
                className="col-start-1 row-start-1 translate-y-3 text-center opacity-0 transition duration-500 ease-out data-[on]:translate-y-0 data-[on]:opacity-100 md:text-left motion-reduce:transition-none"
              >
                <p className="text-sm font-bold uppercase tracking-widest text-amber">{s.eyebrow}</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-balance md:mt-2 md:text-4xl">{s.title}</h2>
                <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-muted text-pretty md:mx-0 md:mt-4 md:text-lg">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 mx-auto aspect-[9/20] w-[min(58vw,calc(52svh*9/20))] max-w-full rounded-[2.6rem] bg-neutral-900 p-2 shadow-clay md:order-2 md:w-[min(300px,calc((100svh-6rem)*9/20))]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-[#f1fcfa]">
            {steps.map((s, i) => (
              <img
                key={s.shot}
                data-shot
                src={`assets/shots/${s.shot}.jpg`}
                alt={s.title}
                loading={i < 2 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-[opacity,transform] duration-500 ease-out will-change-transform motion-reduce:transition-none"
              />
            ))}
            {steps.map((s, i) =>
              s.zoom ? (
                <p
                  key={s.shot}
                  data-label={i}
                  className="absolute inset-x-3 bottom-3.5 m-0 translate-y-2 rounded-2xl bg-fg px-3.5 py-2.5 text-sm leading-snug font-bold text-bg opacity-0 transition duration-300 data-[on]:translate-y-0 data-[on]:opacity-100"
                >
                  {s.zoom.label}
                </p>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
