/**
 * Prompt construction for PitchIQ proposal generation.
 *
 * The model is asked to emit each section delimited by an unambiguous marker
 * (`[[SECTION:key]]`). This lets the client parse sections incrementally as the
 * response streams in (for the live typing effect) while still producing a
 * clean, structured document with labeled sections at the end.
 */

/** Canonical, ordered list of sections every proposal must contain. */
export const SECTIONS = [
  { key: 'executive_summary', label: 'Executive Summary' },
  { key: 'our_understanding', label: 'Our Understanding' },
  { key: 'proposed_approach', label: 'Proposed Approach' },
  { key: 'deliverables', label: 'Deliverables' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'investment', label: 'Investment' },
  { key: 'next_steps', label: 'Next Steps' }];

export const SYSTEM_PROMPT = `You are an expert proposal writer for freelancers and agencies. You write persuasive, structured, client-winning project proposals that are clear, confident, and tailored to the specific client and project.

Write in a polished, business-ready voice. Be concrete and specific, reference the client's industry, project, and goals. Never use filler, never apologize, never mention that you are an AI. Do not invent specific prices beyond the provided budget range, but you may break the investment down into phases or line items proportionally.

You MUST format your entire response as a sequence of clearly delimited sections. Output each section using this exact format, with the marker on its own line:

[[SECTION:executive_summary]]
<content>

[[SECTION:our_understanding]]
<content>

[[SECTION:proposed_approach]]
<content>

[[SECTION:deliverables]]
<content>

[[SECTION:timeline]]
<content>

[[SECTION:investment]]
<content>

[[SECTION:next_steps]]
<content>

Rules for content:
- Use Markdown within each section: short paragraphs, and "-" bullet lists where appropriate.
- "Deliverables" should be a bulleted list, expanding on the client's stated deliverables with professional detail.
- "Timeline" should present phases mapped to the requested timeframe (use a bulleted or week-by-week breakdown).
- "Investment" should restate the budget range and frame it as value; you may present a simple phased breakdown.
- "Next Steps" should be a short, action-oriented bulleted list (e.g. approve, sign, kickoff).
- Do NOT output anything before the first marker or after the last section's content.
- Do NOT include the angle brackets or the word "content", write the real proposal text.
- IMPORTANT: Never use em dashes (the "—" character). Use commas, periods, colons, or separate sentences instead. This applies to every section.`;

const TONE_GUIDANCE = {
  Professional: 'Polished, authoritative, and corporate. Measured and credibility-forward.',
  Friendly: 'Warm, approachable, and conversational while remaining competent.',
  Bold: 'Confident, punchy, and persuasive. Lead with outcomes and ambition.',
  Minimal: 'Concise and restrained. Short sentences, no fluff, high signal.',
  'Simple English':
    'Plain, simple English. Short sentences and common everyday words. Avoid jargon, buzzwords, and complex phrasing. Aim for a reading level a busy client can skim in seconds. Prefer "use" over "utilize", "help" over "facilitate".',
  Persuasive:
    'Benefit-led and convincing. Emphasize outcomes, value, and why saying yes is the obvious choice. Use confident, motivating language without hype.',
  Storytelling:
    'Narrative and engaging. Open with the client\'s situation as a story, build toward the transformation your work delivers, and keep a human, flowing rhythm.',
  Executive:
    'Crisp, high-level, and boardroom-ready. Lead with the bottom line, keep sentences tight, and focus on strategic value over detail.',
};

/**
 * Build the user message for a proposal request.
 * @param {import('./validation.js').ProposalInput} input
 */
export function buildUserPrompt(input) {
  const tone = TONE_GUIDANCE[input.tone] || TONE_GUIDANCE.Professional;

  return `Write a complete project proposal using the details below.

SENDER (the freelancer/agency making the proposal)
Name / Agency: ${input.senderName}
Service type: ${input.serviceType}
Location: ${input.location || 'Not specified'}

CLIENT (the recipient)
Client name / company: ${input.clientName}
Industry: ${input.industry || 'Not specified'}
Project description: ${input.projectDescription}

PROJECT DETAILS
Budget range: ${input.budget}
Timeline: ${input.timeline}
Key deliverables: ${input.deliverables}

TONE
${input.tone}: ${tone}

Produce all seven sections in the required delimited format, written from the sender's perspective ("we"/"our team") addressing the client. Remember: never use em dashes.`;
}
