import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Reveal } from '../atoms/Reveal';

/** Dark editorial section with one large outcome statistic. */
export function Results() {
  return (
    <Section dark>
      <div className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Eyebrow light center>
            Results
          </Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <p className="max-w-4xl text-balance font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
            <span className="italic text-primary">3× higher</span> client win rate
            with structured, professional proposals.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="max-w-xl text-lg leading-relaxed text-white/60">
            Clients say yes faster when a proposal is clear, confident, and complete.
            PitchIQ gives every pitch the same winning structure, automatically.
          </p>
        </Reveal>

        <Reveal delay={220} className="w-full">
          <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
            {[
              { stat: '8 sec', label: 'Average draft time' },
              { stat: '7', label: 'Structured sections' },
              { stat: '100%', label: 'Client-ready output' }].map((item) => (
              <div key={item.label} className="bg-ink/40 px-6 py-8">
                <div className="font-serif text-4xl font-medium text-white">
                  {item.stat}
                </div>
                <div className="mt-1 text-sm text-white/50">{item.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
