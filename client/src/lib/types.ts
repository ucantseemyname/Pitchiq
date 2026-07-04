/** Shared domain types for the PitchIQ client. */

export type ServiceType =
  | 'Video Production'
  | 'Web Dev'
  | 'Design'
  | 'Photography'
  | 'Marketing'
  | 'Consulting'
  | 'Other';

export type Budget = 'Under $1k' | '$1k–$5k' | '$5k–$15k' | '$15k+';

export type Timeline = '1 week' | '2 weeks' | '1 month' | '2–3 months' | '3 months+';

export type Tone =
  // Free
  | 'Professional'
  | 'Friendly'
  | 'Bold'
  | 'Minimal'
  // Pro
  | 'Simple English'
  | 'Persuasive'
  | 'Storytelling'
  | 'Executive';

/** Visual template for the generated proposal document. */
export type Layout = 'classic' | 'editorial' | 'modern' | 'minimal';

/** The complete set of inputs collected by the multi-step form. */
export interface ProposalForm {
  // Step 1, Your info
  senderName: string;
  serviceType: ServiceType | '';
  location: string;
  // Step 2, Client info
  clientName: string;
  industry: string;
  projectDescription: string;
  // Step 3, Project details
  budget: Budget | '';
  timeline: Timeline | '';
  deliverables: string;
  // Step 4, Tone & layout
  tone: Tone | '';
  layout: Layout;
}

/** Stable keys, matching the server's section markers, in display order. */
export type SectionKey =
  | 'executive_summary'
  | 'our_understanding'
  | 'proposed_approach'
  | 'deliverables'
  | 'timeline'
  | 'investment'
  | 'next_steps';

export interface ProposalSection {
  key: SectionKey;
  label: string;
  content: string;
}

/** Ordered section metadata, shared by the parser and the output view. */
export const SECTION_META: { key: SectionKey; label: string }[] = [
  { key: 'executive_summary', label: 'Executive Summary' },
  { key: 'our_understanding', label: 'Our Understanding' },
  { key: 'proposed_approach', label: 'Proposed Approach' },
  { key: 'deliverables', label: 'Deliverables' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'investment', label: 'Investment' },
  { key: 'next_steps', label: 'Next Steps' }];

export const EMPTY_FORM: ProposalForm = {
  senderName: '',
  serviceType: '',
  location: '',
  clientName: '',
  industry: '',
  projectDescription: '',
  budget: '',
  timeline: '',
  deliverables: '',
  tone: '',
  layout: 'classic',
};
