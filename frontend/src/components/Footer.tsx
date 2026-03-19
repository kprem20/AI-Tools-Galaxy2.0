'use client';
import React, { useState } from 'react';
import { Twitter, Github, Linkedin, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Subscription failed.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="relative z-10 overflow-hidden bg-white dark:bg-slate-950 border-t border-black/[0.03] dark:border-white/[0.03] pt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4 max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Sparkles size={20} className="text-white fill-white/20" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-[var(--fg)]">
                AI Tools<span className="text-purple-600"> Galaxy</span>
              </span>
            </Link>
            <p className="text-slate-500 text-base leading-relaxed mb-8 font-medium">
              The most comprehensive directory of AI tools. Discover, compare, and find the perfect tools for your workflow.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-purple-500/10 hover:text-purple-600 transition-all border border-black/[0.03] dark:border-white/[0.03] shadow-sm active:scale-95 text-slate-500">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-400">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium text-[var(--fg)]">
              <li><Link href="/" className="hover:text-purple-600 transition-colors">Home</Link></li>
              <li><Link href="/categories" className="hover:text-purple-600 transition-colors">Categories</Link></li>
              <li><Link href="/trending" className="hover:text-purple-600 transition-colors">Trending</Link></li>
              <li><Link href="/search" className="hover:text-purple-600 transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-400">Categories</h4>
            <ul className="space-y-4 text-sm font-medium text-[var(--fg)]">
              <li><Link href="/category/Writing AI" className="hover:text-purple-600 transition-colors">Writing AI</Link></li>
              <li><Link href="/category/Coding AI" className="hover:text-purple-600 transition-colors">Coding AI</Link></li>
              <li><Link href="/category/Image Generation" className="hover:text-purple-600 transition-colors">Image Generation</Link></li>
              <li><Link href="/category/Video Generation" className="hover:text-purple-600 transition-colors">Video Generation</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-400">Stay Updated</h4>
            <p className="text-slate-500 mb-6 font-medium text-base">
              Get weekly updates on the latest AI tools and trends.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-purple-500/30 focus:bg-white dark:focus:bg-slate-900 rounded-xl px-5 py-4 text-sm w-full outline-none transition-all font-medium shadow-inner pr-24"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-2 top-2 bottom-2 px-5 bg-slate-900 dark:bg-purple-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all shadow-lg"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : 'Subscribe'}
                </button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-600 text-xs font-bold mt-1">
                    <CheckCircle2 size={14} /> {message}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-rose-500 text-xs font-bold mt-1">
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-black/[0.03] dark:border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-medium text-slate-400">
            &copy; 2026 AI Tools Galaxy. All rights reserved.
          </span>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/[0.03] dark:border-white/[0.03] text-xs font-medium text-slate-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" /> All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
