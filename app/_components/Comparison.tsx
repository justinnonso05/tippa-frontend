/* Comparison — sharing account number vs a Tippa link
   Flat, thick borders, no shadow */
import { Check, XMark } from "./Icons";

type Row = { label: string; old: string; tippa: string };

const ROWS: Row[] = [
  {
    label: "Post-level tracking",
    old: "None. You can't tell which post earned what.",
    tippa: "Every tip is tied to a specific post. Full breakdown in your dashboard.",
  },
  {
    label: "Fan experience",
    old: "Copy account number. Open banking app. Send manually.",
    tippa: "One link, one tap, one card payment. Done in under 30 seconds.",
  },
  {
    label: "Tip tiers",
    old: "Fan decides the amount — often feels awkward.",
    tippa: "Clear fixed tiers: ₦1k · ₦5k · ₦20k · ₦50k. No awkwardness.",
  },
  {
    label: "Analytics",
    old: "None whatsoever.",
    tippa: "Clicks, conversions, and earnings per post — on your dashboard.",
  },
  {
    label: "Professionalism",
    old: "Sharing bank details in a comment looks informal.",
    tippa: "A clean, branded tip page that matches your content style.",
  },
  {
    label: "Platform cost",
    old: "Free — but zero infrastructure, zero insight.",
    tippa: "Small commission only when a tip is paid. You keep the rest.",
  },
];

export function Comparison() {
  return (
    <section
      id="why-tippa"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-section-bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="badge-selector mb-5 inline-flex">
            <span className="badge-corner tl" aria-hidden />
            <span className="badge-corner tr" aria-hidden />
            <span className="badge-corner bl" aria-hidden />
            <span className="badge-corner br" aria-hidden />
            Why Tippa
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: "var(--color-dark)" }}
          >
            Account number vs.
            <br />
            a Tippa link.
          </h2>
          <p
            className="mt-3 text-base"
            style={{ color: "var(--color-text-secondary)", maxWidth: 480 }}
          >
            Both move money. Only one tells you what&rsquo;s working.
          </p>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div
            className="compare-col col-old"
            style={{ paddingTop: "0.9rem", paddingBottom: "0.9rem" }}
          >
            <p className="font-extrabold text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Sharing your account number
            </p>
          </div>
          <div
            className="compare-col col-new"
            style={{ paddingTop: "0.9rem", paddingBottom: "0.9rem" }}
          >
            <p
              className="font-extrabold text-sm flex items-center gap-2"
              style={{ color: "var(--color-text-on-dark)" }}
            >
              <span style={{ color: "var(--color-accent)" }}>&#10022;</span>
              A Tippa link
            </p>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-3">
          {ROWS.map((row) => (
            <div key={row.label} className="grid grid-cols-2 gap-4">
              <div className="compare-col col-old">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--color-accent-dark)" }}
                >
                  {row.label}
                </p>
                <p className="text-sm flex items-start gap-2" style={{ color: "#555" }}>
                  <XMark size={14} className="mt-0.5 flex-shrink-0" />
                  {row.old}
                </p>
              </div>
              <div className="compare-col col-new">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--color-accent)" }}
                >
                  {row.label}
                </p>
                <p
                  className="text-sm flex items-start gap-2"
                  style={{ color: "var(--color-text-on-dark)" }}
                >
                  <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}>
                    <Check size={14} />
                  </span>
                  {row.tippa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
