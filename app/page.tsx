'use client';

import React from 'react';
import { useEffect } from 'react';
import { UserCard } from '@/components/dashboard/UserCard';
import { SearchAndFilter } from '@/components/dashboard/SearchAndFilter';
import { useUserData } from '@/hooks/useUserData';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { filteredUsers, isLoading } = useUserData();

  // Pagination
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filtered results change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers.length]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and monitor employee performance data
        </p>
      </div>

      <SearchAndFilter
        departmentsList={['Engineering', 'Marketing', 'HR']} 
        ratingsList={[1, 2, 3, 4, 5]} 
        onFilterChange={() => { }} 
      />


      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </div>
              </div>
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-xl font-medium">No employees found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredUsers.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} employees
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}