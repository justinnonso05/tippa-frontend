"use client";

import Link from "next/link";
import { Navbar } from "@/app/_components/Navbar";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

/*
  NOTE: Backend login is temporarily disabled while system improvements are underway.
  The original login implementation using `API_ENDPOINTS.LOGIN` is preserved below for quick reactivation:

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { Eye, EyeOff, Loader2 } from "lucide-react";
  import { API_ENDPOINTS } from "@/app/_lib/api";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to log in");
      if (data.data?.access_token) {
        localStorage.setItem("tippa_token", data.data.access_token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
*/

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-200/60 shadow-xs">
            <Sparkles size={28} />
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">
            We are improving the system
          </h1>

          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl mb-6 text-left">
            <div className="flex items-start gap-3">
              <Clock className="text-amber-600 mt-0.5 shrink-0" size={18} />
              <p className="text-sm font-medium text-amber-900 leading-relaxed">
                We are currently performing maintenance and upgrades to improve the platform experience. Creator logins are temporarily paused — please check back later!
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="w-full bg-[var(--color-dark)] text-white font-bold rounded-xl py-3.5 px-4 hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
