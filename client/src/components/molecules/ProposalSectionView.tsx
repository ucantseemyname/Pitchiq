import { memo } from 'react';
import { Markdown } from './Markdown';
import type { Layout } from '../../lib/types';

interface ProposalSectionViewProps {
  index: number;
  label: string;
  content: string;
  showCaret: boolean;
  layout: Layout;
}

/**
 * A single rendered proposal section, styled per the chosen layout. Memoized so
 * that during streaming only the section whose content is actively changing
 * re-renders, keeping the stream O(n) rather than O(n²).
 */
function ProposalSectionViewBase({
  index,
  label,
  content,
  showCaret,
  layout,
}: ProposalSectionViewProps) {
  const num = `0${index + 1}`;
  const body = (
    <div className={showCaret ? 'typing-caret' : ''}>
      <Markdown text={content} />
    </div>
  );

  if (layout === 'editorial') {
    return (
      <section className="animate-fade-up">
        <div className="mb-3 flex items-baseline gap-4">
          <span className="font-serif text-xl font-medium text-primary">{num}</span>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl dark:text-white">
            {label}
          </h2>
        </div>
        <div className="h-px w-full bg-hairline dark:bg-dark-hairline" />
        <div className="mt-5 text-muted">{body}</div>
      </section>
    );
  }

  if (layout === 'modern') {
    return (
      <section className="animate-fade-up rounded-2xl border border-hairline bg-white p-6 shadow-soft dark:border-dark-hairline dark:bg-dark-surface sm:p-7">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-bold text-white">
            {num}
          </span>
          <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl dark:text-white">
            {label}
          </h2>
        </div>
        <div className="text-muted">{body}</div>
      </section>
    );
  }

  if (layout === 'minimal') {
    return (
      <section className="animate-fade-up text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
          {label}
        </div>
        <div className="mx-auto mt-4 max-w-xl text-left text-muted">{body}</div>
      </section>
    );
  }

  // classic (default)
  return (
    <section className="animate-fade-up">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-sm font-extrabold text-primary">{num}</span>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl dark:text-white">
          {label}
        </h2>
      </div>
      <div className="h-px w-full bg-hairline dark:bg-dark-hairline" />
      <div className="mt-4 text-muted">{body}</div>
    </section>
  );
}

export const ProposalSectionView = memo(ProposalSectionViewBase);
