import type { ProposalForm, ProposalSection } from './types';

const RED: [number, number, number] = [255, 0, 0];
const INK: [number, number, number] = [10, 10, 10];
const MUTED: [number, number, number] = [107, 114, 128];
const HAIRLINE: [number, number, number] = [200, 208, 224];

const MARGIN = 56;
const PAGE_W = 595.28; // A4 portrait, points
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;

/**
 * Strip lightweight Markdown to plain text suitable for jsPDF, while preserving
 * bullet structure. Returns an array of logical lines.
 */
function markdownToLines(content: string): { text: string; bullet: boolean }[] {
  const out: { text: string; bullet: boolean }[] = [];
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      out.push({ text: '', bullet: false });
      continue;
    }
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    const cleaned = (bulletMatch ? bulletMatch[1] : line)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/^#+\s*/, '');
    out.push({ text: cleaned, bullet: Boolean(bulletMatch) });
  }
  return out;
}

/**
 * Generate and download a polished PDF of the proposal.
 *
 * jsPDF is imported dynamically so its (sizeable) bundle is only fetched when a
 * user actually exports, keeping the initial app load lean.
 */
export async function downloadProposalPdf(
  form: ProposalForm,
  sections: ProposalSection[]): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  let y = MARGIN;

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // ---- Header band ----
  doc.setFillColor(...INK);
  doc.rect(0, 0, PAGE_W, 96, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Project Proposal', MARGIN, 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text(`Prepared by ${form.senderName || 'Your Agency'}`, MARGIN, 66);
  doc.text(`For ${form.clientName || 'Client'}  ·  ${dateStr}`, MARGIN, 80);

  // Red accent tick on the right of the header.
  doc.setFillColor(...RED);
  doc.rect(PAGE_W - MARGIN - 40, 40, 40, 6, 'F');

  y = 130;

  // ---- Sections ----
  sections.forEach((section, idx) => {
    ensureSpace(48);

    // Section index + heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...RED);
    doc.text(`0${idx + 1}`, MARGIN, y);

    doc.setFontSize(14);
    doc.setTextColor(...INK);
    doc.text(section.label, MARGIN + 26, y);
    y += 10;

    doc.setDrawColor(...HAIRLINE);
    doc.setLineWidth(0.75);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 16;

    // Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...MUTED);

    const lines = markdownToLines(section.content);
    for (const line of lines) {
      if (!line.text) {
        y += 6;
        continue;
      }
      const indent = line.bullet ? 16 : 0;
      const wrapped = doc.splitTextToSize(line.text, CONTENT_W - indent) as string[];
      for (let i = 0; i < wrapped.length; i++) {
        ensureSpace(16);
        if (line.bullet && i === 0) {
          doc.setFillColor(...RED);
          doc.circle(MARGIN + 4, y - 3, 1.6, 'F');
        }
        doc.text(wrapped[i], MARGIN + indent, y);
        y += 15;
      }
    }
    y += 18;
  });

  // ---- Footer on every page ----
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setDrawColor(...HAIRLINE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, PAGE_H - 40, PAGE_W - MARGIN, PAGE_H - 40);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text('Generated with PitchIQ', MARGIN, PAGE_H - 26);
    doc.text(`${p} / ${pageCount}`, PAGE_W - MARGIN, PAGE_H - 26, { align: 'right' });
  }

  const safeClient = (form.clientName || 'client')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
  doc.save(`pitchiq-proposal-${safeClient || 'client'}.pdf`);
}
