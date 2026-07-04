const MARQUEE = [
  'Executive Summary',
  'Our Understanding',
  'Proposed Approach',
  'Deliverables',
  'Timeline',
  'Investment',
  'Next Steps',
  'PDF Export',
  'Tone Customization',
];

/** A quiet, editorial marquee band framed by hairlines. */
export function SocialProof() {
  return (
    <section className="group relative overflow-hidden border-y border-hairline py-5 dark:border-dark-hairline">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent dark:from-dark-canvas" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent dark:from-dark-canvas" />
      <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10 whitespace-nowrap">
            <span className="font-serif text-lg italic text-muted">{item}</span>
            <span className="h-1 w-1 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
