import { FolderKanban, MoreHorizontal, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  name: string;
  customer_name?: string;
  infrastructure_type?: string;
  status: string;
  progress: number;
  team_size?: number;
  deadline?: string;
}

interface RecentProjectsProps {
  projects?: Project[];
  isLoading?: boolean;
}

const statusStyles = {
  planning: "bg-warning/10 text-warning border-warning/20",
  in_progress: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  on_hold: "bg-muted text-muted-foreground border-border",
};

const typeStyles = {
  fiber: "bg-chart-1/10 text-chart-1",
  wireless: "bg-chart-2/10 text-chart-2",
  ppoe: "bg-chart-3/10 text-chart-3",
  hotspot: "bg-chart-4/10 text-chart-4",
  hybrid: "bg-chart-5/10 text-chart-5",
};

export function RecentProjects({ projects = [], isLoading }: RecentProjectsProps) {
  if (isLoading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="h-6 w-48 bg-secondary rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full bg-secondary rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FolderKanban className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
            <p className="text-sm text-muted-foreground">Active infrastructure deployments</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No active projects found</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project.id}
              className="p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{project.name}</h3>
                    {project.infrastructure_type && (
                      <Badge className={cn("text-xs", typeStyles[project.infrastructure_type as keyof typeof typeStyles])}>
                        {project.infrastructure_type.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.customer_name}</p>
                </div>
                <Badge variant="outline" className={cn("text-xs", statusStyles[project.status as keyof typeof statusStyles])}>
                  {(project.status || "planning").replace("_", " ")}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.team_size || 0}</span>
                </div>
                {project.deadline && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-primary transition-all duration-500"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{project.progress || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
