"use client";
import React from 'react';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-40 pb-16 text-center max-w-6xl mx-auto px-4 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-indigo-50/80 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-indigo-100 shadow-xl shadow-indigo-600/5 animate-fade-in">
        <Sparkles size={12} strokeWidth={3} /> The Ultimate Directory
      </div>
      <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
        Discover the Best <span className="text-indigo-600">AI Tool</span> <br className="hidden md:block"/> for Every Task.
      </h1>
      <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto tracking-tight">
        Join the galaxy of artificial intelligence. Browse a curated list of most powerful tools for writing, coding, and more.
      </p>
    </section>
  );
}
