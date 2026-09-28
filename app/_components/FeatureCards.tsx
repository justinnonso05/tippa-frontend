/* Feature cards — matching reference exactly:
   - Image full-bleed at top of card (no border between image and text)
   - Clear visual gap between image bottom and text block
   - Tag chip as small pill below description */
import { ArrowUpRight } from "./Icons";

const CARDS = [
  {
    image: "/card1.png",
    label: "Analytics",
    title: "Know what's working",
    desc: "Every tip link tracks clicks and earnings. Generate a unique link per post to see exactly which content your audience values.",
    tag: "Post Analytics",
  },
  {
    image: "/card2.png",
    label: "Payouts",
    title: "Get paid your way",
    desc: "Earnings go direct to your wallet and settle instantly. Offer suggested tip tiers or let your super fans type in a custom amount.",
    tag: "Direct Payouts",
  },
  {
    image: "/card3.png",
    label: "Pricing",
    title: "No subscriptions",
    desc: "No monthly platform fee, no lock-in. Tippa takes a flat 5% platform commission only when a tip is paid. You keep the rest, always.",
    tag: "Creator-First",
  },
];

export function FeatureCards() {
  return (
    <section
      id="for-creators"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <div className="badge-selector mb-5 inline-flex">
            <span className="badge-corner tl" aria-hidden />
            <span className="badge-corner tr" aria-hidden />
            <span className="badge-corner bl" aria-hidden />
            <span className="badge-corner br" aria-hidden />
            Features
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.08,
              color: "var(--color-dark)",
            }}
          >
            Built for creators
            <br />
            who mean business.
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CARDS.map((card) => (
            <article
              key={card.image}
              className="card-bordered flex flex-col"
            >
              {/* Image block — NO border-bottom, image just ends naturally */}
              <div
                style={{
                  height: 210,
                  overflow: "hidden",
                  position: "relative",
                  /* Deliberately no border-bottom here — gap comes from text padding */
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Text block — top padding creates the visual gap from image */}
              <div
                className="flex flex-col flex-1"
                style={{ padding: "1.4rem 1.4rem 1.4rem" }}
              >
                {/* Title */}
                <h3
                  className="font-extrabold text-xl leading-snug mb-2"
                  style={{ color: "var(--color-dark)" }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.desc}
                </p>

                {/* Tag chip — pill, small, at the bottom. Matching reference */}
                <div className="flex items-center justify-between">
                  <span className="tag-chip">{card.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
