'use client';

import { useUserData } from '@/hooks/useUserData';
import { SearchAndFilter } from '@/components/dashboard/SearchAndFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/dashboard/StarRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function EmployeesPage() {
  const { filteredUsers, isLoading, promoteUser } = useUserData();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Employees</h1>
        <p className="text-muted-foreground">
          View and manage all employees in the organization
        </p>
      </div>

      <SearchAndFilter />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const bookmarked = isBookmarked(user.id);
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                            <AvatarFallback>{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.department}</Badge>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>
                        <StarRating rating={user.performance} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant={bookmarked ? "default" : "outline"} 
                            size="icon" 
                            onClick={() => toggleBookmark(user)}
                          >
                            <BookmarkIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => promoteUser(user.id)}
                            disabled={user.performance >= 5}
                          >
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                          <Link href={`/employee/${user.id}`} passHref>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}