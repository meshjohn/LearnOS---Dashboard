"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, BarChart2 } from "lucide-react";

const ITEMS = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { label: "Trophies", icon: Trophy, href: "/dashboard/achievements" },
  { label: "Stats", icon: BarChart2, href: "/dashboard/progress" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111118]/90 backdrop-blur-xl border-t border-white/5 px-2 py-2">
      <ul className="flex items-center justify-around">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                  active ? "text-violet-400" : "text-white/40"
                }`}
              >
                <div className="relative">
                  {active && (
                    <motion.div
                      layoutId="mobile-active-dot"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400"
                    />
                  )}
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
