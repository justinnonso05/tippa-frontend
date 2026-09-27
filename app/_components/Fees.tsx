/* Fees — honest, flat, thick borders, no gradient */
import { ArrowUpRight } from "./Icons";

const FEE_ROWS = [
  {
    label: "Fan pays",
    value: "₦5,000",
    sub: "What they click on",
    highlight: false,
  },
  {
    label: "Payment fee",
    value: "₦0 from you",
    sub: "Absorbed by Tippa — not deducted from your tip",
    highlight: false,
  },
  {
    label: "Tippa commission",
    value: "5%",
    sub: "Covers infrastructure and Payment fee absorption",
    highlight: false,
  },
  {
    label: "You receive",
    value: "₦4,400",
    sub: "Straight to your bank, full amount",
    highlight: true,
  },
];

export function Fees() {
  return (
    <section
      id="fees"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left — copy */}
        <div>
          <div className="badge-selector mb-5 inline-flex">
            <span className="badge-corner tl" aria-hidden />
            <span className="badge-corner tr" aria-hidden />
            <span className="badge-corner bl" aria-hidden />
            <span className="badge-corner br" aria-hidden />
            Fees
          </div>
          <h2
            className="font-extrabold tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.08, color: "var(--color-dark)" }}
          >
            You keep
            <br />
            what you earn.
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--color-text-secondary)", maxWidth: 400 }}
          >
            Tippa takes a small platform commission — that&rsquo;s it. Paystack&rsquo;s
            transaction fees are absorbed by us, not deducted from your tip. When
            a fan tips ₦5,000, you get your full share — not ₦5,000 minus fees.
          </p>
          <a href="#get-started" className="btn-stack">
            Try for free
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Right — breakdown card */}
        <div
          className="card-bordered overflow-hidden"
        >
          {/* Card header */}
          <div
            style={{
              padding: "0.9rem 1.5rem",
              borderBottom: "1px solid #e5e7eb",
              background: "var(--color-white)",
            }}
          >
            <p className="font-extrabold text-sm" style={{ color: "var(--color-dark)" }}>
              How a ₦5,000 tip breaks down
            </p>
          </div>

          {/* Rows */}
          {FEE_ROWS.map((row) => (
            <div
              key={row.label}
              className="fee-row"
            >
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{
                    color: row.highlight ? "var(--color-text-on-dark)" : "var(--color-dark)",
                  }}
                >
                  {row.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: row.highlight
                      ? "rgba(250,250,247,0.55)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  {row.sub}
                </p>
              </div>
              <p
                className="font-extrabold text-xl"
                style={{
                  color: row.highlight ? "var(--color-accent)" : "var(--color-dark)",
                }}
              >
                {row.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
