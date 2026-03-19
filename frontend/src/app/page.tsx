"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ToolCard } from '@/components/ToolCard';
import { tools as initialTools, CATEGORIES } from '@/data/tools';
import { Search, ShieldCheck, Mail, Sparkles, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sessionTools, setSessionTools] = useState([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // The filteredTools useMemo automatically filters results based on searchInput
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // 1. Initial tools load with failsafe
  useEffect(() => {
    try {
      const saved = localStorage.getItem('approved_tools_list');
      
      let initialApproved = initialTools.map(t => ({...t, status: "approved"}));
      let userApproved = saved ? JSON.parse(saved) : [];
      
      // Merge unique tools (prevent duplication by name or ID)
      const allApproved = [...initialApproved];
      userApproved.forEach((ut: any) => {
        if (!allApproved.find(at => at.id === ut.id || at.name === ut.name)) {
          allApproved.push({ ...ut, status: "approved" });
        }
      });

      setSessionTools(allApproved);
    } catch (error) {
      setSessionTools(initialTools.map(t => ({ ...t, status: "approved" })));
    }
  }, []);

  const trendingNames = ["ChatGPT", "Midjourney", "Gemini", "Claude", "Runway"];

  const filteredTools = useMemo(() => {
    if (!sessionTools || sessionTools.length === 0) return initialTools.filter(t => t.status === "approved" || !t.status);

    try {
      let result = sessionTools.filter((t: any) => t.status === "approved");

      // Category filter (Prioritize Search + Category intersection)
      if (activeCategory === "Trending AI Tools") {
        result = result.filter((t: any) => 
          trendingNames.some(name => t.name.toLowerCase().includes(name.toLowerCase()))
        );
      } else if (activeCategory !== "All") {
        result = result.filter((t: any) => t.category === activeCategory);
      }

      // Live Search Filter
      const query = searchInput.trim().toLowerCase();
      if (query) {
        result = result.filter((t: any) => {
          const nameMatch = t.name.toLowerCase().includes(query);
          const descMatch = t.description.toLowerCase().includes(query);
          const keywordMatch = t.keywords && t.keywords.some((k: string) => k.toLowerCase().includes(query));
          const catMatch = t.category && t.category.toLowerCase().includes(query);
          return nameMatch || descMatch || keywordMatch || catMatch;
        });
      }

      return result;
    } catch (err) {
      console.error("Filter error:", err);
      return sessionTools.filter((t: any) => t.status === "approved");
    }
  }, [sessionTools, activeCategory, searchInput]);

  // CATEGORY VISIBILITY (Hide empty ones)
  const visibleCategories = useMemo(() => {
    return CATEGORIES.filter(cat => {
      if (cat === "All" || cat === "Trending AI Tools") return true;
      const count = sessionTools.filter((t: any) => t.status === "approved" && t.category === cat).length;
      return count > 0;
    });
  }, [sessionTools]);

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-50 selection:text-indigo-600 pb-20">
      <Navbar />
      
      <div className="main-container">
        <Hero />

        {/* REFINED SEARCH & CATEGORY SECTION */}
        <section className="mb-24 animate-fade-in px-4">
          <div className="flex flex-col gap-10 items-center text-center bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 blur-[100px] -mr-32 -mt-32 rounded-full" />
            
            <div className="relative w-full max-w-4xl group">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors z-10" size={26} />
              <input 
                type="text" 
                placeholder="Find any AI signal in the galaxy..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full bg-white border-2 border-slate-50 rounded-[2.5rem] py-8 pl-20 pr-16 text-xl font-bold focus:outline-none focus:ring-[15px] focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-xl placeholder:text-slate-200"
              />
              {searchInput && (
                <button 
                  onClick={() => setSearchInput("")}
                  className="absolute right-7 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all z-10"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto pt-6 border-t border-slate-50 w-full">
              {visibleCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-8 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all border-2 flex items-center gap-3 ${
                    activeCategory === cat 
                    ? "bg-slate-900 border-slate-900 text-white shadow-2xl -translate-y-2" 
                    : "bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-lg"
                  }`}
                >
                  {cat === "Trending AI Tools" && <TrendingUp size={16} className={activeCategory === cat ? "text-indigo-400" : "text-slate-400"} />}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS GRID */}
        <div ref={resultsRef} className="pb-40">
          <div className="flex flex-col items-center justify-center gap-6 mb-20">
             <div className="flex items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.8rem]">
                <div className="w-20 h-px bg-slate-200" />
                {activeCategory} AI Directory
                <div className="w-20 h-px bg-slate-200" />
             </div>
             <div className="px-6 py-2 rounded-full bg-white border border-slate-100 text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                {filteredTools.length} Signals Captured
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-4">
            {filteredTools.length > 0 ? (
               filteredTools.map((tool: any) => (
                 <ToolCard key={tool.id} tool={tool} />
               ))
            ) : (
               <div className="col-span-full py-40 text-center flex flex-col items-center bg-white rounded-[4rem] border border-dashed border-slate-200 shadow-sm mx-4">
                 <div className="w-24 h-24 rounded-[3rem] bg-indigo-50 flex items-center justify-center text-indigo-200 mb-10 border-4 border-white shadow-xl">
                   <Search size={48} />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-4">No Galaxy Found</h3>
                 <p className="text-slate-400 font-medium text-lg tracking-tight mb-12">No signals match your current focus.</p>
                 <button 
                  onClick={() => {setSearchInput(""); setActiveCategory("All");}}
                  className="px-16 py-6 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.4rem] hover:bg-indigo-600 transition-all shadow-premium"
                 >
                   REBOOT SCANNER
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-24 text-center bg-white border-t border-slate-100 mt-20">
          <p className="text-xs font-black text-slate-900 uppercase tracking-[0.4rem] mb-10">&copy; 2026 AI TOOL GALAXY</p>
          <div className="flex justify-center gap-12 text-slate-300">
              <Link href="https://linkedin.com/in/prem-k-sharma2005" target="_blank" className="hover:text-indigo-600 transition-all hover:scale-110"><Mail size={28} /></Link>
          </div>
      </footer>
    </main>
  );
}
