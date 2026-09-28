/* Marquee — single straight horizontal strip */
import { StarDiamond } from "./Icons";

const ITEMS = [
  "Per-post tip links",
  "Fixed tip tiers",
  "Instant post analytics",
  "Direct bank payouts",
  "No subscriptions",
  "Secure bank transfers",
  "Works on Instagram, TikTok, Facebook & Snapchat",
];

const DOUBLED = [...ITEMS, ...ITEMS];

export function MarqueeBand() {
  return (
    <div className="marquee-section" aria-label="Feature highlights">
      <div className="marquee-track">
        {DOUBLED.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span style={{ color: "var(--color-accent)" }}>
              <StarDiamond size={13} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
