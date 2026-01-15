import { CheckSquare, Circle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMyTasks } from "@/hooks/use-dashboard";

interface Task {
  id: number;
  title: string;
  project_name?: string;
  priority: string;
  status: string;
  assigned_role?: string;
  due_date?: string;
}

const priorityStyles = {
  low: "text-muted-foreground",
  medium: "text-primary",
  high: "text-warning",
  critical: "text-destructive",
};

const priorityIcons = {
  low: Circle,
  medium: Circle,
  high: AlertTriangle,
  critical: AlertTriangle,
};

const statusStyles = {
  pending: "bg-muted text-muted-foreground",
  in_progress: "bg-primary/10 text-primary",
  awaiting_approval: "bg-warning/10 text-warning",
  completed: "bg-success/10 text-success",
};

export function TasksList() {
  const { data: rawTasks, isLoading, error, refetch } = useMyTasks();

  const tasks: Task[] = (rawTasks as any[]) || [];

  if (isLoading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-secondary rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-secondary rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-6 text-center">
        <p className="text-destructive mb-4">Error loading tasks</p>
        <Button onClick={() => refetch()} variant="outline" size="sm">Retry</Button>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <CheckSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">My Tasks</h2>
            <p className="text-sm text-muted-foreground">Assigned to you</p>
          </div>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/20">
          {tasks.filter((t) => t.status !== "completed").length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No tasks assigned to you</p>
          </div>
        ) : (
          tasks.map((task, index) => {
            const priority = (task.priority?.toLowerCase() || "medium") as keyof typeof priorityIcons;
            const PriorityIcon = priorityIcons[priority] || Circle;
            const status = (task.status?.toLowerCase() || "pending") as keyof typeof statusStyles;

            return (
              <div
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    status === "completed"
                      ? "bg-success/20"
                      : "bg-secondary border-2 border-border group-hover:border-primary/50"
                  )}
                >
                  {status === "completed" ? (
                    <CheckSquare className="w-4 h-4 text-success" />
                  ) : (
                    <PriorityIcon
                      className={cn("w-4 h-4", priorityStyles[priority])}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium truncate",
                      status === "completed"
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{task.project_name}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={cn("text-xs", statusStyles[status])}>
                    {status.replace("_", " ")}
                  </Badge>
                  {task.due_date && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <Button variant="ghost" className="w-full mt-4 text-primary">
        View All Tasks
      </Button>
    </div>
  );
}
