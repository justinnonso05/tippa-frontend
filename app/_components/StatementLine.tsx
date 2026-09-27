/* StatementLine — bold one-liner between marquee and steps */
export function StatementLine() {
  return (
    <section
      className="py-20 px-5 sm:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <p
          className="font-extrabold tracking-tight leading-snug"
          style={{
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            color: "var(--color-dark)",
          }}
        >
          Every post you make already has an audience.{" "}
          <span style={{ color: "var(--color-accent)" }}>
            Tippa turns that audience into income,
          </span>{" "}
          one post at a time.
        </p>
      </div>
    </section>
  );
}
