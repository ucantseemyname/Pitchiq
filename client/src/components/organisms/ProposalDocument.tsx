import { ProposalSectionView } from '../molecules/ProposalSectionView';
import { TypingDocLoader } from '../molecules/TypingDocLoader';
import type { Layout, ProposalForm, ProposalSection } from '../../lib/types';
import { cn } from '../atoms/cn';

interface ProposalDocumentProps {
  layout: Layout;
  form: ProposalForm;
  sections: ProposalSection[];
  isStreaming: boolean;
  showSkeleton: boolean;
  hasError: boolean;
  loaderLabel: string;
}

function useDateStr() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** The generated proposal, rendered in one of four selectable layouts. */
export function ProposalDocument({
  layout,
  form,
  sections,
  isStreaming,
  showSkeleton,
  hasError,
  loaderLabel,
}: ProposalDocumentProps) {
  const dateStr = useDateStr();
  const sender = form.senderName || 'Your Agency';
  const client = form.clientName || 'your client';

  const bodyGap =
    layout === 'minimal'
      ? 'gap-14'
      : layout === 'editorial'
        ? 'gap-12'
        : layout === 'modern'
          ? 'gap-5'
          : 'gap-10';

  const article =
    layout === 'minimal'
      ? 'rounded-3xl border border-hairline bg-white shadow-card dark:border-dark-hairline dark:bg-dark-surface'
      : 'overflow-hidden rounded-3xl border border-hairline bg-white shadow-card dark:border-dark-hairline dark:bg-dark-surface';

  return (
    <article className={article}>
      <Header layout={layout} sender={sender} client={client} dateStr={dateStr} />

      <div
        className={cn(
          layout === 'minimal' ? 'px-6 py-12 sm:px-16 sm:py-16' : 'px-7 py-9 sm:px-10 sm:py-12',
        )}
      >
        {showSkeleton ? (
          <TypingDocLoader label={loaderLabel} />
        ) : sections.length === 0 && hasError ? (
          <p className="text-center text-muted">No content was generated.</p>
        ) : (
          <div className={cn('flex flex-col', bodyGap)}>
            {sections.map((section, idx) => (
              <ProposalSectionView
                key={section.key}
                index={idx}
                label={section.label}
                content={section.content}
                showCaret={isStreaming && idx === sections.length - 1}
                layout={layout}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Header({
  layout,
  sender,
  client,
  dateStr,
}: {
  layout: Layout;
  sender: string;
  client: string;
  dateStr: string;
}) {
  if (layout === 'editorial') {
    return (
      <div className="border-b border-hairline px-7 pb-8 pt-9 sm:px-10 dark:border-dark-hairline">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
          Project Proposal
        </div>
        <div className="mt-3 font-serif text-3xl font-medium text-ink sm:text-4xl dark:text-white">
          {sender}
        </div>
        <div className="mt-1 text-sm text-muted">
          Prepared for {client} · {dateStr}
        </div>
      </div>
    );
  }

  if (layout === 'modern') {
    return (
      <div className="relative px-7 py-8 sm:px-10">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
        <div className="text-xs font-bold uppercase tracking-widest text-primary">
          Project Proposal
        </div>
        <div className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-white">
          {sender}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-muted dark:bg-white/5">
            For {client}
          </span>
          <span className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-muted dark:bg-white/5">
            {dateStr}
          </span>
        </div>
      </div>
    );
  }

  if (layout === 'minimal') {
    return (
      <div className="px-6 pt-14 text-center sm:px-16">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
          Project Proposal
        </div>
        <div className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl dark:text-white">
          {sender}
        </div>
        <div className="mt-2 text-sm text-muted">
          Prepared for {client} · {dateStr}
        </div>
        <div className="mx-auto mt-8 h-px w-10 bg-primary" />
      </div>
    );
  }

  // classic (dark band)
  return (
    <div className="rounded-t-3xl bg-ink px-7 py-8 text-white sm:px-10 dark:bg-black">
      <div className="text-xs font-bold uppercase tracking-widest text-primary">
        Project Proposal
      </div>
      <div className="mt-2 text-2xl font-extrabold sm:text-3xl">{sender}</div>
      <div className="mt-1 text-sm text-white/60">
        Prepared for {client} · {dateStr}
      </div>
    </div>
  );
}
