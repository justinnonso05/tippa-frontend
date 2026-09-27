"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/_components/Navbar";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { API_ENDPOINTS } from "@/app/_lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to log in");
      }

      // Store token
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Log in to your Tippa creator account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-bold text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-accent)] text-white font-bold rounded-xl py-3.5 px-4 hover:bg-orange-600 transition-colors flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-gray-900 font-bold hover:text-[var(--color-accent)] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
