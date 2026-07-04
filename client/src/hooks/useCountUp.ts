import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Final value to count to. */
  end: number;
  /** Duration in ms. */
  duration?: number;
  /** Start the animation only when the element is in view. */
  startOnView?: boolean;
}

/**
 * Animate a number from 0 → end with an ease-out curve. Returns the current
 * value plus a ref to attach to the element that triggers the count on view.
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>({
  end,
  duration = 1600,
  startOnView = true,
}: Options) {
  const [value, setValue] = useState(0);
  const ref = useRef<T | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReduced) {
        setValue(end);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // easeOutExpo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setValue(Math.round(eased * end));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const el = ref.current;
    if (!startOnView || !el || typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { value, ref };
}
