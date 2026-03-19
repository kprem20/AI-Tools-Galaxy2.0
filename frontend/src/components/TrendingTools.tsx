"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { ToolCard } from './ToolCard';

import { ToolGridSkeleton } from './SkeletonCard';

export function TrendingTools() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('/api/trending?limit=8');
        const data = await res.json();
        if (data.success) {
          setTools(data.data);
        }
      } catch {
        setTools([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10 overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8 text-center md:text-left">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 mb-6">
            <Zap size={14} className="fill-amber-500" /> Trending Now
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[var(--fg)]">
            Popular <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium mt-4">
            The most-used AI tools this week, as chosen by our community.
          </p>
        </div>
        <Link
          href="/trending"
          className="group flex items-center gap-2 text-[var(--fg)] hover:text-purple-600 font-bold transition-all bg-white dark:bg-slate-900 px-6 py-3 rounded-xl border border-black/[0.03] dark:border-white/[0.03] shadow-md hover:shadow-lg"
        >
          View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <ToolGridSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tools.map((tool, i) => (
            <ToolCard key={tool._id || tool.id || i} tool={tool} />
          ))}
        </div>
      )}
    </section>
  );
}
