/**
 * Lightweight request validation for the proposal endpoint.
 * Kept dependency-free and explicit so error messages stay actionable.
 */

/**
 * @typedef {Object} ProposalInput
 * @property {string} senderName
 * @property {string} serviceType
 * @property {string} location
 * @property {string} clientName
 * @property {string} industry
 * @property {string} projectDescription
 * @property {string} budget
 * @property {string} timeline
 * @property {string} deliverables
 * @property {string} tone
 */

const SERVICE_TYPES = [
  'Video Production',
  'Web Dev',
  'Design',
  'Photography',
  'Marketing',
  'Consulting',
  'Other',
];

const BUDGETS = ['Under $1k', '$1k–$5k', '$5k–$15k', '$15k+'];
const TIMELINES = ['1 week', '2 weeks', '1 month', '2–3 months', '3 months+'];
const TONES = [
  'Professional',
  'Friendly',
  'Bold',
  'Minimal',
  'Simple English',
  'Persuasive',
  'Storytelling',
  'Executive',
];

const REQUIRED_FIELDS = [
  'senderName',
  'serviceType',
  'clientName',
  'projectDescription',
  'budget',
  'timeline',
  'deliverables',
  'tone',
];

/**
 * Validate and normalize an incoming proposal request body.
 * @param {unknown} body
 * @returns {{ ok: true, value: ProposalInput } | { ok: false, error: string }}
 */
export function validateProposalInput(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Request body must be a JSON object.' };
  }

  const b = /** @type {Record<string, unknown>} */ (body);
  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  const value = {
    senderName: str(b.senderName),
    serviceType: str(b.serviceType),
    location: str(b.location),
    clientName: str(b.clientName),
    industry: str(b.industry),
    projectDescription: str(b.projectDescription),
    budget: str(b.budget),
    timeline: str(b.timeline),
    deliverables: str(b.deliverables),
    tone: str(b.tone),
  };

  for (const field of REQUIRED_FIELDS) {
    if (!value[field]) {
      return { ok: false, error: `Missing required field: "${field}".` };
    }
  }

  if (!SERVICE_TYPES.includes(value.serviceType)) {
    return { ok: false, error: `Invalid serviceType: "${value.serviceType}".` };
  }
  if (!BUDGETS.includes(value.budget)) {
    return { ok: false, error: `Invalid budget: "${value.budget}".` };
  }
  if (!TIMELINES.includes(value.timeline)) {
    return { ok: false, error: `Invalid timeline: "${value.timeline}".` };
  }
  if (!TONES.includes(value.tone)) {
    return { ok: false, error: `Invalid tone: "${value.tone}".` };
  }

  // Guard against pathologically large inputs reaching the model.
  if (value.projectDescription.length > 4000 || value.deliverables.length > 4000) {
    return { ok: false, error: 'Project description and deliverables must be under 4000 characters each.' };
  }

  return { ok: true, value };
}
