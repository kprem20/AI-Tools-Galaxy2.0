'use client';
import React from 'react';

export function ToolCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4 border border-white/5 bg-white/60 dark:bg-slate-900/60">
      <div className="flex items-start justify-between">
        <div className="skeleton w-14 h-14 rounded-xl" />
        <div className="skeleton w-16 h-7 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="skeleton w-3/4 h-5 rounded" />
        <div className="skeleton w-1/3 h-4 rounded" />
      </div>
      <div className="space-y-2">
        <div className="skeleton w-full h-3 rounded" />
        <div className="skeleton w-5/6 h-3 rounded" />
        <div className="skeleton w-2/3 h-3 rounded" />
      </div>
      <div className="skeleton w-full h-10 rounded-xl mt-auto" />
    </div>
  );
}

export function ToolGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}
