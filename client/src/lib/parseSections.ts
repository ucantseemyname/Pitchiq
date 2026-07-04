import { SECTION_META, type ProposalSection, type SectionKey } from './types';
import { stripEmDash } from './sanitize';

const ERROR_MARKER = '[[ERROR]]';

export interface ParseResult {
  sections: ProposalSection[];
  error: string | null;
}

/**
 * Parse the streamed proposal text into structured sections.
 *
 * The server emits each section preceded by a `[[SECTION:key]]` marker. This
 * runs on every chunk during streaming, so it must tolerate a partial final
 * section (the last marker may have content still arriving) and a possibly
 * truncated trailing marker like `[[SEC`.
 */
export function parseSections(raw: string): ParseResult {
  // Surface an explicit server-side error sentinel.
  const errorIndex = raw.indexOf(ERROR_MARKER);
  let working = raw;
  let error: string | null = null;
  if (errorIndex !== -1) {
    error = raw.slice(errorIndex + ERROR_MARKER.length).trim() || 'Generation failed.';
    working = raw.slice(0, errorIndex);
  }

  const labelByKey = new Map<string, string>(
    SECTION_META.map((s) => [s.key, s.label]),
  );

  const markerRe = /\[\[SECTION:([a-z_]+)\]\]/g;
  const matches: { key: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = markerRe.exec(working)) !== null) {
    matches.push({ key: m[1], start: m.index, end: markerRe.lastIndex });
  }

  const sections: ProposalSection[] = [];
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const key = current.key as SectionKey;
    if (!labelByKey.has(key)) continue;

    const contentEnd = next ? next.start : working.length;
    // Strip em dashes from every generated section, whatever the source.
    const content = stripEmDash(working.slice(current.end, contentEnd).trim());

    sections.push({
      key,
      label: labelByKey.get(key) as string,
      content,
    });
  }

  return { sections, error };
}
