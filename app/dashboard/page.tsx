"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/app/_components/Navbar";
import { API_ENDPOINTS, authFetch } from "@/app/_lib/api";
import { Loader2, Plus, X, Copy, Check } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [copiedGeneral, setCopiedGeneral] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [newLinkResult, setNewLinkResult] = useState<any>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await authFetch(API_ENDPOINTS.GET_DASHBOARD);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load dashboard");
        setStats(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleCopyGeneral = () => {
    if (!stats?.link_stats) return;
    const generalLink = stats.link_stats.find((l: any) => l.is_general);
    if (generalLink) {
      const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000' : 'https://tippa.app';
      navigator.clipboard.writeText(`${baseUrl}/${generalLink.slug}`);
      setCopiedGeneral(true);
      setTimeout(() => setCopiedGeneral(false), 2000);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingLink(true);
    try {
      const payload: any = {};
      if (newLinkTitle) payload.post_title = newLinkTitle;
      if (newPostUrl) payload.post_url = newPostUrl;

      const res = await authFetch(API_ENDPOINTS.CREATE_LINK, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setNewLinkResult(data.data);
      setNewLinkTitle("");
      setNewPostUrl("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreatingLink(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-[var(--color-accent)]" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-red-600 font-bold">{error}</div>
      </div>
    );
  }

  const totalTips = stats?.platform_stats?.reduce((sum: number, p: any) => sum + p.total_amount_kobo, 0) || 1; 
  const withdrawable = ((stats?.total_withdrawable_kobo || 0) / 100).toLocaleString();
  const pending = ((stats?.total_pending_kobo || 0) / 100).toLocaleString();
  const totalEarned = (((stats?.total_pending_kobo || 0) + (stats?.total_withdrawable_kobo || 0) + (stats?.total_withdrawn_kobo || 0)) / 100).toLocaleString();

  return (
    <>
      <main className="max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Welcome back. Here's how your tips are looking.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleCopyGeneral}
              className="px-4 py-2 text-sm font-bold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
            >
              {copiedGeneral ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copiedGeneral ? "Copied!" : "Copy General Link"}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 text-sm font-bold bg-[var(--color-accent)] text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200 flex items-center gap-2"
            >
              <Plus size={16} />
              New Post Link
            </button>
          </div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Available</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">₦{withdrawable}</p>
            </div>
            {(stats?.total_withdrawable_kobo || 0) > 0 ? (
              <button 
                onClick={async (e) => {
                  const btn = e.currentTarget;
                  btn.disabled = true;
                  btn.innerText = 'Processing...';
                  try {
                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/tips/withdraw', { 
                        method: 'POST', 
                        headers: { Authorization: `Bearer ${localStorage.getItem('tippa_token')}` }
                    });
                    const data = await res.json();
                    if (!res.ok) alert(data.detail || 'Error withdrawing');
                    else { alert(data.message); window.location.reload(); }
                  } catch (e: any) { alert(e.message); }
                  finally { btn.disabled = false; btn.innerText = 'Withdraw to Bank'; }
                }}
                className="text-sm font-bold mt-4 text-white bg-green-600 hover:bg-green-700 w-full px-3 py-2 rounded-xl transition-colors shadow-sm"
              >
                Withdraw to Bank
              </button>
            ) : (
              <p className="text-sm font-medium mt-4 text-gray-500 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-200">No funds available</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Pending</p>
            <p className="text-4xl font-black text-gray-900 tracking-tight">₦{pending}</p>
            <p className="text-sm font-medium mt-3 text-orange-600 bg-orange-50 w-fit px-2.5 py-1 rounded-md">Processing payout</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-100 flex flex-col justify-between">
            <p className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-2">Total Earned</p>
            <p className="text-4xl font-black text-orange-950 tracking-tight">₦{totalEarned}</p>
            <p className="text-sm font-medium mt-3 text-orange-600">All time successful tips</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Tips */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Recent Tips</h2>
            <div className="space-y-4">
              {stats?.recent_tips?.length === 0 ? (
                <p className="text-sm text-gray-500">No tips yet.</p>
              ) : (
                stats?.recent_tips?.map((tip: any) => (
                  <div key={tip.id} className="py-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">
                          {tip.platform_attribution?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{tip.fan_name || "Anonymous Fan"}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(tip.created_at).toLocaleDateString()} {tip.platform_attribution ? `via ${tip.platform_attribution}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          +₦{(tip.creator_share_kobo / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          Net from ₦{(tip.amount_kobo / 100).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    {tip.message && (
                      <div className="mt-2 pl-13 text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-100 relative">
                        <span className="absolute -left-2 top-3 text-gray-300">↳</span>
                        "{tip.message}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Top Platforms</h2>
            <div className="space-y-5">
              {stats?.platform_stats?.length === 0 ? (
                <p className="text-sm text-gray-500">No data yet.</p>
              ) : (
                stats?.platform_stats?.map((plat: any, i: number) => {
                  const pct = (plat.total_amount_kobo / totalTips) * 100;
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between font-semibold text-gray-900 text-sm">
                        <span>{plat.platform || "Direct Link"}</span>
                        <span>₦{(plat.total_amount_kobo / 100).toLocaleString()}</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--color-accent)] rounded-full" 
                          style={{ width: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-lg">Create Post Link</h3>
              <button onClick={() => { setIsModalOpen(false); setNewLinkResult(null); }} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {newLinkResult ? (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Link Created!</h4>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-600 truncate">
                      tippa.app/t/{newLinkResult.slug}
                    </span>
                    <button 
                      onClick={() => handleCopy(`tippa.app/t/${newLinkResult.slug}`, 'new')}
                      className="p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600 shrink-0"
                    >
                      {copiedLink === 'new' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreateLink} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-700">Link Title (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. My new dance video"
                      value={newLinkTitle}
                      onChange={e => setNewLinkTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 mt-4">
                    <label className="block text-sm font-bold text-gray-700">Original Post URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="https://instagram.com/p/..."
                      value={newPostUrl}
                      onChange={e => setNewPostUrl(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isCreatingLink}
                    className="w-full bg-[var(--color-accent)] text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isCreatingLink ? <><Loader2 className="animate-spin" size={16} /> Creating...</> : "Generate Link"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
