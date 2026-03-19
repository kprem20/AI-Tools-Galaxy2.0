"use client";
import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function ToolCard({ tool }: { tool: any }) {
  if (!tool) return null;

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col h-full hover:border-indigo-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
         <Sparkles size={100} className="text-indigo-600 rotate-12" />
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-slate-100">
           {tool.category}
        </span>
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow animate-pulse" />
      </div>

      <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tighter uppercase group-hover:underline group-hover:decoration-indigo-500/20 underline-offset-4 decoration-1">
        {tool.name}
      </h3>
      
      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 flex-grow tracking-tight">
        {tool.description}
      </p>

      <Link
        href={tool.link}
        target="_blank"
        className="mt-auto flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 group/btn"
      >
        Portal Access <ExternalLink size={14} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
