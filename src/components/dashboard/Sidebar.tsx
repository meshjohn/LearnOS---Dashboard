"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart2,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { label: "Progress", icon: BarChart2, href: "/dashboard/progress" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const SPRING = { type: "spring", stiffness: 400, damping: 35 } as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => { setMounted(true) }, []);

  useEffect(() => {
    if (!mounted) return;

    const mq = window.matchMedia("(max-width: 1024px)");
    setCollapsed(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setCollapsed(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted]);

  // SSR placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav
        style={{ width: 220 }}
        className="hidden md:flex flex-col h-full bg-[#111118] border-r border-white/5 relative flex-shrink-0 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-white/90 whitespace-nowrap">
            LearnOS
          </span>
        </div>
        <div className="flex-1 px-2 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="block relative">
                {active && (
                  <div className="absolute inset-0 rounded-lg bg-violet-600/20 border border-violet-500/30" />
                )}
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? "text-violet-300" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}>
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      animate={{ width: collapsed ? 68 : 220 }}
      transition={SPRING}
      className="hidden md:flex flex-col h-full bg-[#111118] border-r border-white/5 relative flex-shrink-0 overflow-visible"
    >
      <motion.button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-7 -right-3 w-6 h-6 rounded-full bg-[#1c1c28] border border-white/10 flex items-center justify-center hover:bg-violet-600/40 hover:border-violet-500/50 transition-colors z-50 shadow-lg shadow-black/30 group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronLeft size={12} className="text-white/60 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.button>

      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0, x: -8 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-sm font-semibold text-white/90 whitespace-nowrap overflow-hidden"
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            const hovered = hoveredItem === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="block relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active-bg"
                    className="absolute inset-0 rounded-lg bg-violet-600/20 border border-violet-500/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? "text-violet-300" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}>
                  <Icon size={18} className="flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* tooltip */}
                <AnimatePresence>
                  {collapsed && hovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -4, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -4, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 rounded-md bg-[#1e1e2e] border border-white/10 shadow-xl shadow-black/40 z-50"
                    >
                      <span className="text-xs font-medium text-white/80 whitespace-nowrap">
                        {item.label}
                      </span>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#1e1e2e]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.nav>
  );
}
