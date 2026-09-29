/* Feature cards */
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
      className="py-16 md:py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CARDS.map((card) => (
            <article
              key={card.image}
              className="card-bordered flex flex-col group hover:bg-[var(--color-dark)] transition-colors duration-500 ease-out"
            >
              <div
                style={{
                  height: 210,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div
                className="flex flex-col flex-1"
                style={{ padding: "1.4rem 1.4rem 1.4rem" }}
              >
                <h3
                  className="font-extrabold text-xl leading-snug mb-2 group-hover:text-[var(--color-bg)] transition-colors duration-500"
                  style={{ color: "var(--color-dark)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1 mb-4 group-hover:text-gray-300 transition-colors duration-500"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="tag-chip group-hover:bg-white/10 group-hover:text-white transition-colors duration-500">{card.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
