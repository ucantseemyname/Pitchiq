import type { SVGProps } from 'react';

/** Shared inline icon set. All inherit `currentColor` and are aria-hidden. */

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const X = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Sun = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const Moon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const Download = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const Refresh = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

export const Sparkle = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
  </svg>
);

export const Document = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

export const Clock = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Lock = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const Crown = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base(props)}>
    <path d="M3 8l4 4 5-7 5 7 4-4-2 12H5L3 8z" />
  </svg>
);
