import { useCallback, useRef } from 'react';

interface TiltOptions {
  /** Max rotation in degrees. */
  max?: number;
  /** Scale on hover. */
  scale?: number;
}

/**
 * Pointer-reactive 3D tilt for cards. Returns a ref plus handlers to spread on
 * the element. Uses a CSS transform updated on pointer move; disabled for
 * touch/coarse pointers and reduced-motion users.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 8,
  scale = 1.02,
}: TiltOptions = {}) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current;
      if (!el || !enabled()) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
          px * max
        ).toFixed(2)}deg) scale(${scale})`;
      });
    },
    [max, scale],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform = '';
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
