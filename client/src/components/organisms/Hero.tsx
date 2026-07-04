import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';
import { Reveal } from '../atoms/Reveal';
import { Eyebrow } from '../atoms/Eyebrow';
import { ArrowRight } from '../atoms/icons';

/**
 * Editorial Luxe hero, an airy split layout. Oversized Fraunces serif headline
 * with a red italic accent on the left; a refined, floating proposal card with a
 * skewed red footer on the right. Motion is restrained and elegant: staggered
 * reveals, an animated rule, and a gentle float.
 */
export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* faint warm wash for editorial depth */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="container-px grid items-center gap-14 pb-24 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pb-32 lg:pt-24">
        {/* Left: editorial copy */}
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>AI · Proposals · 2026</Eyebrow>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 font-serif text-6xl font-medium leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[5.4rem] dark:text-white">
              Win the room,
              <br />
              <span className="italic text-primary">effortlessly.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 h-px w-16 bg-ink/40 dark:bg-white/40" />
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              Structured, persuasive proposals, written by AI and refined for the
              way real clients decide. Fill a short form, get a client-ready
              document in seconds.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Magnetic>
                <Button
                  size="lg"
                  onClick={() => navigate('/generate')}
                  iconRight={<ArrowRight width={18} height={18} />}
                >
                  Generate a proposal
                </Button>
              </Magnetic>
              <button
                onClick={() => navigate('/proposal?demo=1')}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline-offset-8 hover:underline dark:text-white"
              >
                See an example
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-12 flex items-center gap-8">
              {[
                { n: '3×', l: 'higher win rate' },
                { n: '~8s', l: 'to first draft' },
                { n: '7', l: 'sections' }].map((s) => (
                <div key={s.l} className="flex flex-col">
                  <span className="font-serif text-3xl font-medium text-ink dark:text-white">
                    {s.n}
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-wider text-muted">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: refined proposal card */}
        <Reveal delay={200} from="scale">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-primary/10 to-transparent blur-2xl" />
            <div className="animate-float overflow-hidden rounded-[22px] border border-hairline bg-white shadow-float dark:border-dark-hairline dark:bg-dark-surface">
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-hairline px-7 pb-5 pt-6 dark:border-dark-hairline">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Proposal
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
                  Generated
                </span>
              </div>
              {/* Card body */}
              <div className="px-7 py-6">
                <div className="font-serif text-2xl font-medium leading-snug text-ink dark:text-white">
                  Brand Film Production
                </div>
                <div className="mt-1 text-sm text-muted">Prepared for Northwind Co.</div>

                <div className="mt-6 space-y-5">
                  {['Executive Summary', 'Deliverables'].map((label, i) => (
                    <div key={label}>
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60 dark:text-white/50">
                        {`0${i + 1}, ${label}`}
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-canvas dark:bg-white/10" />
                        <div className="h-1.5 w-[85%] rounded-full bg-canvas dark:bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Skewed red footer */}
              <div className="relative mt-2 h-16 overflow-hidden">
                <div className="absolute inset-x-0 -bottom-4 h-20 -skew-y-3 bg-ink dark:bg-black" />
                <div className="absolute inset-x-0 bottom-0 flex -skew-y-3 items-center justify-between px-7 py-4">
                  <span className="skew-y-3 text-xs font-medium text-white/70">
                    Total investment
                  </span>
                  <span className="skew-y-3 font-serif text-lg text-white">$5k–$15k</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
