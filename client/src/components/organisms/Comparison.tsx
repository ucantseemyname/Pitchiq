import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Reveal } from '../atoms/Reveal';
import { Check, X } from '../atoms/icons';
import { Logo } from '../atoms/Logo';
import { COMPARISON } from '../../data/landing';
import { cn } from '../atoms/cn';

/** Two-column checklist comparison: manual writing vs PitchIQ. */
export function Comparison() {
  return (
    <Section>
      <div className="mb-14 flex flex-col items-center gap-5 text-center">
        <Reveal>
          <Eyebrow center>Comparison</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="max-w-2xl text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl dark:text-white">
            Manual writing vs <span className="italic text-primary">PitchIQ</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="max-w-xl text-lg text-muted">
            The same proposal, a fraction of the effort.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Manual */}
        <div className="rounded-3xl border border-hairline bg-white p-8 shadow-soft dark:border-dark-hairline dark:bg-dark-surface">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-canvas text-muted dark:bg-white/5">
              <X width={20} height={20} />
            </span>
            <div>
              <div className="text-lg font-bold text-ink dark:text-white">
                Manual Writing
              </div>
              <div className="text-sm text-muted">The slow way</div>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {COMPARISON.map((row) => (
              <Row key={row.label} label={row.label} positive={row.manual} />
            ))}
          </ul>
        </div>

        {/* PitchIQ */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-ink p-8 shadow-card dark:bg-dark-surface">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
              <Check width={20} height={20} />
            </span>
            <div>
              <Logo light className="h-5" />
              <div className="text-sm text-white/50">The fast way</div>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {COMPARISON.map((row) => (
              <Row key={row.label} label={row.label} positive={row.pitchiq} light />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Row({
  label,
  positive,
  light,
}: {
  label: string;
  positive: boolean;
  light?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          'grid h-6 w-6 shrink-0 place-items-center rounded-full',
          positive
            ? 'bg-primary text-white'
            : light
              ? 'bg-white/10 text-white/40'
              : 'bg-canvas text-muted dark:bg-white/5',
        )}
      >
        {positive ? <Check width={14} height={14} /> : <X width={14} height={14} />}
      </span>
      <span
        className={cn(
          'text-[15px]',
          positive
            ? light
              ? 'font-medium text-white'
              : 'font-medium text-ink dark:text-white'
            : light
              ? 'text-white/40 line-through'
              : 'text-muted line-through',
        )}
      >
        {label}
      </span>
    </li>
  );
}
