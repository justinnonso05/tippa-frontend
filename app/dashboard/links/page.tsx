"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINTS, authFetch } from "@/app/_lib/api";
import { Loader2, Copy, Check, Edit2, Plus, ExternalLink } from "lucide-react";

export default function LinksPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit modal state
  const [editingLink, setEditingLink] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editCoverUrl, setEditCoverUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    try {
      const res = await authFetch(API_ENDPOINTS.GET_LINKS);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load links");
      setLinks(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = (slug: string, id: string) => {
    const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000' : 'https://tippa.app';
    navigator.clipboard.writeText(`${baseUrl}/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (link: any) => {
    setEditingLink(link);
    setEditTitle(link.post_title || "");
    setEditUrl(link.post_url || "");
    setEditCoverUrl(link.cover_image_url || "");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    
    setIsUpdating(true);
    try {
      const payload: any = {};
      payload.post_title = editTitle || null;
      payload.post_url = editUrl || null;
      payload.cover_image_url = editCoverUrl || null;

      const res = await authFetch(API_ENDPOINTS.UPDATE_LINK(editingLink.id), {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      // Update local state
      setLinks(links.map(l => l.id === editingLink.id ? data.data : l));
      setEditingLink(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-gray-900" size={32} />
      </div>
    );
  }

  return (
    <main className="max-w-4xl w-full mx-auto p-6 md:p-8 space-y-8 relative">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Tip Links
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Manage your general tip link and individual post links.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-lg">
                  {link.is_general ? "General Tip Link" : (link.post_title || "Untitled Post")}
                </span>
                {link.is_general && (
                  <span className="bg-orange-100 text-[var(--color-accent)] text-xs font-bold px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                )}
              </div>
              <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
                tippa.app/{link.slug}
                <span className="text-gray-300">•</span>
                <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                  {link.clicks || 0} clicks
                </span>
                {link.post_url && (
                  <>
                    <span className="text-gray-300">•</span>
                    <a href={link.post_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors">
                      Original Post <ExternalLink size={12} />
                    </a>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => handleCopy(link.slug, link.id)}
                className="px-4 py-2 text-sm font-bold bg-gray-50 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                {copiedId === link.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                {copiedId === link.id ? "Copied" : "Copy"}
              </button>
              
              {!link.is_general && (
                <button 
                  onClick={() => handleEdit(link)}
                  className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingLink && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-xl text-gray-900">Edit Post Link</h3>
              <button onClick={() => setEditingLink(null)} className="text-gray-400 hover:text-gray-900">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-700">Link Title (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. My new dance video"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5 mt-4">
                  <label className="block text-sm font-bold text-gray-700">Original Post URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://instagram.com/p/..."
                    value={editUrl}
                    onChange={e => setEditUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                  />
                  <p className="text-xs text-gray-500 font-medium mt-1">If provided, this helps generate a richer preview when shared.</p>
                </div>
                <div className="space-y-1.5 mt-4">
                  <label className="block text-sm font-bold text-gray-700">Cover Image URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    value={editCoverUrl}
                    onChange={e => setEditCoverUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                  />
                  <p className="text-xs text-gray-500 font-medium mt-1">Optional image to display on the tipping page.</p>
                </div>
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-[var(--color-accent)] text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                >
                  {isUpdating ? <><Loader2 className="animate-spin" size={16} /> Saving...</> : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
