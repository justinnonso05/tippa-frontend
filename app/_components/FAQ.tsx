"use client";
import { useState } from "react";
import { PlusIcon } from "./Icons";

const FAQS = [
  {
    q: "Which platforms does Tippa support?",
    a: "Any platform where you can copy a share link: Instagram, TikTok, Facebook, and Snapchat. Paste the post URL into Tippa and we handle the rest.",
  },
  {
    q: "Do fans need to sign up to tip?",
    a: "No. Fans click your tip link, pick a tier, and pay securely via bank transfer. No account or sign-up required.",
  },
  {
    q: "How quickly do I receive my money?",
    a: "Tips settle instantly into your Tippa wallet. You can withdraw them directly to your bank account from your dashboard at any time.",
  },
  {
    q: "What are the tip amounts?",
    a: "Fixed tiers: ₦1,000 · ₦5,000 · ₦20,000 · ₦50,000. A clear menu removes awkwardness for fans. The ₦1,000 minimum keeps transactions economically viable after fees.",
  },
  {
    q: "Does Tippa work outside Nigeria?",
    a: "Currently, Tippa is built for Nigerian creators . International expansion comes later — based on demand.",
  },
  {
    q: "Is this different from Ko-fi or Buy Me a Coffee?",
    a: "Yes. Those tools offer one static profile page. Tippa generates a unique tip page per post, so fans tip what they actually watched — and you see exactly which content earns.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-section-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="badge-selector mb-5 inline-flex">
          <span className="badge-corner tl" aria-hidden />
          <span className="badge-corner tr" aria-hidden />
          <span className="badge-corner bl" aria-hidden />
          <span className="badge-corner br" aria-hidden />
          FAQ
        </div>
        <h2
          className="font-extrabold tracking-tight mb-12"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.1, color: "var(--color-dark)" }}
        >
          Common questions.
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="font-bold text-base pr-4 leading-snug"
                  style={{ color: "var(--color-dark)" }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    color: "var(--color-accent)",
                    flexShrink: 0,
                    transition: "transform 0.18s ease",
                    transform: open === i ? "rotate(45deg)" : "none",
                    display: "flex",
                  }}
                >
                  <PlusIcon size={20} />
                </span>
              </button>
              {open === i && (
                <div
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{
                    color: "var(--color-text-secondary)",
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "1rem",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
