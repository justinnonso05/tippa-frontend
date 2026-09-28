import { Check } from "./Icons";

const BENEFITS = [
  {
    label: "Post-level insights",
    desc: "Generate a unique link per post to see exactly which content drives earnings, or use one main link for your profile—it's up to you.",
  },
  {
    label: "Fan experience",
    desc: "One link, one tap, one quick bank transfer. Your fans can support you in seconds.",
  },
  {
    label: "Tip flexibility",
    desc: "Suggested tip tiers remove the guesswork, while custom amounts let super fans tip whatever they want.",
  },
  {
    label: "Analytics",
    desc: "Track link clicks, conversions, and total earnings for every tip link directly from your dashboard.",
  },
  {
    label: "Professionalism",
    desc: "A clean, seamless tipping experience without the awkwardness of dropping bank details in the comments.",
  },
  {
    label: "Platform cost",
    desc: "Free to use with no subscriptions. We take a small flat 5% commission only when a tip is paid.",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-section-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="badge-selector mb-5 inline-flex">
            <span className="badge-corner tl" aria-hidden />
            <span className="badge-corner tr" aria-hidden />
            <span className="badge-corner bl" aria-hidden />
            <span className="badge-corner br" aria-hidden />
            Benefits
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.08, color: "var(--color-dark)" }}
          >
            Everything you need
            <br />
            to monetize your audience.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.label}
              className="compare-col col-new"
              style={{ padding: "1.8rem" }}
            >
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-accent)" }}
              >
                {benefit.label}
              </p>
              <p
                className="text-sm leading-relaxed flex items-start gap-3"
                style={{ color: "var(--color-text-on-dark)" }}
              >
                <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 3 }}>
                  <Check size={18} />
                </span>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
