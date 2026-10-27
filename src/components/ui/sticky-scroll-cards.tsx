// Componentry's Sticky Scroll Cards (componentry.dev/r/sticky-scroll-cards.json), adapted:
// portrait phone screenshots instead of landscape photos, no cn() helper, no default cards.
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef } from "react";

export interface StickyScrollCardItem {
  title: string;
  src: string;
}

interface StickyScrollCardsProps {
  /** Array of card items, each with a title and image src URL */
  cards: StickyScrollCardItem[];
  /** Hint label shown above the stack */
  hint?: string;
  /** Additional CSS classes for the outer container */
  className?: string;
}

const TILT_PATTERN = [-1.25, 0.85, -0.65, 1.35, -0.9];

function StackCard({
  card,
  index,
  total,
  container,
  reduceMotion,
}: {
  card: StickyScrollCardItem;
  index: number;
  total: number;
  container: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const start = total > 1 ? index / (total + 1) : 0;
  const restingScale = Math.max(0.56, 1 - (total - index - 1) * 0.095);
  const scale = useTransform(
    scrollYProgress,
    [start, 1],
    reduceMotion ? [1, 1] : [1, restingScale],
  );

  return (
    <section className="sticky top-0 grid h-screen place-items-center">
      <motion.figure
        className="relative m-0 origin-top overflow-hidden rounded-3xl bg-white text-neutral-950"
        style={{
          scale,
          rotate: reduceMotion ? 0 : TILT_PATTERN[index % TILT_PATTERN.length],
          top: `calc(-5vh + ${40 + index * 14}px)`,
          boxShadow:
            "0 2px 5px rgb(0 0 0 / 0.06), 0 18px 48px rgb(0 0 0 / 0.13)",
        }}
      >
        <div className="p-2.5 pb-0">
          <img
            src={card.src}
            alt={card.title}
            className="block aspect-[9/16] h-[min(70vh,560px)] rounded-2xl object-cover"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
        <figcaption className="grid h-11 place-items-center px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
          {card.title}
        </figcaption>
      </motion.figure>
    </section>
  );
}

export function StickyScrollCards({
  cards,
  hint = "scroll to explore",
  className = "",
}: StickyScrollCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const content = (
    <main
      ref={container}
      className={`relative flex w-full flex-col items-center pb-[100vh] pt-[20vh] ${className}`}
    >
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-30">
          {hint}
        </p>
        <span className="h-12 w-px bg-gradient-to-b from-fg/30 to-transparent" />
      </div>

      {cards.map((card, index) => (
        <StackCard
          key={`${card.src}-${index}`}
          card={card}
          index={index}
          total={cards.length}
          container={container}
          reduceMotion={reduceMotion}
        />
      ))}
    </main>
  );

  return reduceMotion ? content : <ReactLenis root>{content}</ReactLenis>;
}
