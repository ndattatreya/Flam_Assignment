'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkTrend } from '@/types';

interface BookmarkTrendsChartProps {
  data: BookmarkTrend[];
}

export function BookmarkTrendsChart({ data }: BookmarkTrendsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bookmark Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value}`, 'Bookmarks']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                name="Bookmark Count"
                dataKey="count" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}