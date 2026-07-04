import { Fragment, type ReactNode } from 'react';

/**
 * Minimal, safe Markdown renderer for proposal content.
 * Supports: paragraphs, `-`/`*` bullet lists, and **bold** / *italic* inline.
 * Renders React nodes directly (no dangerouslySetInnerHTML), so input is never
 * interpreted as raw HTML.
 */
export function Markdown({ text }: { text: string }) {
  const blocks = groupBlocks(text);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'list') {
          return (
            <ul key={i} className="my-3 flex flex-col gap-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-3 text-[15px] leading-relaxed first:mt-0">
            {renderInline(block.text)}
          </p>
        );
      })}
    </>
  );
}

type Block = { type: 'p'; text: string } | { type: 'list'; items: string[] };

function groupBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'p', text: paragraph.join(' ').trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: 'list', items: list });
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.trim().match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
    } else if (line.trim() === '') {
      flushParagraph();
      flushList();
    } else {
      flushList();
      // Strip stray markdown headings.
      paragraph.push(line.replace(/^#+\s*/, ''));
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

/** Render **bold** and *italic* spans within a line. */
function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    if (match[2] !== undefined) {
      parts.push(
        <strong key={key++} className="font-semibold text-ink dark:text-white">
          {match[2]}
        </strong>,
      );
    } else if (match[3] !== undefined) {
      parts.push(<em key={key++}>{match[3]}</em>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return parts;
}
