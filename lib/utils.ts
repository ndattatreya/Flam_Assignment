import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Department, type User, type PerformanceHistory, type Project, type Feedback, type DepartmentStats, type BookmarkTrend } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const departments: Department[] = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Product',
  'Design',
  'Operations',
];

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getRandomDepartment(): Department {
  return departments[Math.floor(Math.random() * departments.length)];
}

export function getRandomPerformance(): number {
  return Math.floor(Math.random() * 5) + 1;
}

export function generateBio(): string {
  const bios = [
    "Dedicated professional with a strong track record of exceeding targets and mentoring team members.",
    "Results-oriented individual who thrives in fast-paced environments and adapts quickly to new challenges.",
    "Innovative problem-solver who consistently delivers high-quality work while maintaining excellent communication.",
    "Collaborative team player with exceptional attention to detail and project management skills.",
    "Strategic thinker with proven ability to drive business growth and implement process improvements.",
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}

export function generatePerformanceHistory(userId: number): PerformanceHistory[] {
  const history: PerformanceHistory[] = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < 4; i++) {
    const year = currentYear - i;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    
    history.push({
      id: i + 1,
      date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      rating: Math.floor(Math.random() * 5) + 1,
      reviewedBy: ['Jane Smith', 'John Doe', 'Michael Johnson', 'Sarah Williams'][Math.floor(Math.random() * 4)],
      comments: [
        'Consistently meets expectations and delivers quality work.',
        'Exceeds expectations in most areas. Strong communicator.',
        'Needs improvement in meeting deadlines, but quality of work is good.',
        'Outstanding performance across all objectives. A real team player.',
        'Shows potential but needs more guidance in technical areas.'
      ][Math.floor(Math.random() * 5)]
    });
  }
  
  return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateProjects(userId: number): Project[] {
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with improved UX/UI.',
      startDate: '2023-01-15',
      endDate: '2023-04-30',
      status: 'completed' as const,
      role: 'UI Designer'
    },
    {
      id: 2,
      name: 'CRM Implementation',
      description: 'Implementing a new customer relationship management system.',
      startDate: '2023-05-10',
      endDate: null,
      status: 'in-progress' as const,
      role: 'Project Lead'
    },
    {
      id: 3,
      name: 'Annual Performance Review',
      description: 'Conducting annual performance reviews for the department.',
      startDate: '2023-08-01',
      endDate: '2023-08-31',
      status: 'completed' as const,
      role: 'Reviewer'
    },
    {
      id: 4,
      name: 'New Employee Onboarding',
      description: 'Developing an improved onboarding process for new hires.',
      startDate: '2023-09-15',
      endDate: null,
      status: 'in-progress' as const,
      role: 'Team Member'
    },
    {
      id: 5,
      name: 'Q1 Planning',
      description: 'Strategic planning for Q1 of the upcoming year.',
      startDate: '2023-11-01',
      endDate: null,
      status: 'planned' as const,
      role: 'Contributor'
    }
  ];
  
  // Return a random subset of 2-4 projects
  const numProjects = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...projects].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numProjects);
}

export function generateFeedback(userId: number): Feedback[] {
  const feedbackItems: Feedback[] = [];
  const currentYear = new Date().getFullYear();
  
  const types: ('positive' | 'negative' | 'neutral')[] = ['positive', 'negative', 'neutral'];
  const names = ['Alex Johnson', 'Maria Garcia', 'Robert Chen', 'Emily Parker', 'David Kim'];
  
  const positiveContent = [
    'Consistently delivers high-quality work ahead of schedule.',
    'Excellent team player who helps others succeed.',
    'Innovative problem-solver with great communication skills.',
    'Takes initiative and goes beyond expectations.',
    'Provides thoughtful insights during team meetings.'
  ];
  
  const neutralContent = [
    'Meets expectations but could take more initiative.',
    'Good technical skills but needs to improve communication.',
    'Delivers work on time but sometimes lacks attention to detail.',
    'Works well with the team but could contribute more ideas.',
    'Has potential for growth with the right mentoring.'
  ];
  
  const negativeContent = [
    'Missed several deadlines recently, needs to improve time management.',
    'Communication has been inconsistent, affecting team coordination.',
    'Work quality is below expectations, needs more attention to detail.',
    'Has been resistant to feedback and improvement suggestions.',
    'Attendance and punctuality issues need to be addressed.'
  ];
  
  for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const date = new Date(currentYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    let content = '';
    if (type === 'positive') {
      content = positiveContent[Math.floor(Math.random() * positiveContent.length)];
    } else if (type === 'neutral') {
      content = neutralContent[Math.floor(Math.random() * neutralContent.length)];
    } else {
      content = negativeContent[Math.floor(Math.random() * negativeContent.length)];
    }
    
    feedbackItems.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      from: names[Math.floor(Math.random() * names.length)],
      type,
      content
    });
  }
  
  return feedbackItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function enhanceUserData(user: any): User {
  const department = getRandomDepartment();
  const performance = getRandomPerformance();
  const bio = generateBio();
  const performanceHistory = generatePerformanceHistory(user.id);
  const projects = generateProjects(user.id);
  const feedback = generateFeedback(user.id);
  
  return {
    ...user,
    department,
    performance,
    bio,
    performanceHistory,
    projects,
    feedback
  };
}

export function getDepartmentStats(users: User[]): DepartmentStats[] {
  const departmentMap = new Map<Department, { totalRating: number; count: number }>();
  
  users.forEach(user => {
    const department = user.department as Department;
    const current = departmentMap.get(department) || { totalRating: 0, count: 0 };
    departmentMap.set(department, {
      totalRating: current.totalRating + user.performance,
      count: current.count + 1
    });
  });
  
  return Array.from(departmentMap.entries()).map(([department, stats]) => ({
    department,
    averageRating: parseFloat((stats.totalRating / stats.count).toFixed(1)),
    employeeCount: stats.count
  }));
}

export function generateBookmarkTrends(): BookmarkTrend[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    count: Math.floor(Math.random() * 10) + 1
  }));
}

export function getColorForRating(rating: number): string {
  switch (rating) {
    case 1: return 'bg-red-500';
    case 2: return 'bg-orange-500';
    case 3: return 'bg-yellow-500';
    case 4: return 'bg-blue-500';
    case 5: return 'bg-green-500';
    default: return 'bg-gray-500';
  }
}

export function getTextColorForRating(rating: number): string {
  switch (rating) {
    case 1: return 'text-red-500';
    case 2: return 'text-orange-500';
    case 3: return 'text-yellow-500';
    case 4: return 'text-blue-500';
    case 5: return 'text-green-500';
    default: return 'text-gray-500';
  }
}

export function getRatingLabel(rating: number): string {
  switch (rating) {
    case 1: return 'Poor';
    case 2: return 'Below Average';
    case 3: return 'Average';
    case 4: return 'Good';
    case 5: return 'Excellent';
    default: return 'Unknown';
  }
}

export interface FilterOptions {
  department?: Department;
  rating?: number;
}

export function filterUsers(
  users: User[],
  searchTerm: string,
  filters: FilterOptions
): User[] {
  return users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filters.department ? user.department === filters.department : true;
    const matchesRating = filters.rating ? user.performance === filters.rating : true;

    return matchesSearch && matchesDepartment && matchesRating;
  });
}

export type SortDirection = 'asc' | 'desc';

export type SortOption = 'name' | 'performance' | 'department';

export function sortUsers(
  users: User[],
  sortBy: SortOption,
  sortDirection: SortDirection
): User[] {
  return [...users].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        break;
      case 'performance':
        comparison = a.performance - b.performance;
        break;
      case 'department':
        comparison = a.department.localeCompare(b.department);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
}