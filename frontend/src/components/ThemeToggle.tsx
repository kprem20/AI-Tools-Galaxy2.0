'use client';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-black/[0.03] dark:border-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-purple-600 transition-all active:scale-95 relative overflow-hidden group shadow-sm"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? <Moon size={20} className="fill-purple-500/10" /> : <Sun size={20} className="fill-amber-500/10" />}
      </motion.div>
    </button>
  );
}
