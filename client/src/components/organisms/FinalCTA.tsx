import { useNavigate } from 'react-router-dom';
import { Section } from '../atoms/Section';
import { Button } from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';
import { Reveal } from '../atoms/Reveal';
import { ArrowRight } from '../atoms/icons';

/** Closing dark CTA section. */
export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <Section dark>
      <div className="relative overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-7 px-6 py-14 text-center sm:py-20">
          <Reveal>
            <h2 className="max-w-3xl text-balance font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
              Ready to close more clients,{' '}
              <span className="italic text-primary">effortlessly?</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xl text-lg leading-relaxed text-white/60">
              Stop staring at a blank page. Generate your next winning proposal in
              seconds, and get back to the work that matters.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <Magnetic>
              <Button
                size="lg"
                onClick={() => navigate('/generate')}
                iconRight={<ArrowRight width={18} height={18} />}
              >
                Generate a proposal
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
