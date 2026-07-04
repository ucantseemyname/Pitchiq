import type { ProposalForm } from '../lib/types';

/** Pre-filled form used by the "See Example" link so visitors can preview
 *  output without filling the form or hitting the API. */
export const DEMO_FORM: ProposalForm = {
  senderName: 'Studio Northstar',
  serviceType: 'Video Production',
  location: 'Austin, TX',
  clientName: 'Northwind Co.',
  industry: 'Direct-to-consumer skincare',
  projectDescription:
    'A 90-second brand film to launch Northwind’s new product line, plus social cutdowns for paid and organic campaigns.',
  budget: '$5k–$15k',
  timeline: '1 month',
  deliverables:
    '- 90-second hero brand film\n- 3 vertical social cutdowns\n- Color grading & sound mix\n- Licensed music',
  tone: 'Professional',
  layout: 'editorial',
};

/** Static, fully-formed proposal in the same delimited format the API streams,
 *  so the example renders identically to a live generation. */
export const DEMO_RAW = `[[SECTION:executive_summary]]
Northwind Co. is preparing to launch a new product line into a crowded direct-to-consumer skincare market, and first impressions will define its momentum. Studio Northstar proposes a cinematic 90-second brand film, supported by a suite of social cutdowns, designed to capture attention, communicate your brand story, and convert interest into purchases.

This proposal outlines our approach, deliverables, timeline, and investment to bring that vision to life within a one-month production window.

[[SECTION:our_understanding]]
You are entering a competitive space where authenticity and visual polish are non-negotiable. Northwind needs more than a product video, you need a piece of content that feels premium, builds trust, and performs across both paid and organic channels.

We understand the goal is twofold: a flagship hero film for your launch, and modular cutdowns engineered for vertical, sound-off social feeds.

[[SECTION:proposed_approach]]
Our process is built to de-risk production and maximize the value of every shooting hour.

- **Pre-production:** Creative direction, scripting, shot list, and a detailed shoot board aligned to your brand guidelines.
- **Production:** A single, efficient shoot day with a lean senior crew, captured in formats optimized for both the hero film and vertical cutdowns.
- **Post-production:** Editorial, color grading, sound design, and licensed music, delivered with two rounds of revisions.

[[SECTION:deliverables]]
- One 90-second hero brand film, delivered in 16:9 and master formats
- Three vertical (9:16) social cutdowns optimized for paid and organic
- Professional color grading across all deliverables
- Full sound mix and licensed music track
- Two rounds of revisions included

[[SECTION:timeline]]
The full engagement spans approximately four weeks:

- **Week 1, Pre-production:** Creative development, scripting, and shoot planning.
- **Week 2, Production:** Principal photography and on-set art direction.
- **Week 3, Post-production:** First cut, color, and sound design.
- **Week 4, Finishing:** Revisions, final delivery, and handoff of all assets.

[[SECTION:investment]]
The total investment for this engagement falls within the $5k–$15k range, covering pre-production, a full production day, and complete post-production.

- **Pre-production & creative:** 20%
- **Production day:** 40%
- **Post-production & finishing:** 40%

This is structured to deliver a flagship asset plus a full set of social cutdowns from a single efficient shoot, maximizing the value of every dollar.

[[SECTION:next_steps]]
- Approve this proposal to reserve your production window
- Sign the engagement agreement and submit the initial deposit
- Schedule a kickoff call to align on creative direction
- We begin pre-production immediately upon kickoff
`;
