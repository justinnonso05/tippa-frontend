import Link from "next/link";
import { ArrowUpRight, ArrowRight, InstagramIcon, TikTokIcon, FacebookIcon, SnapchatIcon } from "./Icons";

function BadgeSelector({ text }: { text: string }) {
  return (
    <div className="badge-selector">
      <span className="badge-corner tl" aria-hidden />
      <span className="badge-corner tr" aria-hidden />
      <span className="badge-corner bl" aria-hidden />
      <span className="badge-corner br" aria-hidden />
      <span>{text}</span>
    </div>
  );
}

const platforms = [
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: TikTokIcon,   label: "TikTok" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: SnapchatIcon, label: "Snapchat" },
];

export function Hero() {
  return (
    <section
      className="min-h-[88vh] flex items-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-0 w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center">

        {/* ── LEFT ── */}
        <div className="flex flex-col items-start">
          <div className="h-anim mb-7">
            <BadgeSelector text="Turn your audience into income" />
          </div>

          <h1
            className="h-anim h-anim-1 font-extrabold tracking-tight mb-5"
            style={{
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              lineHeight: 1.04,
              color: "var(--color-dark)",
            }}
          >
            Every post
            <br />
            deserves a{" "}
            <span style={{ color: "var(--color-accent)" }}>tip link.</span>
          </h1>

          <p
            className="h-anim h-anim-2 text-base sm:text-lg leading-relaxed mb-8"
            style={{ color: "var(--color-text-secondary)", maxWidth: 440 }}
          >
            Paste a post link from Instagram, TikTok, Facebook or Snapchat.
            Get a tip page. Share it. Get paid instantly to your bank account.
          </p>

          <div className="h-anim h-anim-3 flex flex-wrap items-center gap-4 mb-10">
            <Link href="/signup" className="btn-stack">
              Get started
              <ArrowUpRight size={15} />
            </Link>
            <a href="#how-it-works" className="btn-link">
              See how it works
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Platform trust row */}
          <div
            className="h-anim h-anim-4 flex items-center gap-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span className="text-sm font-semibold">Works with:</span>
            <div className="flex items-center gap-2">
              {platforms.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full"
                  style={{
                    border: "2px solid var(--color-dark)",
                    background: "var(--color-white)",
                    color: "var(--color-dark)",
                  }}
                  title={label}
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT — layered graphic with home.png ── */}
        <div
          className="h-anim h-anim-5 relative flex justify-center md:justify-end items-center"
          style={{ height: 520 }}
        >
          {/* Orange organic blob — behind and to bottom-right */}
          <div className="hero-blob" aria-hidden />

          {/* Dark solid offset block behind the image — matches reference */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              width: 320,
              height: 400,
              background: "var(--color-dark)",
              right: 0,
              top: "50%",
              transform: "translateY(-50%) translate(14px, 12px)",
              zIndex: 0,
            }}
          />

          {/* Squiggle doodle — top-left of the image area */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 52,
              right: "46%",
              zIndex: 5,
              color: "var(--color-dark)",
            }}
          >
            <svg width="54" height="36" viewBox="0 0 54 36" fill="none">
              <path
                d="M4 30 C12 16, 20 8, 27 18 C34 28, 42 12, 50 6"
                stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
              />
              <path
                d="M4 22 C14 10, 22 4, 30 14 C37 22, 45 8, 50 14"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35"
              />
            </svg>
          </div>

          {/* home.png — thick black frame, matching reference photo style */}
          <div className="hero-img-frame" style={{ zIndex: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home.png"
              alt="Tippa product preview"
              style={{
                width: 320,
                height: 400,
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
