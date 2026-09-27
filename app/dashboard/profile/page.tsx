"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/app/_components/Navbar";
import { API_ENDPOINTS, authFetch } from "@/app/_lib/api";
import { Loader2, Check } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    phone: ""
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await authFetch(API_ENDPOINTS.GET_ME);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load profile");
        setFormData({
          full_name: data.data.full_name || "",
          username: data.data.username || "",
          phone: data.data.phone || ""
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await authFetch(API_ENDPOINTS.UPDATE_PROFILE, {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to update profile");
      
      setSuccess("Profile updated successfully!");
      // clear success after 3s
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
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
          Profile Settings
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Update your personal details and Tip Link username.
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

          <form className="space-y-6" onSubmit={handleSave}>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={e => setFormData({...formData, full_name: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Username (Your General Tip Link)
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:border-[var(--color-accent)] focus-within:ring-1 focus-within:ring-[var(--color-accent)] overflow-hidden transition-all">
                <span className="pl-4 pr-2 text-gray-400 font-bold">tippa.app/</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  className="w-full py-3 pr-4 bg-transparent text-gray-900 font-medium outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Changing this will instantly update your general tip link.</p>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[var(--color-dark)] text-white font-bold rounded-xl py-3.5 px-4 hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <><Loader2 className="animate-spin" size={18} /> Saving...</>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </main>
  );
}
