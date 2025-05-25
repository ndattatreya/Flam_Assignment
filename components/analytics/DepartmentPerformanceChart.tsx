'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DepartmentStats } from '@/types';

interface DepartmentPerformanceChartProps {
  data: DepartmentStats[];
}

export function DepartmentPerformanceChart({ data }: DepartmentPerformanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Department Performance Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="department" 
                angle={-45} 
                textAnchor="end"
                height={70}
                tickMargin={20}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}`, 'Avg. Rating']}
                labelFormatter={(label) => `Department: ${label}`}
              />
              <Legend />
              <Bar 
                name="Average Rating" 
                dataKey="averageRating" 
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}