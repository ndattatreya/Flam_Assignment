'use client';

import { User } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookmarkIcon, 
  Eye, 
  TrendingUp, 
  Trash,
  ClipboardCheck
} from 'lucide-react';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useUserData } from '@/hooks/useUserData';
import { cn, getColorForRating } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UserCardProps {
  user: User;
  inBookmarkView?: boolean;
}

export function UserCard({ user, inBookmarkView = false }: UserCardProps) {
  const { isBookmarked, toggleBookmark, removeBookmark } = useBookmarks();
  const { promoteUser } = useUserData();
  const bookmarked = isBookmarked(user.id);

  const handlePromote = () => {
    promoteUser(user.id);
  };

  const handleToggleBookmark = () => {
    toggleBookmark(user);
  };

  const handleRemoveBookmark = () => {
    if (inBookmarkView) {
      removeBookmark(user.id);
    }
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{`${user.firstName} ${user.lastName}`}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={bookmarked ? "default" : "outline"} 
                  size="icon" 
                  onClick={handleToggleBookmark}
                  className={bookmarked ? "bg-primary text-primary-foreground" : ""}
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Department</p>
            <Badge variant="outline">{user.department}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Age</p>
            <span className="text-sm">{user.age}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Performance</p>
            <div className="flex items-center">
              <StarRating rating={user.performance} />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex items-center justify-between gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/employee/${user.id}`} passHref>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  <span>View</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>View employee details</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {inBookmarkView ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    <span>Assign</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Assign to project</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleRemoveBookmark}
                    className="flex-1"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    <span>Remove</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove from bookmarks</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handlePromote}
                  className="flex-1"
                  disabled={user.performance >= 5}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>Promote</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {user.performance >= 5 ? "Already at highest level" : "Promote employee"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardFooter>
    </Card>
  );
}