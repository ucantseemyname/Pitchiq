import { useCallback, useRef } from 'react';

/**
 * "Magnetic" pointer effect, the element drifts slightly toward the cursor on
 * hover and springs back on leave. Disabled for coarse pointers and
 * reduced-motion users.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current;
      if (!el || !enabled()) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    },
    [strength]);

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = '';
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
