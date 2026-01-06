'use client';

import { usePathname } from 'next/navigation';
import { useNotFound } from '@/contexts/NotFoundContext';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const { isNotFound } = useNotFound();

  // 랜딩 페이지 또는 404 페이지에서는 Navbar 숨기기
  if (pathname === '/' || isNotFound) {
    return null;
  }

  return <Navbar />;
}
