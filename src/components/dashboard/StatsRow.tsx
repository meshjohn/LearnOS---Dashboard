"use client";

import { motion } from "framer-motion";
import { Clock, BookMarked, Star } from "lucide-react";

const stats = [
  { label: "Hours this week", value: "14.5", icon: Clock, color: "text-cyan-400" },
  { label: "Lessons done", value: "38", icon: BookMarked, color: "text-violet-400" },
  { label: "Avg. score", value: "91%", icon: Star, color: "text-yellow-400" },
];

export function StatsRow() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative h-full min-h-[160px] rounded-2xl bg-[#16161f] border border-white/5 p-5 flex flex-col justify-between overflow-hidden group cursor-default"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, rgba(139,92,246,0.1) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(34,211,238,0.3)" }}
      />

      <h2 className="relative z-10 text-xs font-semibold text-white/30 uppercase tracking-widest">
        This Week
      </h2>
      <div className="relative z-10 grid grid-cols-3 gap-3 mt-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col gap-1">
              <Icon size={16} className={stat.color} />
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span className="text-[11px] text-white/35 leading-tight">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}
