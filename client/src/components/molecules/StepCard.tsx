import type { Step } from '../../data/landing';

/** A single numbered step in the How It Works section. */
export function StepCard({ step }: { step: Step }) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-hairline bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card dark:border-dark-hairline dark:bg-dark-surface">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-lg font-extrabold text-white transition-colors group-hover:bg-primary dark:bg-white dark:text-ink dark:group-hover:bg-primary dark:group-hover:text-white">
          {step.number}
        </span>
      </div>
      <h3 className="text-xl font-bold text-ink dark:text-white">{step.title}</h3>
      <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
    </div>
  );
}
