'use client';

import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterState {
  departments: string[];
  ratings: number[];
}

interface Props {
  filters?: FilterState;
  departmentsList: string[];
  ratingsList: number[];
  onFilterChange: (filters: FilterState) => void;
}

const defaultFilters: FilterState = {
  departments: [],
  ratings: [],
};

export const SearchAndFilter: React.FC<Props> = ({
  filters = defaultFilters,
  departmentsList,
  ratingsList,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleDepartmentToggle = (dept: string) => {
    const newDepartments = localFilters.departments.includes(dept)
      ? localFilters.departments.filter((d) => d !== dept)
      : [...localFilters.departments, dept];

    const updatedFilters = {
      ...localFilters,
      departments: newDepartments,
    };

    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRatingToggle = (rating: number) => {
    const newRatings = localFilters.ratings.includes(rating)
      ? localFilters.ratings.filter((r) => r !== rating)
      : [...localFilters.ratings, rating];

    const updatedFilters = {
      ...localFilters,
      ratings: newRatings,
    };

    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const activeFilterCount =
  ((localFilters.departments?.length ?? 0) > 0 ? 1 : 0) +
  ((localFilters.ratings?.length ?? 0) > 0 ? 1 : 0);

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <h2 className="text-lg font-semibold mb-2">Filter by Department</h2>
        {departmentsList.map((dept) => (
          <div key={dept} className="flex items-center space-x-2 mb-1">
            <Checkbox
              id={`dept-${dept}`}
              checked={localFilters.departments?.includes(dept) ?? false}
              onCheckedChange={() => handleDepartmentToggle(dept)}
            />
            <Label htmlFor={`dept-${dept}`}>{dept}</Label>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Filter by Ratings</h2>
        {ratingsList.map((rating) => (
          <div key={rating} className="flex items-center space-x-2 mb-1">
            <Checkbox
              id={`rating-${rating}`}
              checked={localFilters.ratings?.includes(rating) ?? false}
              onCheckedChange={() => handleRatingToggle(rating)}
            />
            <Label htmlFor={`rating-${rating}`}>{rating} ⭐</Label>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Active Filters: {activeFilterCount}
      </div>
    </div>
  );
};