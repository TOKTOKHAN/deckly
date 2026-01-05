'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // 랜딩 페이지에서는 Navbar 숨기기
  if (pathname === '/') {
    return null;
  }

  return <Navbar />;
}
