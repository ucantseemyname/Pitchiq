import { useId, useState, type ReactNode } from 'react';
import { cn } from '../atoms/cn';
import { Plus } from '../atoms/icons';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index open by default; null for all closed. */
  defaultOpen?: number | null;
  /** Allow multiple panels open at once. */
  allowMultiple?: boolean;
  variant?: 'light' | 'dark';
}

/** Accessible accordion used by both the Features and FAQ sections. */
export function Accordion({
  items,
  defaultOpen = 0,
  allowMultiple = false,
  variant = 'light',
}: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(defaultOpen === null ? [] : [defaultOpen]),
  );
  const baseId = useId();

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'divide-y rounded-2xl border',
        isDark
          ? 'divide-white/10 border-white/10 bg-white/[0.03]'
          : 'divide-hairline border-hairline bg-white shadow-soft dark:divide-dark-hairline dark:border-dark-hairline dark:bg-dark-surface',
      )}
    >
      {items.map((item, i) => {
        const expanded = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors',
                  isDark ? 'text-white hover:bg-white/[0.03]' : 'hover:bg-canvas/60 dark:hover:bg-white/[0.02]',
                )}
              >
                <span className="text-base font-semibold sm:text-lg">{item.title}</span>
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform duration-300',
                    expanded && 'rotate-45',
                    isDark
                      ? 'border-white/15 text-white'
                      : 'border-hairline text-ink dark:border-dark-hairline dark:text-white',
                    expanded && 'border-primary bg-primary text-white',
                  )}
                >
                  <Plus width={16} height={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className={cn(
                'px-6 pb-6 text-[15px] leading-relaxed',
                isDark ? 'text-white/70' : 'text-muted',
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
