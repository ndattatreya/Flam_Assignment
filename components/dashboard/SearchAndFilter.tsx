'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useUserData } from '@/hooks/useUserData';
import { Department, FilterOptions } from '@/types';

export function SearchAndFilter() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    users
  } = useUserData();
  
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  
  // Get unique departments from users
  const departments: Department[] = Array.from(
    new Set(users.map(user => user.department as Department))
  ).sort();

  // Handle search input change with debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timerId);
  }, [localSearchTerm, setSearchTerm]);

  const handleDepartmentToggle = (department: Department) => {
    setLocalFilters(prev => {
      const isSelected = prev.departments.includes(department);
      const updatedDepartments = isSelected
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department];
      
      const newFilters = {
        ...prev,
        departments: updatedDepartments
      };
      
      setFilters(newFilters);
      return newFilters;
    });
  };

  const handleRatingToggle = (rating: number) => {
    setLocalFilters(prev => {
      const isSelected = prev.ratings.includes(rating);
      const updatedRatings = isSelected
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating];
      
      const newFilters = {
        ...prev,
        ratings: updatedRatings
      };
      
      setFilters(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    const emptyFilters = { departments: [], ratings: [] };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  const handleSortChange = (value: string) => {
    const [sortOption, direction] = value.split('-') as [typeof sortBy, typeof sortDirection];
    setSortBy(sortOption);
    setSortDirection(direction);
  };

  const activeFilterCount = 
    (filters.departments.length > 0 ? 1 : 0) + 
    (filters.ratings.length > 0 ? 1 : 0);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, email, or department..."
            className="pl-8 pr-10"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          {localSearchTerm && (
            <button
              onClick={() => {
                setLocalSearchTerm('');
                setSearchTerm('');
              }}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Select
            value={`${sortBy}-${sortDirection}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="performance-desc">Highest Rating</SelectItem>
                <SelectItem value="performance-asc">Lowest Rating</SelectItem>
                <SelectItem value="department-asc">Department (A-Z)</SelectItem>
                <SelectItem value="department-desc">Department (Z-A)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-auto p-0 text-muted-foreground text-xs"
                  >
                    Clear all
                  </Button>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Department</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {departments.map((department) => (
                      <div key={department} className="flex items-center space-x-2">
                        <Checkbox
                          id={`department-${department}`}
                          checked={localFilters.departments.includes(department)}
                          onCheckedChange={() => handleDepartmentToggle(department)}
                        />
                        <Label
                          htmlFor={`department-${department}`}
                          className="text-sm"
                        >
                          {department}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Performance Rating</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={localFilters.ratings.includes(rating)}
                          onCheckedChange={() => handleRatingToggle(rating)}
                        />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className="text-sm"
                        >
                          {rating} {rating === 1 ? 'Star' : 'Stars'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active filters display */}
      {(filters.departments.length > 0 || filters.ratings.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.departments.map((department) => (
            <Badge key={department} variant="secondary" className="flex items-center gap-1">
              {department}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDepartmentToggle(department)}
              />
            </Badge>
          ))}
          
          {filters.ratings.map((rating) => (
            <Badge key={rating} variant="secondary" className="flex items-center gap-1">
              {rating} {rating === 1 ? 'Star' : 'Stars'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRatingToggle(rating)}
              />
            </Badge>
          ))}
          
          {(filters.departments.length > 0 || filters.ratings.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}