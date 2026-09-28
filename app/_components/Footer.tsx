import Image from "next/image";

/* Footer — dark, flat, thick top border */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-5 sm:px-8"
      style={{
        backgroundColor: "var(--color-dark)",
        borderTop: "2px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight mb-2">
            <Image src="/tippa-logo.png" alt="Tippa" width={110} height={32} />
          </div>
          <p className="text-xs" style={{ color: "rgba(250,250,247,0.3)" }}>
            &copy; {year} Tippa. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            ["How it works", "#how-it-works"],
            ["For creators", "#for-creators"],
            ["Fees", "#fees"],
            ["FAQ", "#faq"],
            ["Privacy", "#"],
            ["Terms", "#"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="footer-link">
              {label}
            </a>
          ))}
        </nav>

        {/* Attribution */}
        <p className="text-xs" style={{ color: "rgba(250,250,247,0.28)" }}>
          Payments by{" "}
          <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>
            Secure Transfers
          </span>
        </p>
      </div>
    </footer>
  );
}
