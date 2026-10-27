import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

// Example data: the demo habits' completion rate, week by week, for the 20 weeks up to the demo's today (Thu 1 Oct 2026).
const RATES = [58, 62, 55, 64, 66, 61, 69, 72, 68, 74, 71, 77, 75, 80, 78, 82, 79, 84, 83, 87];
const LAST_MONDAY = new Date(2026, 8, 28);
const WEEKS = RATES.map((rate, i) => {
  const start = new Date(LAST_MONDAY);
  start.setDate(start.getDate() - 7 * (RATES.length - 1 - i));
  return { rate, start };
});

const W = 320, H = 168, L = 34, R = 26, T = 12, B = 24;
const x = (i: number) => L + (i * (W - L - R)) / (RATES.length - 1);
// The axis starts at 40%: no week of the example falls below it, and the rise is the point.
const MIN = 40;
const y = (rate: number) => T + ((100 - rate) * (H - T - B)) / (100 - MIN);
const line = WEEKS.map((w, i) => `${i ? "L" : "M"}${x(i)},${y(w.rate)}`).join("");
const area = `${line}L${x(RATES.length - 1)},${y(MIN)}L${x(0)},${y(MIN)}Z`;
const day = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
// A label on the first week of each month; the partial month the chart opens in gets none.
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS: { i: number; label: string }[] = [];
WEEKS.forEach((w, i) => {
  if (i > 0 && w.start.getMonth() !== WEEKS[i - 1].start.getMonth()) MONTHS.push({ i, label: MONTH_NAMES[w.start.getMonth()] });
});

export function RateChart() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.5 });
  const still = useReducedMotion() ?? false;
  const shown = inView || still;
  const [hover, setHover] = useState<number | null>(null);
  const last = RATES.length - 1;

  const pick = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(last, Math.round(((sx - L) / (W - L - R)) * last))));
  };

  return (
    <figure ref={box} className="relative m-0 mt-8 text-left">
      <figcaption className="flex items-baseline justify-between text-sm">
        <span className="font-bold">Habits done, week by week</span>
        <span className="text-muted">Example</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-2 block w-full touch-pan-y overflow-visible"
        role="img"
        aria-label={`Example: the share of habits done rises from ${RATES[0]}% to ${RATES[last]}% over 20 weeks`}
        onPointerMove={pick}
        onPointerDown={pick}
        onPointerLeave={() => setHover(null)}
      >
        {[MIN, 70, 100].map((g) => (
          <g key={g}>
            <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke="var(--color-line)" strokeWidth={g === MIN ? 1.5 : 1} />
            <text x={L - 6} y={y(g)} dy="0.32em" textAnchor="end" className="fill-muted text-[10px] tabular-nums">{g}%</text>
          </g>
        ))}
        {MONTHS.map((m) => (
          <text key={m.i} x={x(m.i)} y={H - 6} textAnchor="start" className="fill-muted text-[10px]">{m.label}</text>
        ))}
        <motion.path
          d={area}
          fill="var(--color-primary)"
          initial={{ opacity: still ? 0.1 : 0 }}
          animate={{ opacity: shown ? 0.1 : 0 }}
          transition={{ duration: 0.8, delay: still ? 0 : 0.9 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: still ? 1 : 0 }}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={{ duration: still ? 0 : 1.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <motion.g
          initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.4 }}
          animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: still ? 0 : 1.5 }}
          style={{ originX: `${x(last)}px`, originY: `${y(RATES[last])}px` }}
        >
          <circle cx={x(last)} cy={y(RATES[last])} r={5} fill="var(--color-primary)" stroke="var(--color-card)" strokeWidth={2} />
          <text x={x(last)} y={y(RATES[last]) - 11} textAnchor="middle" className="fill-fg text-[13px] font-extrabold tabular-nums">{RATES[last]}%</text>
        </motion.g>
        {hover !== null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={y(MIN)} stroke="var(--color-muted)" strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(RATES[hover])} r={4.5} fill="var(--color-card)" stroke="var(--color-primary)" strokeWidth={2} />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-6 rounded-xl bg-fg px-3 py-1.5 text-sm whitespace-nowrap text-bg shadow-clay"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > last / 2 ? "-105%" : "5%"})` }}
        >
          Week of {day(WEEKS[hover].start)}: <b className="tabular-nums">{RATES[hover]}%</b>
        </div>
      )}
    </figure>
  );
}
