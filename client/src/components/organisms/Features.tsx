import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Reveal } from '../atoms/Reveal';
import { FEATURES } from '../../data/landing';

/** Editorial features: a sticky headline beside a hairline-ruled list. */
export function Features() {
  return (
    <Section id="features">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* Sticky editorial intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Features</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl dark:text-white">
              Everything a winning proposal needs, written for you.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              PitchIQ handles the structure, the persuasion, and the formatting, so every pitch arrives polished and complete.
            </p>
          </Reveal>
        </div>

        {/* Hairline-ruled feature list */}
        <div className="flex flex-col">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 70}>
              <div className="group flex gap-6 border-t border-hairline py-7 transition-colors last:border-b dark:border-dark-hairline">
                <span className="font-serif text-2xl font-medium text-muted transition-colors group-hover:text-primary">
                  {`0${i + 1}`}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-ink dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                    {feature.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
