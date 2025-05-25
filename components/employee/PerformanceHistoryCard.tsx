import { PerformanceHistory } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, getTextColorForRating } from '@/lib/utils';
import { StarRating } from '@/components/dashboard/StarRating';

interface PerformanceHistoryCardProps {
  history: PerformanceHistory[];
}

export function PerformanceHistoryCard({ history }: PerformanceHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performance History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                className="border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">
                      {formatDate(item.date)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reviewed by {item.reviewedBy}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={item.rating} />
                  </div>
                </div>
                <p className="mt-2 text-sm">{item.comments}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No performance history available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}