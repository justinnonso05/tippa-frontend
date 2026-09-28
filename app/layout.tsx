import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tippa — Tip links for every post",
  description:
    "Paste a post link, get a tip page, get paid instantly to your wallet.",
  metadataBase: new URL("https://tippa.me"),
  openGraph: {
    title: "Tippa — Tip links for every post",
    description:
      "Paste a post link, get a tip page, get paid. Every post you make already has an audience. Tippa turns that audience into income.",
    type: "website",
    images: [{ url: "/tippa-logo.png", width: 1200, height: 630 }],
  },
};

interface LayoutProps<T> {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
