"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/_components/Navbar";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { API_ENDPOINTS } from "@/app/_lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "otp">("register");
  
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Registration failed");
      
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Verification failed");

      if (data.data?.access_token) {
        localStorage.setItem("tippa_token", data.data.access_token);
        router.push("/setup");
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
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}

          {step === "register" ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  Start earning
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  Create your Tippa account in seconds
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={e => setFormData({...formData, full_name: e.target.value})}
                      placeholder="Jane Doe"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-900">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={e => setFormData({...formData, username: e.target.value})}
                      placeholder="janedoe"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="08012345678"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
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

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white font-bold rounded-xl py-3.5 px-4 hover:bg-black transition-colors flex items-center justify-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="animate-spin" size={18} /> Processing...</>
                  ) : (
                    <>
                      Create Account
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
                  Already have an account?{" "}
                  <Link href="/login" className="text-gray-900 font-bold hover:text-[var(--color-accent)] transition-colors">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  Check your email
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  We sent a 6-digit verification code to your email address.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleVerify}>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900 text-center">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center text-2xl tracking-[0.5em] border-2 border-[var(--color-dark)] rounded-xl px-4 py-4 bg-[var(--color-white)] text-gray-900 font-black outline-none focus:border-[var(--color-accent)] transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-[var(--color-accent)] text-white font-bold rounded-xl py-3.5 px-4 hover:bg-orange-600 transition-colors flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="animate-spin" size={18} /> Verifying...</>
                  ) : (
                    <>
                      Verify & Continue
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep("register")}
                  className="w-full text-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors pt-2"
                >
                  Back to registration
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
