import { Feedback } from '@/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';

interface FeedbackListProps {
  feedbackItems: Feedback[];
}

export function FeedbackList({ feedbackItems }: FeedbackListProps) {
  const getFeedbackTypeIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getFeedbackTypeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'neutral':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {feedbackItems.length > 0 ? (
        feedbackItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 transition-all hover:bg-accent"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={getFeedbackTypeColor(item.type)}>
                    <span className="flex items-center gap-1">
                      {getFeedbackTypeIcon(item.type)}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </Badge>
                  <span className="text-sm font-medium">{item.from}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
            <p className="text-sm">{item.content}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No feedback available for this employee.
        </div>
      )}
    </div>
  );
}