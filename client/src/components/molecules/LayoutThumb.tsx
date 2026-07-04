import type { Layout } from '../../lib/types';

/**
 * A small but faithful visual preview of a proposal layout, used in the layout
 * picker so each option reads as a real design rather than a skeleton.
 */
export function LayoutThumb({ layout }: { layout: Layout }) {
  const frame =
    'h-[68px] w-[52px] shrink-0 overflow-hidden rounded-md border border-hairline bg-white shadow-soft dark:border-dark-hairline dark:bg-dark-canvas';
  const line = 'rounded-full bg-hairline dark:bg-white/15';
  const red = 'rounded-full bg-primary';

  if (layout === 'classic') {
    return (
      <div className={frame}>
        <div className="flex h-4 flex-col justify-center gap-0.5 bg-ink px-1.5 dark:bg-black">
          <div className="h-0.5 w-3 rounded-full bg-primary" />
          <div className="h-0.5 w-5 rounded-full bg-white/70" />
        </div>
        <div className="space-y-1.5 p-1.5">
          <div className="flex items-center gap-1">
            <div className={`${red} h-1 w-1.5`} />
            <div className={`${line} h-1 w-4`} />
          </div>
          <div className="h-px w-full bg-hairline dark:bg-white/15" />
          <div className={`${line} h-1 w-full`} />
          <div className={`${line} h-1 w-4/5`} />
        </div>
      </div>
    );
  }

  if (layout === 'editorial') {
    return (
      <div className={`${frame} p-1.5`}>
        <div className={`${red} h-0.5 w-3`} />
        <div className={`${line} mt-1 h-1.5 w-4/5`} />
        <div className="mt-1 h-px w-full bg-hairline dark:bg-white/15" />
        <div className="mt-2 flex items-center gap-1">
          <div className="text-[5px] font-bold text-primary">01</div>
          <div className={`${line} h-1 w-3/5`} />
        </div>
        <div className="mt-1 h-px w-full bg-hairline dark:bg-white/15" />
        <div className="mt-1.5 space-y-1">
          <div className={`${line} h-1 w-full`} />
          <div className={`${line} h-1 w-3/4`} />
        </div>
      </div>
    );
  }

  if (layout === 'modern') {
    return (
      <div className={`${frame}`}>
        <div className="h-1 w-full bg-primary" />
        <div className="space-y-1.5 p-1.5">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-[3px] border border-hairline p-1 dark:border-white/15"
            >
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-[2px] bg-primary" />
                <div className={`${line} h-1 w-3/5`} />
              </div>
              <div className={`${line} mt-1 h-0.5 w-full`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // minimal
  return (
    <div className={`${frame} flex flex-col items-center px-1.5 pt-2.5`}>
      <div className={`${line} h-1 w-1/2`} />
      <div className={`${red} mt-1.5 h-0.5 w-3`} />
      <div className="mt-2.5 w-full space-y-1">
        <div className={`${line} mx-auto h-0.5 w-2/5`} />
        <div className={`${line} h-1 w-full`} />
        <div className={`${line} h-1 w-4/5`} />
      </div>
    </div>
  );
}
