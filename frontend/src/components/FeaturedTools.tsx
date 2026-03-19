"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Bookmark, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

const featured = [
  {
    id: 'v0-dev',
    name: 'Vercel v0',
    category: 'Coding AI',
    desc: 'Generate production-ready React and Tailwind components from text prompts. Describe what you want, and watch v0 build it in seconds.',
    logo: 'V0',
    tag: "Editor's Choice",
    color: 'from-purple-600 to-indigo-600',
    rating: 4.8,
    users: '50k+',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'Productivity AI',
    desc: 'The AI search engine that delivers accurate, real-time answers with citations. Skip the links and get answers instantly.',
    logo: 'PX',
    tag: 'Trending',
    color: 'from-cyan-600 to-blue-600',
    rating: 4.9,
    users: '1M+',
  },
];

export function FeaturedTools() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10 overflow-x-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none hidden md:block" />

      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-widest border border-purple-500/20 mb-6">
          <ShieldCheck size={14} className="fill-purple-500/20" /> Featured
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-[var(--fg)]">
          Featured <span className="gradient-text">AI Tools</span>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-4">
          Hand-picked by our team for exceptional quality, utility, and industry-leading performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {featured.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex flex-col sm:flex-row gap-8 p-8 md:p-10 rounded-3xl glass group relative overflow-hidden border-black/[0.03] dark:border-white/[0.03] shadow-xl bg-white/60 dark:bg-slate-900/60"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />

            <div className="flex flex-col items-center sm:items-start shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-4xl md:text-5xl font-black border border-white/10 z-10 shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ring-1 ring-white/10">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 uppercase">
                  {tool.logo}
                </span>
              </div>
              <div className="mt-4 flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className="fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  {tool.rating} Rating &middot; {tool.users} Users
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center z-10 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-900 dark:bg-purple-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-md">
                  {tool.tag}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-cyan-600 uppercase bg-cyan-500/10 px-2 py-1 rounded-md">
                  {tool.category}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--fg)] group-hover:text-purple-600 transition-colors tracking-tighter leading-none">
                {tool.name}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed mb-8 font-medium">
                {tool.desc}
              </p>

              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  href={`/tool/${tool.id}`}
                  className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-xl hover:scale-[1.03] active:scale-95"
                >
                  View Details <ExternalLink size={18} />
                </Link>
                <button className="text-slate-400 hover:text-[var(--fg)] transition-all bg-slate-100 dark:bg-slate-800 p-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 border border-black/[0.03] dark:border-white/[0.03] shadow-sm active:scale-90">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
