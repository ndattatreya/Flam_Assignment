'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// Type definitions for clarity
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

export default function EmployeeDetailsPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : -1;

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const res = await fetch('https://dummyjson.com/users?limit=20');
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const user = users.find((u) => u.id === id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Employee Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The employee you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" passHref>
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium">Phone: {user.phone}</p>
              <p className="text-sm font-medium">
                Address: {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="p-4 bg-card border rounded-lg text-sm">No project data available for dummy users.</div>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="p-4 bg-card border rounded-lg text-sm">No feedback available for dummy users.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
