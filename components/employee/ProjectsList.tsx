import { Project } from '@/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const getStatusColor = (status: 'completed' | 'in-progress' | 'planned') => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'planned':
        return 'bg-amber-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div>
                    {project.name}
                    <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
                  </div>
                </TableCell>
                <TableCell>{project.role}</TableCell>
                <TableCell>{formatDate(project.startDate)}</TableCell>
                <TableCell>{project.endDate ? formatDate(project.endDate) : 'Ongoing'}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No projects assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}