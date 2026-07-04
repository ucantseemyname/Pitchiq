import { Sparkle } from '../atoms/icons';

/** Floating decorative proposal preview shown in the hero. */
export function MockProposalCard() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* Soft accent glow behind the card */}
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-2xl" />

      <div className="animate-float rounded-3xl bg-white p-6 shadow-float dark:bg-dark-surface">
        {/* Window chrome */}
        <div className="mb-5 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-primary/80" />
          <span className="h-3 w-3 rounded-full bg-hairline" />
          <span className="h-3 w-3 rounded-full bg-hairline" />
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-canvas px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted dark:bg-white/5">
            <Sparkle width={11} height={11} className="text-primary" />
            Generated
          </span>
        </div>

        {/* Header */}
        <div className="mb-4 border-b border-hairline pb-4 dark:border-dark-hairline">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Project Proposal
          </div>
          <div className="mt-1.5 text-lg font-bold text-ink dark:text-white">
            Brand Film Production
          </div>
          <div className="text-xs text-muted">Prepared for Northwind Co.</div>
        </div>

        {/* Body skeleton lines */}
        <div className="space-y-4">
          {['Executive Summary', 'Deliverables', 'Investment'].map((label, i) => (
            <div key={label}>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink/70 dark:text-white/60">
                {`0${i + 1} · ${label}`}
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded-full bg-canvas dark:bg-white/[0.06]" />
                <div className="h-2 w-[88%] rounded-full bg-canvas dark:bg-white/[0.06]" />
                {i === 0 && (
                  <div className="h-2 w-[72%] rounded-full bg-canvas dark:bg-white/[0.06]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer pill */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-ink px-4 py-3 dark:bg-black">
          <span className="text-xs font-semibold text-white">Total Investment</span>
          <span className="text-sm font-bold text-white">$5k–$15k</span>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -left-5 animate-float rounded-2xl bg-primary px-4 py-3 text-white shadow-glow [animation-delay:-3s]">
        <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
          Time to draft
        </div>
        <div className="text-lg font-extrabold leading-none">8 sec</div>
      </div>
    </div>
  );
}
