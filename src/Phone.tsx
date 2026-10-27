import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// A phone showing a looping clip of the app or a still screen. The clip plays only while on screen, never on its own
// with reduced motion, and its button pauses or plays it.
export function Phone({ clip, still, alt, className = "" }: { clip?: string; still?: string; alt: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(video, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;
  const [chosen, setChosen] = useState<boolean | null>(null);
  const playing = chosen ?? !reduceMotion;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && playing) v.play().catch(() => {});
    else v.pause();
  }, [inView, playing]);

  return (
    <div className={`relative mx-auto w-[min(72vw,288px,calc((100svh-6rem)*9/20))] rounded-[2.6rem] bg-neutral-900 p-2 shadow-clay ${className}`}>
      {clip ? (
        <>
          <video
            ref={video}
            className="block aspect-[9/20] w-full rounded-[2.1rem]"
            src={`clips/${clip}.mp4`}
            poster={`clips/${clip}.jpg`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
          />
          <button
            type="button"
            onClick={() => setChosen(!playing)}
            aria-label={playing ? "Pause clip" : "Play clip"}
            className="absolute -right-3 -bottom-3 grid size-11 place-items-center rounded-full bg-card text-fg shadow-clay transition duration-200 active:scale-90"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l10.5-6.5z" />}
            </svg>
          </button>
        </>
      ) : (
        <img className="block aspect-[9/20] w-full rounded-[2.1rem]" src={`assets/stills/${still}.jpg`} alt={alt} loading="lazy" />
      )}
    </div>
  );
}
