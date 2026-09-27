"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, User, Building2, Menu, X, LogOut, Link as LinkIcon, Heart } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define nav items
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tips", href: "/dashboard/tips", icon: Heart },
    { name: "Links", href: "/dashboard/links", icon: LinkIcon },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Bank Account", href: "/dashboard/bank", icon: Building2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("tippa_token");
    router.push("/");
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Header */}
      <header className="h-14 flex items-center justify-between px-6 bg-white shrink-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight no-underline text-[var(--color-dark)]"
        >
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black bg-[var(--color-accent)] text-white border-2 border-[var(--color-dark)]"
          >
            T
          </span>
          Tippa
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Profile Link with Circle Avatar */}
          <Link 
            href="/dashboard/profile"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200 text-gray-600 flex"
            title="Profile"
          >
            <User size={18} />
          </Link>
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-600 hover:text-gray-900 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-900/50 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`
            fixed md:static inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 flex flex-col shrink-0
          `}
        >
          <div className="h-14 md:hidden flex items-center justify-between px-6 shrink-0">
            <span className="font-bold text-gray-900">Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors
                      ${isActive 
                        ? "bg-[var(--color-accent-light)] text-[var(--color-accent-dark)]" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area (Curved Intersection) */}
        <main className="flex-1 bg-gray-50 md:rounded-tl-2xl md:border-t md:border-l border-gray-200 overflow-y-auto relative shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}
