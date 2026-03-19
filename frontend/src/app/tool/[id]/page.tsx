"use client";
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { tools as initialTools } from '@/data/tools';
import { useParams } from 'next/navigation';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ToolDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [tool, setTool] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const exactTool = initialTools.find(t => String(t.id) === String(id)) 
      || JSON.parse(localStorage.getItem('approved_tools_list') || "[]").find((t:any) => String(t.id) === String(id));
    if (exactTool) setTool(exactTool);
  }, [id]);

  if (!tool) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-40 text-center">
          <h1 className="text-3xl font-black uppercase text-slate-800">Tool Not Found</h1>
          <Link href="/" className="text-indigo-600 mt-4 inline-block hover:underline font-bold uppercase tracking-[0.2em] text-xs">Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-40 pb-20 max-w-4xl mx-auto px-4">
         <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-10 transition-colors">
            <ArrowLeft size={16} /> Back to Directory
         </Link>
         
         <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
               <span className="px-4 py-2 bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 rounded-full border border-slate-100">
                  {tool.category || "General"}
               </span>
               <span className="px-4 py-2 bg-indigo-50 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 rounded-full">
                  Verified
               </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">
              {tool.name}
            </h1>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-2xl">
              {tool.description}
            </p>

            {tool.link && (
               <Link href={tool.link} target="_blank" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                  Access Tool <ExternalLink size={18} />
               </Link>
            )}
         </div>
      </div>
    </main>
  );
}
