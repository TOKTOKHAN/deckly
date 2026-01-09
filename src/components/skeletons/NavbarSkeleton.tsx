'use client';

import Link from 'next/link';
import DecklyLogo from '@/components/ui/DecklyLogo';

export default function NavbarSkeleton() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <DecklyLogo className="h-8 w-auto text-indigo-600" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-14 animate-pulse rounded-xl bg-slate-200"></div>
            <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
