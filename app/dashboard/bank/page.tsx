"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, authFetch } from "@/app/_lib/api";
import { Loader2, Check, Search, ChevronDown } from "lucide-react";

export default function BankSetupPage() {
  const router = useRouter();
  const [banks, setBanks] = useState<any[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  
  const [savedBank, setSavedBank] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Custom dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [banksRes, meRes] = await Promise.all([
          authFetch(API_ENDPOINTS.GET_BANKS),
          authFetch(API_ENDPOINTS.GET_ME)
        ]);
        
        const banksData = await banksRes.json();
        const meData = await meRes.json();
        
        if (!banksRes.ok) throw new Error(banksData.message || "Failed to load banks");
        if (!meRes.ok) throw new Error(meData.message || "Failed to load profile");
        
        setBanks(banksData.data || []);
        
        if (meData.data.bank_account_number) {
          setSavedBank({
            account_number: meData.data.bank_account_number,
            bank_code: meData.data.bank_code,
            bank_name: meData.data.bank_name,
            account_name: meData.data.bank_account_name
          });
        } else {
          setIsEditing(true); // default to editing if no bank saved
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsInitializing(false);
      }
    }
    loadInitialData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-verify account when 10 digits and bank is selected
  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      verifyAccount(accountNumber, bankCode);
    } else {
      setAccountName("");
    }
  }, [accountNumber, bankCode]);

  const verifyAccount = async (accNum: string, code: string) => {
    setIsLoading(true);
    setError("");
    setAccountName("");
    
    try {
      const url = `${API_ENDPOINTS.RESOLVE_ACCOUNT}?account_number=${accNum}&bank_code=${code}`;
      const res = await authFetch(url);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || data.message || "Account not found");
      
      setAccountName(data.data.account_name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    const bankName = banks.find(b => b.code === bankCode)?.name || "";
    
    try {
      const res = await authFetch(API_ENDPOINTS.COMPLETE_PROFILE, {
        method: "POST",
        body: JSON.stringify({
          bank_account_number: accountNumber,
          bank_code: bankCode,
          bank_name: bankName,
          bank_account_name: accountName
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to update bank details");
      
      setSavedBank({
        account_number: accountNumber,
        bank_code: bankCode,
        bank_name: bankName,
        account_name: accountName
      });
      setIsEditing(false);
      
      setSuccess("Bank details updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBankName = banks.find(b => b.code === bankCode)?.name || "Choose your bank...";
  const filteredBanks = banks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isInitializing) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-[var(--color-dark)]" size={32} />
      </div>
    );
  }

  return (
    <main className="max-w-2xl w-full mx-auto p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[var(--color-dark)] tracking-tight">
          Bank Account
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Link or update your local bank account to receive payouts automatically.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-bold border border-green-100 flex items-center gap-2">
            <Check size={18} />
            {success}
          </div>
        )}

        {!isEditing && savedBank ? (
          <div className="space-y-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Account Name</p>
                  <p className="font-bold text-gray-900 text-lg">{savedBank.account_name || "Verified Account"}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check size={20} className="text-green-600" />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 mt-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Bank Name</p>
                <p className="font-medium text-gray-900">{savedBank.bank_name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Account Number</p>
                <p className="font-black text-gray-900 text-xl tracking-widest">{savedBank.account_number}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Update Bank Details
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedBank && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-sm font-bold text-gray-500 hover:text-gray-900 px-3 py-1 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
            
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="block text-sm font-bold text-gray-700">
                Select Bank
              </label>
              <div 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium cursor-pointer flex items-center justify-between transition-all hover:border-gray-400"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={bankCode ? "text-gray-900" : "text-gray-400"}>{selectedBankName}</span>
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

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                maxLength={10}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="0123456789"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
              />
            </div>
            
            {isLoading && (
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 justify-center py-2">
                <Loader2 className="animate-spin" size={16} /> Verifying account details...
              </div>
            )}
            
            {accountName && !isLoading && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-top-2">
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">Verified Account</p>
                <p className="text-lg font-black text-green-900">{accountName}</p>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isLoading || !accountName}
              className="w-full bg-[var(--color-dark)] text-white font-bold rounded-xl py-3.5 px-4 hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading && !accountName ? (
                "Please wait..."
              ) : (
                "Save Bank Details"
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
