interface TypingDocLoaderProps {
  /** Status line under the typing block (e.g. mode-specific copy). */
  label?: string;
}

interface Line {
  width: string;
  delay: string;
  caret?: boolean;
}

/**
 * "Typing document" loading state, lines type out left-to-right with a
 * blinking red caret on the active line, evoking a proposal being written live.
 * Shown before the first streamed tokens arrive. Respects reduced-motion (the
 * global rule freezes the width animation to a static, readable placeholder).
 */
export function TypingDocLoader({ label = 'Writing your proposal…' }: TypingDocLoaderProps) {
  const blocks: { heading: string; lines: Line[] }[] = [
    {
      heading: 'Executive Summary',
      lines: [
        { width: '100%', delay: '0s' },
        { width: '92%', delay: '0.5s' },
        { width: '74%', delay: '1s', caret: true }],
    },
    {
      heading: 'Our Understanding',
      lines: [
        { width: '96%', delay: '1.6s' },
        { width: '60%', delay: '2.1s' }],
    }];

  return (
    <div className="flex flex-col gap-10" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {blocks.map((block, bi) => (
        <section key={block.heading}>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="text-sm font-extrabold text-primary">{`0${bi + 1}`}</span>
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl dark:text-white">
              {block.heading}
            </h2>
          </div>
          <div className="h-px w-full bg-hairline dark:bg-dark-hairline" />
          <div className="mt-4 flex flex-col gap-2.5">
            {block.lines.map((line, li) => (
              <div
                key={li}
                className="flex items-center"
                style={{ width: line.width }}
                aria-hidden="true"
              >
                <div className="relative h-3 flex-1 overflow-hidden">
                  <div
                    className="animate-typeline h-full rounded-full bg-canvas dark:bg-white/[0.07]"
                    style={{ animationDelay: line.delay }}
                  />
                </div>
                {line.caret && (
                  <span className="ml-1 h-4 w-0.5 shrink-0 animate-caret-blink bg-primary" />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-2 text-sm text-muted" aria-hidden="true">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
        {label}
      </div>
    </div>
  );
}
