"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Check, X, ShieldCheck, ExternalLink, ArrowLeft, LayoutGrid, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { isAdmin, isLoading, logout } = useAuth();
  const router = useRouter();
  const [pendingTools, setPendingTools] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/login');
    }

    const pended = localStorage.getItem('pending_tools_list');
    if (pended) {
      setPendingTools(JSON.parse(pended));
    }
  }, [isAdmin, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleApprove = (id: number) => {
    const toolToApprove = pendingTools.find((t: any) => t.id === id);
    if (!toolToApprove) return;

    // 1. Move to approved list in localStorage
    const saved = localStorage.getItem('approved_tools_list');
    const approvedList = saved ? JSON.parse(saved) : [];
    
    // Ensure it doesn't already exist
    if (!approvedList.some((t: any) => t.id === id)) {
      approvedList.push({ ...toolToApprove, status: "approved" });
      localStorage.setItem('approved_tools_list', JSON.stringify(approvedList));
    }

    // 2. Remove from pending list
    const updatedPending = pendingTools.filter((t: any) => t.id !== id);
    setPendingTools(updatedPending);
    localStorage.setItem('pending_tools_list', JSON.stringify(updatedPending));

    setMessage(`Signal "${toolToApprove.name}" broadcasted to the public galaxy!`);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReject = (id: number) => {
    const updatedPending = pendingTools.filter((t: any) => t.id !== id);
    setPendingTools(updatedPending);
    localStorage.setItem('pending_tools_list', JSON.stringify(updatedPending));
    
    setMessage("Signal rejected and terminated.");
    setTimeout(() => setMessage(""), 3000);
  };

  if (isLoading || !isAdmin) {
      return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black uppercase tracking-widest animate-pulse">Scanning Admin Clearance...</div>;
  }

  return (
    <main className="min-h-screen bg-white pb-40">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 pt-56">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-slate-100 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-[0.4rem]">
              <ShieldCheck size={18} /> Admin Central Hub
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Signal <span className="text-slate-300">Approval</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase group bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-600 transition-all">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Scanner
            </Link>
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-red-500 font-black text-[10px] uppercase group bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 hover:border-red-500 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {message && (
          <div className="mb-12 p-6 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl animate-fade-in flex items-center gap-4">
            <Check size={20} className="bg-white/20 p-1 rounded-lg" /> {message}
          </div>
        )}

        <div className="bg-slate-50 p-6 md:p-12 rounded-[3.5rem] border border-slate-100">
          <div className="flex items-center justify-between mb-12 px-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3rem]">
               Pending Signals: {pendingTools.length}
            </h3>
            <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-red-300" />
            </div>
          </div>

          {pendingTools.length === 0 ? (
            <div className="py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
               <div className="w-20 h-20 bg-slate-50 rounded-3xl mx-auto mb-8 flex items-center justify-center text-slate-200">
                  <LayoutGrid size={40} />
               </div>
               <h4 className="text-xl font-black text-slate-900 uppercase mb-2">Galaxy Silent</h4>
               <p className="text-slate-400 font-medium">No pending signals require review.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingTools.map((tool: any) => (
                <div key={tool.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 hover:shadow-2xl transition-all group">
                   <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center gap-4">
                        <span className="px-5 py-2 rounded-2xl bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                          {tool.category}
                        </span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                           Signal ID: {tool.id}
                        </span>
                      </div>
                      <h4 className="text-3xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed">
                        {tool.description}
                      </p>
                      <Link href={tool.link} target="_blank" className="inline-flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-widest hover:text-indigo-600">
                         Portal Check <ExternalLink size={12} />
                      </Link>
                   </div>

                   <div className="flex items-center gap-4 w-full lg:w-auto h-full min-h-[140px]">
                      <button 
                        onClick={() => handleApprove(tool.id)}
                        className="flex-1 lg:flex-none px-12 py-6 bg-slate-900 text-white rounded-[1.75rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-green-600 transition-all shadow-xl flex items-center justify-center gap-3"
                      >
                         <Check size={18} /> Approve
                      </button>
                      <button 
                         onClick={() => handleReject(tool.id)}
                         className="flex-1 lg:flex-none p-6 bg-slate-50 text-slate-400 rounded-[1.75rem] hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
                      >
                         <X size={20} />
                      </button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="py-24 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.6rem] text-slate-200">&copy; 2026 ADMIN OPERATING SYSTEM</p>
      </footer>
    </main>
  );
}
