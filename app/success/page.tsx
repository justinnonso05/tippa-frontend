"use client";

import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/app/_lib/api";

export default function SuccessPage({ searchParams }: { searchParams: Promise<{ slug?: string; reference?: string }> }) {
  const { slug, reference } = use(searchParams);
  const tipAgainLink = slug ? (slug.length === 8 ? `/t/${slug}` : `/${slug}`) : "/";
  const [verifying, setVerifying] = useState(!!reference);

  useEffect(() => {
    if (reference) {
      // Verify transaction with backend to ensure it's marked as successful
      // even if the webhook hasn't arrived yet.
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"}/tips/verify/${reference}`)
        .then(res => res.json())
        .catch(err => console.error("Error verifying tip:", err))
        .finally(() => setVerifying(false));
    }
  }, [reference]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in slide-in-from-bottom-4 duration-500 shadow-sm border border-green-200 relative overflow-hidden">
          {verifying ? (
            <Loader2 size={48} className="text-green-600 animate-spin" />
          ) : (
            <Check size={48} className="text-green-600" />
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            {verifying ? "Verifying Payment..." : "Payment Successful!"}
          </h1>
          <p className="text-gray-500 font-medium">
            {verifying 
              ? "Hold on a second while we confirm your tip..."
              : "Thank you for supporting the creator. Your tip has been securely processed."}
          </p>
        </div>
        
        <div className="space-y-3 pt-6">
          <Link href={tipAgainLink} className="w-full bg-[var(--color-dark)] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
            Tip Again
          </Link>
          <Link href="/signup" className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
            Create your own Tippa account
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-black text-gray-900 opacity-70 hover:opacity-100 transition-opacity">
            Powered by Tippa
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
