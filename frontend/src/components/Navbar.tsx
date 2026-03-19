"use client";
import React from 'react';
import Link from 'next/link';
import { Sparkles, Plus, LogOut, Lock, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 bg-white/95 backdrop-blur-3xl border-b border-indigo-50 px-12 md:px-20 flex items-center justify-between shadow-sm">
      <Link href="/" className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30 group-hover:rotate-6 transition-all duration-500">
          <Sparkles size={26} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-3xl tracking-tighter text-slate-900 leading-none mb-1">AI TOOL GALAXY</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">The Ultimate Directory</span>
        </div>
      </Link>
      
      <div className="flex items-center gap-12">
        <Link href="/" className="hidden lg:block text-xs font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors">Directory</Link>
        
        {isAdmin ? (
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/10 group">
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Admin Panel</span>
              <ShieldCheck size={18} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-4 group">
               <div className="text-right hidden sm:block">
                  <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest">premk</div>
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Admin</div>
               </div>
               <button onClick={logout} className="p-4 rounded-2xl bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-inner">
                  <LogOut size={20} />
               </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/submit" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-50 text-slate-900 hover:bg-slate-100 transition-all shadow-sm shadow-slate-200/50 group border border-slate-200">
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Submit Signal</span>
              <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            </Link>
            <Link href="/login" className="px-10 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Admin Login</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
