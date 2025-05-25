'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User, FilterOptions, SortOption, SortDirection } from '@/types';
import { enhanceUserData, filterUsers, sortUsers } from '@/lib/utils';

interface UserDataContextType {
  users: User[];
  filteredUsers: User[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  getUserById: (id: number) => User | undefined;
  promoteUser: (userId: number) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({ departments: [], ratings: [] });
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        
        // Enhance user data with additional fields
        const enhancedUsers = data.users.map((user: any) => enhanceUserData(user));
        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Apply filters, search, and sorting whenever they change
  useEffect(() => {
    if (users.length > 0) {
      const filtered = filterUsers(users, searchTerm, filters);
      const sorted = sortUsers(filtered, sortBy, sortDirection);
      setFilteredUsers(sorted);
    }
  }, [users, searchTerm, filters, sortBy, sortDirection]);

  const getUserById = (id: number) => {
    return users.find(user => user.id === id);
  };

  const promoteUser = (userId: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, performance: Math.min(user.performance + 1, 5) } 
          : user
      )
    );
  };

  return (
    <UserDataContext.Provider
      value={{
        users,
        filteredUsers,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        getUserById,
        promoteUser
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};