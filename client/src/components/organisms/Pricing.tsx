import { useNavigate } from 'react-router-dom';
import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Reveal } from '../atoms/Reveal';
import { Button } from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';
import { Check, ArrowRight } from '../atoms/icons';
import { PLANS } from '../../data/landing';
import { cn } from '../atoms/cn';

/** Three affordable tiers in an editorial plan grid, with motion. */
export function Pricing() {
  const navigate = useNavigate();

  return (
    <Section id="pricing">
      <div className="mb-14 flex flex-col items-center gap-5 text-center">
        <Reveal>
          <Eyebrow center>Pricing</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="max-w-2xl text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl dark:text-white">
            Simple, <span className="italic text-primary">affordable</span> pricing.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="max-w-xl text-lg text-muted">
            Start free. Upgrade when you're winning more work. Cancel anytime.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-5xl items-stretch gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 110} from="up" className="h-full">
            <div
              className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-[22px] border p-8 transition-all duration-300 hover:-translate-y-1.5',
                plan.featured
                  ? 'border-primary/40 bg-ink text-white shadow-card hover:shadow-glow dark:bg-dark-surface'
                  : 'border-hairline bg-white shadow-soft hover:shadow-card dark:border-dark-hairline dark:bg-dark-surface',
              )}
            >
              {plan.featured && (
                <>
                  <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-blob rounded-full bg-primary/25 blur-3xl" />
                  <span className="absolute right-6 top-8 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </span>
                </>
              )}

              <div className="relative">
                <h3
                  className={cn(
                    'font-serif text-2xl font-medium',
                    plan.featured ? 'text-white' : 'text-ink dark:text-white',
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    'mt-1 text-sm',
                    plan.featured ? 'text-white/60' : 'text-muted',
                  )}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span
                    className={cn(
                      'font-serif text-5xl font-medium tracking-tight',
                      plan.featured ? 'text-white' : 'text-ink dark:text-white',
                    )}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={cn(
                      'mb-1.5 text-sm',
                      plan.featured ? 'text-white/50' : 'text-muted',
                    )}
                  >
                    {plan.cadence}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  'my-7 h-px',
                  plan.featured ? 'bg-white/15' : 'bg-hairline dark:bg-dark-hairline',
                )}
              />

              <ul className="flex flex-1 flex-col gap-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <Check width={12} height={12} />
                    </span>
                    <span
                      className={cn(
                        'text-[15px]',
                        plan.featured ? 'text-white/90' : 'text-ink dark:text-white/90',
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Magnetic strength={0.2}>
                  <Button
                    fullWidth
                    variant={plan.featured ? 'primary' : 'ghost'}
                    className={
                      plan.featured
                        ? ''
                        : 'border-hairline dark:border-dark-hairline'
                    }
                    onClick={() => navigate('/generate')}
                    iconRight={<ArrowRight width={16} height={16} />}
                  >
                    {plan.cta}
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 text-center text-sm text-muted">
          All plans include live streaming generation, dark mode, and accessibility
          by default.
        </p>
      </Reveal>
    </Section>
  );
}
