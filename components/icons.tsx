import type { SVGProps } from "react";

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.84v1.5h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.13v5.42h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4v-11Z" />
    </svg>
  );
}

/** Flag of Barbados: ultramarine / gold / ultramarine with the broken trident. */
export function BarbadosFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 90 60" role="img" aria-label="Flag of Barbados" {...props}>
      <rect width="30" height="60" fill="#00267f" />
      <rect x="30" width="30" height="60" fill="#ffc726" />
      <rect x="60" width="30" height="60" fill="#00267f" />
      <g fill="#000">
        {/* centre spear and broken shaft */}
        <path d="M45 11.5 48 19h-1.7v27.5l-1.3 1.5-1.3-1.5V19H42l3-7.5Z" />
        {/* crossbar */}
        <rect x="40.5" y="38" width="9" height="2.2" rx="0.4" />
        {/* side prongs curving into the head */}
        <path d="M34.2 15.5 36.9 20h-1.25c.1 7.3 1.9 13.3 7.35 14.6v2.4c-7.6-1.2-9.9-8.4-10-17h-1.2l2.4-4.5Z" />
        <path d="M55.8 15.5 53.1 20h1.25c-.1 7.3-1.9 13.3-7.35 14.6v2.4c7.6-1.2 9.9-8.4 10-17h1.2l-2.4-4.5Z" />
      </g>
    </svg>
  );
}
