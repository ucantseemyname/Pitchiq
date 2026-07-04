import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Reveal } from '../atoms/Reveal';
import { STEPS } from '../../data/landing';

/** Three editorial steps with oversized serif numerals and hairline rules. */
export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <div className="mb-16 flex flex-col items-center gap-6 text-center">
        <Reveal>
          <Eyebrow center>How it works</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl dark:text-white">
            From blank page to client-ready in three steps.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3 dark:border-dark-hairline dark:bg-dark-hairline">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 110} className="h-full">
            <div className="group flex h-full flex-col gap-6 bg-canvas p-9 transition-colors hover:bg-white dark:bg-dark-canvas dark:hover:bg-dark-surface">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-6xl font-medium text-ink/15 transition-colors group-hover:text-primary dark:text-white/15">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium text-ink dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
