import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Reveal } from '../atoms/Reveal';

const AUDIENCES = [
  {
    who: 'Freelancers',
    body: 'Send a polished proposal the same day a lead lands, no blank page.',
  },
  {
    who: 'Agencies',
    body: 'Keep every pitch on-brand and consistent across the whole team.',
  },
  {
    who: 'Consultants',
    body: 'Turn a scoping call into a structured, priced document in minutes.',
  },
  {
    who: 'Studios',
    body: 'Win creative work with proposals that read as sharp as your craft.',
  },
];

/** "Built for" audience band, a row of columns split by vertical hairlines. */
export function UseCases() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Built for</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl dark:text-white">
              Made for people who'd rather be{' '}
              <span className="italic text-primary">doing the work.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:pb-2">
            Whoever sends the proposal, PitchIQ handles the structure and the
            words so you can stay focused on the craft that actually wins clients.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4 dark:border-dark-hairline dark:bg-dark-hairline">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.who} delay={i * 90} className="h-full">
            <div className="group flex h-full flex-col gap-4 bg-canvas p-8 transition-colors hover:bg-white dark:bg-dark-canvas dark:hover:bg-dark-surface">
              <span className="font-serif text-sm text-muted transition-colors group-hover:text-primary">
                {`0${i + 1}`}
              </span>
              <h3 className="font-serif text-2xl font-medium text-ink dark:text-white">
                {a.who}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">{a.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
