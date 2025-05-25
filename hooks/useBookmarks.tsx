'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface BookmarkContextType {
  bookmarks: User[];
  isBookmarked: (userId: number) => boolean;
  toggleBookmark: (user: User) => void;
  removeBookmark: (userId: number) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<User[]>([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('hr-dashboard-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks from localStorage', e);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hr-dashboard-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (userId: number): boolean => {
    return bookmarks.some(bookmark => bookmark.id === userId);
  };

  const toggleBookmark = (user: User) => {
    setBookmarks(prev => {
      if (isBookmarked(user.id)) {
        return prev.filter(bookmark => bookmark.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const removeBookmark = (userId: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== userId));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};