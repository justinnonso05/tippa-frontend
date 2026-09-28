/* Phone mockup — product visual for the hero right panel
   No emojis. Clean type. Tip tiers displayed as text only. */

const TIERS = [
  { amount: "₦1,000",  label: "Show some love" },
  { amount: "₦5,000",  label: "This really helped!" },
  { amount: "₦20,000", label: "You\'re incredible" },
  { amount: "₦50,000", label: "Superfan" },
];

export function PhoneMockup() {
  return (
    <div className="phone-shell select-none">
      <div className="phone-screen">
        {/* Notch bar */}
        <div className="phone-notch-bar">
          <div className="phone-notch" />
        </div>

        {/* Post cover — real placeholder image */}
        <div style={{ position: "relative", height: 112, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/tippamockup/420/224"
            alt="Post cover"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay label */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: 8,
              padding: "2px 8px",
              fontSize: 9,
              fontWeight: 700,
              background: "var(--color-dark)",
              color: "var(--color-white)",
              borderRadius: 4,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            @creator
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "var(--color-dark)",
                marginBottom: 2,
                lineHeight: 1.3,
              }}
            >
              My latest post
            </p>
            <p style={{ fontSize: 9, color: "var(--color-accent)", fontWeight: 600 }}>
              View original post &rarr;
            </p>
          </div>

          <p style={{ fontSize: 9.5, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
            If this helped you, pick a tip:
          </p>

          {/* Tip tier buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {TIERS.map((tier) => (
              <div
                key={tier.amount}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                  border: "1.5px solid var(--color-dark)",
                  borderRadius: 8,
                  background: "var(--color-white)",
                }}
              >
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 900,
                    color: "var(--color-dark)",
                  }}
                >
                  {tier.amount}
                </span>
                <span style={{ fontSize: 8.5, color: "var(--color-text-secondary)" }}>
                  {tier.label}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: 7.5,
              color: "var(--color-text-secondary)",
              textAlign: "center",
              marginTop: "auto",
              paddingTop: 4,
            }}
          >
            Secure Transfers &middot; One-time &middot; No sign-up
          </p>
        </div>
      </div>
    </div>
  );
}
