/** Static content for the landing page, kept separate from presentation. */

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const STATS: Stat[] = [
  { label: 'Proposals Generated', value: 0, suffix: '+' },
  { label: 'Hours Saved', value: 0, suffix: '+' },
  { label: 'Win Rate', value: 0, suffix: '%' }];

export interface FeatureItem {
  title: string;
  body: string;
}

export const FEATURES: FeatureItem[] = [
  {
    title: 'AI-Written Executive Summary',
    body: 'Claude opens every proposal with a sharp, persuasive summary tailored to your client and their goals, no blank-page paralysis.',
  },
  {
    title: 'Smart Deliverables Builder',
    body: 'Turn a rough list into clear, professionally framed deliverables that set expectations and justify your price.',
  },
  {
    title: 'Timeline Generator',
    body: 'Your timeframe becomes a phased, week-by-week plan that shows clients exactly how the work unfolds.',
  },
  {
    title: 'PDF Export',
    body: 'Download a polished, branded PDF in one click, ready to send the moment generation finishes.',
  },
  {
    title: 'Tone Customization',
    body: 'Professional, Friendly, Bold, or Minimal. Match the voice to the client and your brand in a single tap.',
  }];

export interface Step {
  number: string;
  title: string;
  body: string;
}

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Fill the Form',
    body: 'Answer a few quick questions about you, your client, and the project. Takes about two minutes.',
  },
  {
    number: '02',
    title: 'Claude Generates',
    body: 'Our AI writes a structured, seven-section proposal in seconds, watch it stream in live.',
  },
  {
    number: '03',
    title: 'Download PDF',
    body: 'Review, regenerate if you like, then export a client-ready PDF and close the deal.',
  }];

export interface ComparisonRow {
  /** Capability where a check mark means "good". */
  label: string;
  manual: boolean;
  pitchiq: boolean;
}

export const COMPARISON: ComparisonRow[] = [
  { label: 'Polished proposal in seconds', manual: false, pitchiq: true },
  { label: 'Consistent structure every time', manual: false, pitchiq: true },
  { label: 'Tailored to client & industry', manual: false, pitchiq: true },
  { label: 'Tone matched to your brand', manual: false, pitchiq: true },
  { label: 'Phased timeline auto-generated', manual: false, pitchiq: true },
  { label: 'One-click branded PDF export', manual: false, pitchiq: true },
  { label: 'No blank-page paralysis', manual: false, pitchiq: true }];

export const PRICING_FEATURES: string[] = [
  'Unlimited proposal generation',
  'All seven structured sections',
  'Four customizable tones',
  'One-click branded PDF export',
  'Live streaming generation',
  'Regenerate as many times as you need',
  'Dark mode & accessible by default'];

export interface Plan {
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

/** Simple, affordable tiers. */
export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: 0,
    cadence: 'forever',
    tagline: 'Try it, no card needed.',
    features: [
      '3 proposals / month',
      'All 7 structured sections',
      'PDF export',
      'Professional tone'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    price: 9,
    cadence: '/month',
    tagline: 'For busy freelancers.',
    features: [
      'Unlimited proposals',
      'All 4 custom tones',
      'Priority generation',
      'Saved proposal history',
      'One-click branded PDF'],
    cta: 'Get Pro',
    featured: true,
  },
  {
    name: 'Studio',
    price: 19,
    cadence: '/month',
    tagline: 'For small agencies.',
    features: [
      'Everything in Pro',
      '3 team seats',
      'Custom branding on PDFs',
      'Saved templates',
      'Priority support'],
    cta: 'Get Studio',
  }];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'How does PitchIQ generate proposals?',
    answer:
      'You fill out a short multi-step form about your service, your client, and the project. PitchIQ sends that to Claude, which writes a structured, seven-section proposal tailored to the details you provided, streamed back to you live.',
  },
  {
    question: 'Can I edit the proposal after it’s generated?',
    answer:
      'Yes. You can regenerate to get a fresh take, adjust your inputs and try again, or export the PDF and refine it in your own editor. The generated content is fully yours to use.',
  },
  {
    question: 'What formats can I export?',
    answer:
      'Every proposal can be downloaded as a polished, branded PDF with one click, formatted with a cover header, numbered sections, and page numbers, ready to send to a client.',
  },
  {
    question: 'Do I need any design or writing skills?',
    answer:
      'None at all. PitchIQ handles the structure, the persuasive writing, and the formatting. You just provide the facts about your project and pick a tone.',
  },
  {
    question: 'Is my data stored anywhere?',
    answer:
      'In this version, nothing is stored on a server or database. Your inputs are sent to generate the proposal and held only in your browser for the current session.',
  }];
