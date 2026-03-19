"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function SubmitPage() {
  const [formData, setFormData] = useState({ name: "", description: "", category: "", link: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pended = localStorage.getItem('pending_tools_list');
    const lists = pended ? JSON.parse(pended) : [];
    lists.push({ ...formData, id: Date.now(), submittedBy: "Guest", status: "pending" });
    localStorage.setItem('pending_tools_list', JSON.stringify(lists));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-[3rem] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-10 shadow-3xl shadow-indigo-600/10 animate-bounce">
           <Sparkles size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Signal Sent!</h1>
        <p className="text-slate-400 mb-12 max-w-sm font-medium text-lg leading-relaxed mb-10 tracking-tight">Your AI signal has been broadcasted to the galaxy hub. An admin will verify it shortly.</p>
        <Link href="/" className="px-12 py-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-premium">
          CONTINUE TO DISCOVERY
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-50 selection:text-indigo-600 pb-20">
      <Navbar />
      
      <div className="max-w-xl mx-auto px-6 pt-56">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase mb-12 group bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 transition-all">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Galaxy
        </Link>

        <div className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-3xl animate-fade-in">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase text-center">Broadcast Signal</h2>
          <p className="text-slate-400 text-sm font-medium mb-12 leading-relaxed text-center capitalize tracking-tight px-10">
            Share a powerful AI discovery with the galaxy. Every signal is verified by admins.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-2">Tool Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Sora, Udio, Phind"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl py-6 px-6 text-base font-medium focus:outline-none focus:ring-8 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-2">Category</label>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl py-6 px-6 text-base font-bold focus:outline-none focus:ring-8 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all cursor-pointer appearance-none shadow-inner"
              >
                <option value="" disabled>Select Signal Type</option>
                <option value="Writing">Writing</option>
                <option value="Image">Image</option>
                <option value="Video">Video</option>
                <option value="Coding">Coding</option>
                <option value="Marketing">Marketing</option>
                <option value="Productivity">Productivity</option>
                <option value="Audio">Audio</option>
                <option value="Design">Design</option>
                <option value="Chatbot">Chatbot</option>
                <option value="Research">Research</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Social Media">Social Media</option>
                <option value="SEO">SEO</option>
                <option value="Developer Tools">Developer Tools</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 shadow-3xl shadow-slate-900/10"
            >
              SEND SIGNAL <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
