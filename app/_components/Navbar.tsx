"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "./Icons";

export function Navbar() {
  const router = useRouter();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tippa_token");
    setIsAuthenticated(!!token);

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (window.scrollY > 30) {
        setOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tippa_token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "navbar-glass" : ""}`}
      style={{
        backgroundColor: scrolled ? undefined : "var(--color-bg)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image src="/tippa-logo.png" alt="Tippa" width={110} height={32} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {!isAuthenticated && (
            [
              ["How it works", "#how-it-works"],
              ["For creators", "#for-creators"],
              
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))
          )}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="nav-link font-bold"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="nav-link font-bold"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="btn-stack"
                style={{ fontSize: "0.85rem", padding: "0.55rem 1.2rem" }}
              >
                Start earning
                <ArrowUpRight size={14} />
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: "var(--color-dark)" }}
        >
          <svg
            width={22} height={22} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden" 
          style={{ top: "64px" }}
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Mobile drawer */}
      {open && (
        <div
          className="absolute top-full left-0 w-full z-50 md:hidden px-5 pb-6 pt-4 flex flex-col gap-5 border-b shadow-xl"
          style={{ background: scrolled ? "rgba(250,250,247,0.98)" : "var(--color-bg)", borderColor: "rgba(0,0,0,0.05)" }}
        >
          {isAuthenticated ? (
            <button onClick={() => { handleLogout(); setOpen(false); }} className="nav-link text-base font-bold text-left text-red-600">Log out</button>
          ) : (
            <>
              {[
                ["How it works", "#how-it-works"],
                ["For creators", "#for-creators"],
                
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="nav-link text-base"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              ))}
              <Link
                href="/login"
                className="nav-link text-base font-bold"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="btn-stack w-fit"
                onClick={() => setOpen(false)}
              >
                Start earning <ArrowUpRight size={14} />
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
