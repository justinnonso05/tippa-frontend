"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/_components/Navbar";
import { API_ENDPOINTS, authFetch } from "@/app/_lib/api";
import { Loader2, Search, ChevronDown } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"bank" | "confirm">("bank");
  const [banks, setBanks] = useState<any[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedBankName = banks.find(b => b.code === bankCode)?.name || "Choose your bank...";
  const filteredBanks = banks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    async function loadBanks() {
      try {
        const res = await authFetch(API_ENDPOINTS.GET_BANKS);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load banks");
        setBanks(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsInitializing(false);
      }
    }
    loadBanks();
  }, []);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankCode || !accountNumber) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const url = `${API_ENDPOINTS.RESOLVE_ACCOUNT}?account_number=${accountNumber}&bank_code=${bankCode}`;
      const res = await authFetch(url);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || data.message || "Account not found");
      
      setAccountName(data.data.account_name);
      setStep("confirm");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCompleteProfile = async () => {
    setIsLoading(true);
    setError("");
    
    const bankName = banks.find(b => b.code === bankCode)?.name || "";
    
    try {
      const res = await authFetch(API_ENDPOINTS.COMPLETE_PROFILE, {
        method: "POST",
        body: JSON.stringify({
          bank_account_number: accountNumber,
          bank_code: bankCode,
          bank_name: bankName
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to setup profile");
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-gray-900" size={32} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 bg-white">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            <span className="badge-selector bg-[var(--color-accent-light)] text-[var(--color-accent-dark)] border-none text-xs px-2 py-1">
              Final Step
            </span>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
              Where do we send your tips?
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Link your local bank account to receive payouts automatically.
            </p>
          </div>

          {step === "bank" ? (
            <form className="space-y-5" onSubmit={handleResolve}>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-900">
                  Select Bank
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium cursor-pointer flex items-center justify-between transition-all hover:border-gray-400 ${isInitializing ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className={bankCode ? "text-gray-900" : "text-gray-400"}>
                      {isInitializing ? "Loading banks..." : selectedBankName}
                    </span>
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                  
                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden flex flex-col">
                      <div className="p-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                        <Search size={16} className="text-gray-400" />
                        <input 
                          type="text"
                          autoFocus
                          placeholder="Search banks..."
                          className="w-full bg-transparent outline-none text-sm font-medium text-gray-900"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="overflow-y-auto flex-1">
                        {filteredBanks.length > 0 ? (
                          filteredBanks.map(b => (
                            <div 
                              key={b.id}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700"
                              onClick={() => {
                                setBankCode(b.code);
                                setDropdownOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              {b.name}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">No banks found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-900">
                  Account Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="0123456789"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || isInitializing || !bankCode || accountNumber.length < 10}
                className="w-full bg-gray-900 text-white font-bold rounded-xl py-3.5 px-4 hover:bg-black transition-colors flex items-center justify-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={18} /> Verifying...</>
                ) : (
                  <>
                    Continue
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Verified Account Name
                </p>
                <p className="text-xl font-black text-gray-900">
                  {accountName}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCompleteProfile}
                  disabled={isLoading}
                  className="w-full bg-[var(--color-accent)] text-white font-bold rounded-xl py-3.5 px-4 hover:bg-orange-600 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="animate-spin" size={18} /> Setting up account...</>
                  ) : (
                    <>
                      Yes, this is me
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("bank")}
                  disabled={isLoading}
                  className="w-full text-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors pt-2 disabled:opacity-70"
                >
                  No, let me change it
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
