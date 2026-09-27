/* SVG icon components — no emoji, no emoji fallback */

interface IconProps {
  size?: number;
  className?: string;
}

export function ArrowUpRight({ size = 16, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
    </svg>
  );
}

export function Check({ size = 16, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function XMark({ size = 16, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function PlusIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
      className={className} aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* 4-pointed star — used as marquee separator */
export function StarDiamond({ size = 14, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden>
      <path d="M12 2l2.09 7.26L22 12l-7.91 2.74L12 22l-2.09-7.26L2 12l7.91-2.74z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function SnapchatIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 496 512" fill="currentColor"
      className={className} aria-hidden>
      <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm116.2 350.7c-3 .6-4.4 2-5.9 4.7-3.3 6.1-7.7 8.1-13.7 8.1-2.2 0-4.7-.4-7.7-1.1-5.6-1.4-11.1-2.1-16.6-2.1-10.1 0-16.7 2.3-27.9 11.2-16.6 13.2-33 19.5-49 19.5-1.4 0-4-.1-7.4-.5-9.6-1-17.8-4.4-22.7-6.6-4.8 2.2-13.1 5.6-22.7 6.6-3.4.4-6 .5-7.4.5-16 0-32.4-6.3-49-19.5-11.2-8.9-17.8-11.2-27.9-11.2-5.5 0-11 .7-16.6 2.1-3 .7-5.5 1.1-7.7 1.1-6 0-10.4-2-13.7-8.1-1.5-2.7-2.9-4.1-5.9-4.7-10.6-2.1-10.6-9.9-10.6-12.5 0-8.8 8.6-11.2 16.3-13 2-.5 4.5-1.1 6.5-2 6.2-2.8 8.1-9.3 9.1-12.6.4-1.5 1.3-4.2 2.7-4.2.8 0 1.7.4 2.7 1 .5.4 1.2.7 2 1 5.9 2.5 12.4 3.9 19.1 3.9 13.3 0 22.7-5 28.2-9 16.7-12.2 33.4-26.9 58.6-26.9h1.9c25.2 0 41.9 14.7 58.6 26.9 5.6 4.1 15 9 28.3 9 6.7 0 13.2-1.4 19.1-3.9.8-.3 1.5-.7 2.1-1 1-.6 1.9-1 2.7-1 1.8 0 2.4 3.4 2.7 4.2 1 3.3 2.9 9.8 9.1 12.6 2 .9 4.5 1.5 6.5 2 7.7 1.8 16.3 4.2 16.3 13 0 2.5 0 10.4-10.6 12.5zM248 202c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm0-96c-35.3 0-64 28.7-64 64 0 21.6 10.7 40.7 27 52.3v7.7c-13 3.5-31.4 10.6-47 24.3-6.9 6.1-14.4 9.7-23 9.7-14 0-27.4-8.4-31.5-12.3-1-.9-2.3-1.4-3.5-1.4-2.1 0-4 1.6-4 3.9 0 1.4.7 2.6 1.8 3.4 4.3 3.2 6.5 8.9 6.5 16.2v10.2c0 3.8 3.1 7 7 7h8.2c3.7 0 6.7 3 6.7 6.7v.7c0 3.7-3 6.7-6.7 6.7h-14.8c-3.3 0-6 2.7-6 6 0 .6.1 1.3.3 1.9 2.2 7.3 8.8 12.7 16.7 12.7h.2c3.7 0 6.7 3 6.7 6.7v.7c0 3.7-3 6.7-6.7 6.7-8.8 0-16 7.2-16 16v4c0 3.3 2.7 6 6 6h208c3.3 0 6-2.7 6-6v-4c0-8.8-7.2-16-16-16-3.7 0-6.7-3-6.7-6.7v-.7c0-3.7 3-6.7 6.7-6.7h.2c7.9 0 14.5-5.4 16.7-12.7.2-.6.3-1.3.3-1.9 0-3.3-2.7-6-6-6h-14.8c-3.7 0-6.7-3-6.7-6.7v-.7c0-3.7 3-6.7 6.7-6.7h8.2c3.9 0 7-3.2 7-7v-10.2c0-7.3 2.2-13 6.5-16.2 1.1-.8 1.8-2 1.8-3.4 0-2.3-1.9-3.9-4-3.9-1.2 0-2.5.5-3.5 1.4-4.1 3.9-17.5 12.3-31.5 12.3-8.6 0-16.1-3.6-23-9.7-15.6-13.7-34-20.8-47-24.3v-7.7c16.3-11.6 27-30.7 27-52.3 0-35.3-28.7-64-64-64z"/>
    </svg>
  );
}

export function PaystackLogo({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="var(--color-accent)" />
      <path d="M8 11h8M8 13h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
