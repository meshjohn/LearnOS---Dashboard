"use client";

import { motion } from "framer-motion";
import { generateActivityData, getStreakCount } from "@/lib/activity";
import { useMemo } from "react";

const INTENSITY_COLORS = [
  "bg-white/5",
  "bg-violet-900/60",
  "bg-violet-700/70",
  "bg-violet-500/80",
  "bg-violet-400",
];

export function ActivityTile() {
  const data = useMemo(() => generateActivityData(), []);
  const streak = getStreakCount(data);

  const weeks: typeof data[] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.005,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-2xl bg-[#16161f] border border-white/5 p-6 overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(139,92,246,0.3) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.3)" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest">
            Learning Activity
          </h2>
          <span className="text-xs text-white/40">
            {data.filter((d) => d.count > 0).length} active days
          </span>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  title={`${day.date}: ${day.count} sessions`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: wi * 0.015,
                    duration: 0.2,
                    ease: "backOut",
                  }}
                  className={`w-3 h-3 rounded-sm ${INTENSITY_COLORS[day.count]} transition-colors hover:opacity-80`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-[11px] text-white/25">Less</span>
          {INTENSITY_COLORS.map((cls, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
          ))}
          <span className="text-[11px] text-white/25">More</span>
        </div>
      </div>
    </motion.article>
  );
}
