"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINTS, authFetch } from "@/app/_lib/api";
import { Loader2 } from "lucide-react";

export default function TipsPage() {
  const [tips, setTips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTips() {
      try {
        const res = await authFetch(API_ENDPOINTS.GET_ALL_TIPS);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load tips");
        setTips(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadTips();
  }, []);

  return (
    <main className="max-w-4xl w-full mx-auto p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Tips</h1>
        <p className="text-gray-500 font-medium mt-1">A complete list of everyone who has supported you.</p>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
          {error}
        </div>
      ) : tips.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 border border-gray-200 rounded-2xl">
          <p className="text-gray-500 font-medium">You don't have any successful tips yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Fan</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tips.map((tip) => (
                  <tr key={tip.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {new Date(tip.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-black text-gray-400 uppercase">
                          {tip.fan_name ? tip.fan_name.charAt(0) : '?'}
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{tip.fan_name || "Anonymous Fan"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-black text-green-600 bg-green-50 px-2 py-1 rounded">
                        +₦{(tip.amount_kobo / 100).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {tip.message ? (
                        <span className="italic">"{tip.message}"</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
