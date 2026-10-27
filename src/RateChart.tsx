import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

// The app's "Completion over time" card (Stats → Charts, `TrendLine`): a dot a day, the period's average dashed with its
// share at the end, "best:" on the best day, the first, middle and last dates under the line.
// Example data: the demo's last 30 days, up to its today (Thu 1 Oct 2026).
const RATES = [80, 90, 100, 93, 73, 67, 80, 93, 100, 93, 93, 87, 87, 93, 80, 87, 93, 87, 80, 73, 87, 93, 100, 93, 87, 80, 87, 93, 93, 100];
const FIRST = new Date(2026, 8, 2);
const DAYS = RATES.map((rate, i) => {
  const date = new Date(FIRST);
  date.setDate(date.getDate() + i);
  return { rate, date };
});
const AVERAGE = Math.round(RATES.reduce((a, b) => a + b, 0) / RATES.length);
const BEST = RATES.indexOf(Math.max(...RATES));
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const full = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;

const W = 320, H = 132, L = 6, R = 40, T = 8, B = 8;
const last = RATES.length - 1;
const x = (i: number) => L + (i * (W - L - R)) / last;
const y = (rate: number) => T + ((100 - rate) * (H - T - B)) / 100;
const line = DAYS.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.rate)}`).join("");
const area = `${line}L${x(last)},${H - B}L${x(0)},${H - B}Z`;

export function RateChart() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.5 });
  const still = useReducedMotion() ?? false;
  const shown = inView || still;
  const [hover, setHover] = useState<number | null>(null);
  const draw = still ? 0 : 1.4;

  const pick = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(last, Math.round(((sx - L) / (W - L - R)) * last))));
  };

  return (
    <figure ref={box} className="relative m-0 mt-8 rounded-3xl bg-[#e9f1ef] p-4 text-left">
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="font-bold">Completion over time</span>
        <span className="text-sm text-muted">best: {full(DAYS[BEST].date)}</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 block w-full touch-pan-y overflow-visible"
        role="img"
        aria-label={`Example: share of habits done each day for 30 days, ${AVERAGE}% on average, best on ${full(DAYS[BEST].date)}`}
        onPointerMove={pick}
        onPointerDown={pick}
        onPointerLeave={() => setHover(null)}
      >
        <motion.path
          d={area}
          fill="var(--color-primary)"
          initial={{ opacity: still ? 0.14 : 0 }}
          animate={{ opacity: shown ? 0.14 : 0 }}
          transition={{ duration: 0.8, delay: draw * 0.6 }}
        />
        <motion.g
          initial={{ opacity: still ? 1 : 0 }}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={{ duration: 0.5, delay: draw }}
        >
          <line x1={L} x2={W - R + 4} y1={y(AVERAGE)} y2={y(AVERAGE)} stroke="var(--color-muted)" strokeWidth={1} strokeDasharray="4 4" />
          <text x={W - R + 8} y={y(AVERAGE)} dy="0.35em" className="fill-fg text-[12px] font-bold tabular-nums">{AVERAGE}%</text>
        </motion.g>
        <motion.path
          d={line}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: still ? 1 : 0 }}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={{ duration: draw, ease: [0.33, 1, 0.68, 1] }}
        />
        {DAYS.map((d, i) => (
          <motion.circle
            key={i}
            cx={x(i)}
            cy={y(d.rate)}
            r={hover === i ? 5 : 3}
            fill={hover === i ? "var(--color-card)" : "var(--color-primary)"}
            stroke="var(--color-primary)"
            strokeWidth={hover === i ? 2 : 0}
            initial={{ opacity: still ? 1 : 0 }}
            animate={{ opacity: shown ? 1 : 0 }}
            transition={{ duration: 0.2, delay: still ? 0 : (i / last) * draw }}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between pr-10 text-xs text-muted tabular-nums">
        <span>{full(DAYS[0].date)}</span>
        <span>{DAYS[Math.floor(last / 2)].date.getDate()}</span>
        <span>{full(DAYS[last].date)}</span>
      </div>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-12 rounded-xl bg-fg px-3 py-1.5 text-sm whitespace-nowrap text-bg shadow-clay"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > last / 2 ? "-105%" : "5%"})` }}
        >
          {full(DAYS[hover].date)}: <b className="tabular-nums">{DAYS[hover].rate}%</b>
        </div>
      )}
      <p className="mt-2 text-xs text-muted">Example data</p>
    </figure>
  );
}
