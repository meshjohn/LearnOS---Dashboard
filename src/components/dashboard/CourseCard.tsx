"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import type { CourseCardProps } from "@/types";

const GRADIENTS = [
  "radial-gradient(ellipse at top left, rgba(139,92,246,0.2) 0%, transparent 60%)",
  "radial-gradient(ellipse at top right, rgba(34,211,238,0.15) 0%, transparent 60%)",
  "radial-gradient(ellipse at bottom left, rgba(249,115,22,0.15) 0%, transparent 60%)",
  "radial-gradient(ellipse at center, rgba(236,72,153,0.15) 0%, transparent 60%)",
];

export function CourseCard({ course, index }: CourseCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const iconName = course.icon_name as keyof typeof LucideIcons;
  const Icon = (LucideIcons[iconName] ?? LucideIcons.BookOpen) as ComponentType<any>;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-2xl bg-[#16161f] border border-white/5 p-5 overflow-hidden group cursor-pointer"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: gradient }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.35)" }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/8">
          <Icon size={18} className="text-white/70" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/90 leading-snug">
            {course.title}
          </h3>
          <p className="text-xs text-white/35 mt-0.5">{course.progress}% complete</p>
        </div>

        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: course.progress / 100 } : {}}
              transition={{
                duration: 1,
                delay: index * 0.08 + 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
