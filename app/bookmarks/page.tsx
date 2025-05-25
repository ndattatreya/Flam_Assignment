'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { UserCard } from '@/components/dashboard/UserCard';
import { Button } from '@/components/ui/button';
import { BookmarkX } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bookmarks</h1>
        <p className="text-muted-foreground">
          Manage your bookmarked employees and quick actions
        </p>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((user) => (
            <UserCard key={user.id} user={user} inBookmarkView={true} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookmarkX className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You haven't bookmarked any employees yet. Bookmark employees to quickly access their information and perform actions.
          </p>
          <Link href="/" passHref>
            <Button>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}