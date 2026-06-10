"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface Props {
  name: string;
  streak?: number;
}

export function HeroTile({ name, streak = 12 }: Props) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{ transition: "box-shadow 0.2s" }}
      className="relative h-full min-h-[160px] rounded-2xl bg-[#16161f] border border-white/5 p-6 overflow-hidden group cursor-default"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.4)" }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div>
          <p className="text-sm text-white/40 font-medium">{greeting}</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white mt-0.5">
            Welcome back, <span className="text-violet-400">{name}</span>
          </h1>
        </div>

        <p className="text-sm text-white/50 max-w-md">
          You have 4 courses in progress. Keep the momentum going.
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
            <Flame size={14} className="text-orange-400" />
            <span className="text-xs font-semibold text-orange-300">
              {streak} day streak
            </span>
          </div>
          <span className="text-xs text-white/30">Keep it up!</span>
        </div>
      </div>
    </motion.article>
  );
}
