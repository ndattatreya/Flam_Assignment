'use client';

import { usePathname } from 'next/navigation';
import { SideNavigation } from './SideNavigation';
import { Header } from './Header';
import { useSession } from 'next-auth/react';

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  
  // Don't render layout for auth pages or when not authenticated
  if (pathname.startsWith('/auth') || status !== 'authenticated') {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        <SideNavigation currentPath={pathname} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto animate-in fade-in-50 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}