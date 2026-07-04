import { SECTION_META } from '../../lib/types';

/** Shimmering placeholder shown before the first streamed tokens arrive. */
export function ProposalSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-10">
      {SECTION_META.slice(0, 4).map((section, i) => (
        <div key={section.key} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="shimmer h-6 w-8 rounded bg-canvas dark:bg-white/[0.06]" />
            <div className="shimmer h-6 w-48 rounded bg-canvas dark:bg-white/[0.06]" />
          </div>
          <div className="h-px w-full bg-hairline dark:bg-dark-hairline" />
          <div className="mt-1 space-y-2.5">
            <div className="shimmer h-3.5 w-full rounded bg-canvas dark:bg-white/[0.06]" />
            <div className="shimmer h-3.5 w-[94%] rounded bg-canvas dark:bg-white/[0.06]" />
            {i % 2 === 0 && (
              <div className="shimmer h-3.5 w-[80%] rounded bg-canvas dark:bg-white/[0.06]" />
            )}
            <div className="shimmer h-3.5 w-[88%] rounded bg-canvas dark:bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
}
