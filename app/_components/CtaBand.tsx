/* Dark closing CTA band — no gradient, flat dark background */
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "./Icons";

export function CtaBand() {
  return (
    <section
      id="get-started"
      className="py-24 px-5 sm:px-8 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      {/* Accent blob accents — flat, no gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 340,
          height: 340,
          borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          background: "var(--color-accent)",
          opacity: 0.08,
        }}
      />

      <div className="max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
        {/* Badge */}
        <div className="badge-selector mb-7 inline-flex" style={{ borderColor: "var(--color-accent)" }}>
          <span className="badge-corner tl" aria-hidden />
          <span className="badge-corner tr" aria-hidden />
          <span className="badge-corner bl" aria-hidden />
          <span className="badge-corner br" aria-hidden />
          <span style={{ color: "var(--color-accent)", fontSize: "0.8rem" }}>&#10022;</span>
          <span style={{ color: "var(--color-text-on-dark)" }}>Get started today</span>
        </div>

        <h2
          className="font-extrabold tracking-tight mb-5"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            lineHeight: 1.08,
            color: "var(--color-text-on-dark)",
          }}
        >
          Your next post could be
          <br />
          <span style={{ color: "var(--color-accent)" }}>
            your next payday.
          </span>
        </h2>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "rgba(250,250,247,0.6)", maxWidth: 500 }}
        >
          Join early and start linking posts to real earnings. Paste a link,
          share your tip page — it takes under a minute.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/signup" className="btn-stack-accent">
            Start earning
            <ArrowUpRight size={15} />
          </Link>
          <a
            href="#how-it-works"
            className="btn-link"
            style={{ color: "rgba(250,250,247,0.65)" }}
          >
            See how it works
            <ArrowRight size={15} />
          </a>
        </div>

        <p
          className="mt-10 text-xs"
          style={{ color: "rgba(250,250,247,0.3)" }}
        >
          Free to join &middot; Paystack-secured &middot; No subscriptions
        </p>
      </div>
    </section>
  );
}
