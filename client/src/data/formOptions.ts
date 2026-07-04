import type { Budget, Layout, ServiceType, Timeline, Tone } from '../lib/types';

export const SERVICE_TYPES: ServiceType[] = [
  'Video Production',
  'Web Dev',
  'Design',
  'Photography',
  'Marketing',
  'Consulting',
  'Other',
];

export const BUDGETS: Budget[] = ['Under $1k', '$1k–$5k', '$5k–$15k', '$15k+'];

export const TIMELINES: Timeline[] = [
  '1 week',
  '2 weeks',
  '1 month',
  '2–3 months',
  '3 months+',
];

export interface ToneOption {
  value: Tone;
  description: string;
  pro?: boolean;
}

export const TONES: ToneOption[] = [
  // Free
  { value: 'Professional', description: 'Polished and authoritative' },
  { value: 'Friendly', description: 'Warm and approachable' },
  { value: 'Bold', description: 'Confident and persuasive' },
  { value: 'Minimal', description: 'Concise, no fluff' },
  // Pro
  { value: 'Simple English', description: 'Plain, clear, everyday words', pro: true },
  { value: 'Persuasive', description: 'Benefit-led, drives the yes', pro: true },
  { value: 'Storytelling', description: 'A narrative that pulls them in', pro: true },
  { value: 'Executive', description: 'Crisp, high-level, boardroom-ready', pro: true },
];

export interface LayoutOption {
  value: Layout;
  name: string;
  description: string;
  pro?: boolean;
}

export const LAYOUTS: LayoutOption[] = [
  {
    value: 'classic',
    name: 'Classic',
    description: 'Bold dark header, numbered sections',
  },
  {
    value: 'editorial',
    name: 'Editorial',
    description: 'Refined serif, magazine-style rules',
    pro: true,
  },
  {
    value: 'modern',
    name: 'Modern',
    description: 'Sectioned cards with accent chips',
    pro: true,
  },
  {
    value: 'minimal',
    name: 'Minimal',
    description: 'Clean, centered, lots of whitespace',
    pro: true,
  },
];
