export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  department: string;
  performance: number;
  bio: string;
  performanceHistory: PerformanceHistory[];
  projects: Project[];
  feedback: Feedback[];
}

export interface PerformanceHistory {
  id: number;
  date: string;
  rating: number;
  reviewedBy: string;
  comments: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  status: 'completed' | 'in-progress' | 'planned';
  role: string;
}

export interface Feedback {
  id: number;
  date: string;
  from: string;
  type: 'positive' | 'negative' | 'neutral';
  content: string;
}

export type Department = 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Finance' | 'Product' | 'Design' | 'Operations';

export type SortOption = 'name' | 'performance' | 'department';
export type SortDirection = 'asc' | 'desc';

export interface FilterOptions {
  departments: Department[];
  ratings: number[];
}

export interface DepartmentStats {
  department: Department;
  averageRating: number;
  employeeCount: number;
}

export interface BookmarkTrend {
  month: string;
  count: number;
}