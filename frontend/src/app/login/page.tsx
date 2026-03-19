"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ShieldCheck, User as UserIcon, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(username, password);
    if (success) {
      router.push('/admin');
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-50 selection:text-indigo-600 pb-20">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 pt-56 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
            Admin Access
          </h1>
          <p className="text-slate-400 font-medium mb-12 capitalize tracking-tight px-10">
            Enter your credentials to manage the AI tools directory.
          </p>

          <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-3xl space-y-8">
            {error && <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest">{error}</p>}
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-6 text-left">Username</label>
              <input 
                type="text" 
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 text-base font-medium focus:outline-none focus:ring-8 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-inner"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-6 text-left">Password</label>
              <input 
                type="password" 
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 text-base font-medium focus:outline-none focus:ring-8 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-inner"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 shadow-3xl shadow-slate-900/10"
            >
              LOGIN NOW <ArrowRight size={20} />
            </button>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mt-12 text-center border-t border-slate-50 pt-8 italic opacity-60">
               Direct Access: use premk / premk20 for admin rights.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
