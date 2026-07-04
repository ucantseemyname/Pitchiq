import type { ProposalForm } from './types';

/**
 * Build a proposal locally (no API key required) from the user's own form
 * inputs, emitted in the exact same `[[SECTION:key]]` delimited format the
 * server streams. This powers the keyless "demo" mode: the output reflects the
 * real inputs, and the typing/parse/PDF pipeline is identical to a live run.
 *
 * It is template-based, not AI-written, so the copy is intentionally generic
 * but coherent. Adding an ANTHROPIC_API_KEY upgrades the same flow to Claude.
 */
export function buildLocalProposalRaw(form: ProposalForm): string {
  const sender = form.senderName.trim() || 'Our team';
  const client = form.clientName.trim() || 'your organization';
  const service = (form.serviceType || 'project').toString().toLowerCase();
  const industry = form.industry.trim();
  const location = form.location.trim();
  const description = form.projectDescription.trim();
  const budget = form.budget || 'the agreed budget';
  const timeline = form.timeline || 'the agreed timeline';
  const tone = form.tone || 'Professional';

  const deliverables = toBullets(form.deliverables);
  const industryClause = industry ? ` in the ${industry} space` : '';
  const locationClause = location ? `, based in ${location},` : '';

  const opener = TONE_OPENERS[tone] ?? TONE_OPENERS.Professional;

  const executive = [
    `${opener} ${sender}${locationClause} is pleased to present this proposal to ${client}${industryClause}.`,
    `This document outlines how we'll deliver your ${service} project, covering our understanding of the work, the deliverables, the timeline, and the investment required to make it a success.`].join('\n\n');

  const understanding = [
    description
      ? `Here's the brief as we understand it: ${ensurePeriod(description)}`
      : `We understand that ${client} needs a dependable ${service} partner who can deliver high-quality work on time and on budget.`,
    `Our priority is to translate that goal into a clear, well-structured plan, so there are no surprises and the outcome speaks for itself.`].join('\n\n');

  const approach = [
    `We've built a process designed to de-risk delivery and make the most of every hour:`,
    `- **Discovery & alignment:** We confirm goals, scope, and success criteria with ${client} up front.`,
    `- **Execution:** Our team delivers the ${service} work in focused phases, with regular check-ins.`,
    `- **Review & refinement:** You review the work and we incorporate feedback through structured revision rounds.`,
    `- **Delivery & handoff:** We ship the final deliverables and hand off everything you need.`].join('\n');

  const deliverablesSection =
    deliverables.length > 0
      ? [
          `This engagement includes the following deliverables:`,
          ...deliverables.map((d) => `- ${capitalize(d)}`),
        ].join('\n')
      : `We'll deliver a complete ${service} package tailored to the goals described above, with each item agreed in writing before work begins.`;

  const timelineSection = buildTimeline(timeline, client);

  const investmentSection = [
    `The total investment for this engagement falls within the **${budget}** range, covering the full scope described in this proposal.`,
    `We structure the investment across the project phases:`,
    `- **Discovery & planning:** ~20%`,
    `- **Execution:** ~50%`,
    `- **Review & delivery:** ~30%`,
    `This is designed to deliver clear value at every stage and keep the engagement predictable from kickoff to handoff.`].join('\n\n');

  const nextSteps = [
    `Ready to move forward? Here's how we begin:`,
    `- Approve this proposal to reserve your slot in our schedule`,
    `- Sign the engagement agreement and submit the initial deposit`,
    `- Schedule a kickoff call to align on goals and timeline`,
    `- We begin work immediately upon kickoff`].join('\n');

  return [
    section('executive_summary', executive),
    section('our_understanding', understanding),
    section('proposed_approach', approach),
    section('deliverables', deliverablesSection),
    section('timeline', timelineSection),
    section('investment', investmentSection),
    section('next_steps', nextSteps)].join('\n\n');
}

const TONE_OPENERS: Record<string, string> = {
  Professional: 'Thank you for the opportunity to collaborate.',
  Friendly: 'Thanks so much for considering us, we’re excited about this.',
  Bold: 'Let’s build something that gets results.',
  Minimal: 'A clear plan for the work ahead.',
  'Simple English': 'Thanks for thinking of us. Here is a simple plan for your project.',
  Persuasive: 'Here is how we help you win, and why it works.',
  Storytelling: 'Every great project starts with a clear picture of where you want to go.',
  Executive: 'A concise plan to deliver results, on time and on budget.',
};

function buildTimeline(timeline: string, client: string): string {
  const phases = TIMELINE_PHASES[timeline] ?? [
    'Phase 1, Discovery & planning',
    'Phase 2, Execution',
    'Phase 3, Review & refinement',
    'Phase 4, Final delivery & handoff'];
  return [
    `The engagement runs over **${timeline}**, broken into clear phases so ${client} always knows what's next:`,
    ...phases.map((p) => `- ${p}`),
  ].join('\n');
}

const TIMELINE_PHASES: Record<string, string[]> = {
  '1 week': [
    'Days 1–2, Discovery & planning',
    'Days 3–5, Execution',
    'Days 6–7, Review, refinement & delivery'],
  '2 weeks': [
    'Week 1, Discovery, planning & first execution pass',
    'Week 2, Refinement, review & final delivery'],
  '1 month': [
    'Week 1, Discovery & planning',
    'Week 2, Execution',
    'Week 3, Review & refinement',
    'Week 4, Finishing, delivery & handoff'],
  '2–3 months': [
    'Month 1, Discovery, planning & initial execution',
    'Month 2, Core execution & first reviews',
    'Month 3, Refinement, final delivery & handoff'],
  '3 months+': [
    'Phase 1, Discovery, strategy & planning',
    'Phase 2, Core execution',
    'Phase 3, Iteration & review cycles',
    'Phase 4, Final delivery, handoff & support'],
};

/* ----------------------------- small helpers ----------------------------- */

function section(key: string, body: string): string {
  return `[[SECTION:${key}]]\n${body}`;
}

/** Split a deliverables textarea into clean bullet strings. */
function toBullets(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  let lines = trimmed
    .split('\n')
    .map((l) => l.trim().replace(/^[-*•]\s*/, ''))
    .filter(Boolean);
  // If everything was on one line, fall back to comma separation.
  if (lines.length === 1 && lines[0].includes(',')) {
    lines = lines[0]
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);
  }
  return lines;
}

function capitalize(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

/** Ensure a sentence ends with terminal punctuation. */
function ensurePeriod(s: string): string {
  const t = s.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
}
