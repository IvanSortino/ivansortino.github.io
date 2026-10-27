import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

// A phone showing a looping clip of the app (played only while on screen) or a still screen.
export function Phone({ clip, still, alt, className = "" }: { clip?: string; still?: string; alt: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(video, { amount: 0.4 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && !reduceMotion) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduceMotion]);

  return (
    <div className={`mx-auto w-[min(72vw,288px,calc((100svh-6rem)*9/20))] rounded-[2.6rem] bg-neutral-900 p-2 shadow-2xl shadow-black/25 ${className}`}>
      {clip ? (
        <video
          ref={video}
          className="block aspect-[9/20] w-full rounded-[2.1rem]"
          src={`/clips/${clip}.mp4`}
          poster={`/clips/${clip}.jpg`}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      ) : (
        <img className="block aspect-[9/20] w-full rounded-[2.1rem]" src={`/assets/stills/${still}.jpg`} alt={alt} loading="lazy" />
      )}
    </div>
  );
}
