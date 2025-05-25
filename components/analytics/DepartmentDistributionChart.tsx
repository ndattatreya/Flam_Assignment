'use client';

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DepartmentStats } from '@/types';

interface DepartmentDistributionChartProps {
  data: DepartmentStats[];
}

export function DepartmentDistributionChart({ data }: DepartmentDistributionChartProps) {
  // Color palette for the pie chart
  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    '#6366f1',
    '#a855f7',
    '#ec4899',
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Department Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="employeeCount"
                nameKey="department"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  department,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-xs font-medium"
                    >
                      {department} ({(percent * 100).toFixed(0)}%)
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`${value} employees`, props.payload.department]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}