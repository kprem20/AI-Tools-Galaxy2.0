"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Video, PenTool, Code, Megaphone, CheckSquare, Music, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Image Generation', icon: ImageIcon, color: 'from-pink-500 to-rose-500', iconColor: 'text-pink-600', bg: 'bg-pink-500/10' },
  { name: 'Video Generation', icon: Video, color: 'from-purple-500 to-indigo-500', iconColor: 'text-purple-600', bg: 'bg-purple-500/10' },
  { name: 'Writing AI', icon: PenTool, color: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-600', bg: 'bg-blue-500/10' },
  { name: 'Coding AI', icon: Code, color: 'from-emerald-500 to-teal-500', iconColor: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  { name: 'Marketing AI', icon: Megaphone, color: 'from-orange-500 to-red-500', iconColor: 'text-orange-600', bg: 'bg-orange-500/10' },
  { name: 'Productivity AI', icon: CheckSquare, color: 'from-yellow-500 to-orange-500', iconColor: 'text-yellow-600', bg: 'bg-yellow-500/10' },
  { name: 'Music AI', icon: Music, color: 'from-violet-500 to-purple-500', iconColor: 'text-violet-600', bg: 'bg-violet-500/10' },
  { name: 'Education AI', icon: GraduationCap, color: 'from-sky-500 to-blue-500', iconColor: 'text-sky-600', bg: 'bg-sky-500/10' },
];

export function Categories() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10 overflow-x-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 mb-6">
          <Sparkles size={12} /> Categories
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-[var(--fg)]">
          Find Tools by <span className="gradient-text">Category</span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
          Whether you need AI for writing, coding, design, or marketing — we have the tools organized for your workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/category/${encodeURIComponent(cat.name)}`}
                className="glass rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center text-center cursor-pointer group overflow-hidden relative border-black/[0.03] dark:border-white/[0.03] bg-white/60 dark:bg-slate-900/60 shadow-lg hover:shadow-xl transition-all block"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`} />

                <div className={`w-20 h-20 rounded-2xl ${cat.bg} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner ring-1 ring-black/[0.03] dark:ring-white/[0.03]`}>
                  <Icon size={36} className={`${cat.iconColor} transition-all duration-300`} />
                </div>

                <h3 className="font-bold text-base md:text-lg text-[var(--fg)] tracking-tight mb-3">{cat.name}</h3>

                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 group-hover:text-purple-600 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-500">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors"
        >
          View all categories <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
