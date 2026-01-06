'use client';

import { Layout } from 'lucide-react';
import Link from 'next/link';

export default function NavbarSkeleton() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-2">
            <Layout className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800">Deckly</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 animate-pulse rounded bg-slate-200"></div>
            <div className="h-8 w-16 animate-pulse rounded bg-slate-200"></div>
            <div className="h-8 w-20 animate-pulse rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
