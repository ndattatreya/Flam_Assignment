'use client';

import { useState, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { Card, CardContent } from '@/components/ui/card';
import { DepartmentPerformanceChart } from '@/components/analytics/DepartmentPerformanceChart';
import { BookmarkTrendsChart } from '@/components/analytics/BookmarkTrendsChart';
import { DepartmentDistributionChart } from '@/components/analytics/DepartmentDistributionChart';
import { Users, Award, Bookmark, TrendingUp } from 'lucide-react';
import { getDepartmentStats, generateBookmarkTrends } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Department, DepartmentStats, BookmarkTrend } from '@/types';

export default function AnalyticsPage() {
  const { users, isLoading } = useUserData();
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [bookmarkTrends, setBookmarkTrends] = useState<BookmarkTrend[]>([]);

  useEffect(() => {
    if (!isLoading && users.length > 0) {
      setDepartmentStats(getDepartmentStats(users) as DepartmentStats[]);
      setBookmarkTrends(generateBookmarkTrends());
    }
  }, [users, isLoading]);

  const totalEmployees = users.length;
  const averagePerformance = users.length > 0 
    ? (users.reduce((sum, user) => sum + user.performance, 0) / users.length).toFixed(1)
    : 0;
  const topPerformers = users.filter(user => user.performance >= 4).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>

        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track employee performance metrics and department statistics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-3xl font-bold mt-1">{totalEmployees}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-3xl font-bold mt-1">{averagePerformance}</p>
              </div>
              <div className="bg-chart-1/10 p-2 rounded-full">
                <Award className="h-5 w-5 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Performers</p>
                <p className="text-3xl font-bold mt-1">{topPerformers}</p>
              </div>
              <div className="bg-chart-2/10 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bookmarks</p>
                <p className="text-3xl font-bold mt-1">
                  {bookmarkTrends.reduce((sum, item) => sum + item.count, 0)}
                </p>
              </div>
              <div className="bg-chart-3/10 p-2 rounded-full">
                <Bookmark className="h-5 w-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentPerformanceChart data={departmentStats} />
        <BookmarkTrendsChart data={bookmarkTrends} />
      </div>

      <DepartmentDistributionChart data={departmentStats} />
    </div>
  );
}
