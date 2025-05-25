'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/hooks/useTheme';
import { UserDataProvider } from '@/hooks/useUserData';
import { BookmarkProvider } from '@/hooks/useBookmarks';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <UserDataProvider>
          <BookmarkProvider>
            {children}
          </BookmarkProvider>
        </UserDataProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}