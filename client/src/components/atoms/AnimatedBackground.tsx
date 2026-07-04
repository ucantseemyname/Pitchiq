/**
 * A fixed, site-wide animated backdrop: slow-drifting colour blobs plus a faint
 * grid. Sits behind all content (z-0, pointer-events none) and is deliberately
 * subtle so it reads as ambient motion rather than noise. Motion is CSS-driven,
 * so it automatically freezes for reduced-motion users.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Faint editorial grid */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(200,208,224,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,208,224,0.5) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
        }}
      />

      {/* Drifting colour blobs */}
      <div className="absolute -left-32 top-[8%] h-[26rem] w-[26rem] animate-blob rounded-full bg-primary/[0.07] blur-3xl dark:bg-primary/[0.12]" />
      <div className="absolute right-[-10rem] top-[35%] h-[30rem] w-[30rem] animate-blob rounded-full bg-[#7c3aed]/[0.06] blur-3xl [animation-delay:-6s] dark:bg-[#7c3aed]/[0.12]" />
      <div className="absolute bottom-[6%] left-[30%] h-[24rem] w-[24rem] animate-blob rounded-full bg-primary/[0.05] blur-3xl [animation-delay:-11s] dark:bg-primary/[0.09]" />
    </div>
  );
}
