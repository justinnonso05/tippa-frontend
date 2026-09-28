/* How It Works — 4 numbered steps, thick black borders, no emoji */
import { ArrowUpRight } from "./Icons";

const STEPS = [
  {
    num: "01",
    title: "Paste your post link",
    desc: "Copy the share link from any Instagram, TikTok, Facebook, or Snapchat post and paste it into Tippa.",
  },
  {
    num: "02",
    title: "Get your tip link",
    desc: "Tippa fetches your post cover and generates a unique, shareable tip page in seconds.",
  },
  {
    num: "03",
    title: "Share it with fans",
    desc: "Drop your tip link in your caption, bio, or comments. Any platform, any format.",
  },
  {
    num: "04",
    title: "Get paid directly",
    desc: "Fans choose an amount and pay securely. Your share lands straight in your wallet instantly.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-section-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="badge-selector mb-5 inline-flex">
            <span className="badge-corner tl" aria-hidden />
            <span className="badge-corner tr" aria-hidden />
            <span className="badge-corner bl" aria-hidden />
            <span className="badge-corner br" aria-hidden />
            How it works
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.08,
              color: "var(--color-dark)",
            }}
          >
            Four steps to
            <br />
            your first tip.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="card-bordered p-6 flex flex-col gap-4"
            >
              <div className="step-num">{step.num}</div>
              <h3
                className="font-extrabold text-lg leading-snug"
                style={{ color: "var(--color-dark)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <a href="#get-started" className="btn-stack">
            Start for free
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
