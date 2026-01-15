import { Wrench, Star, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTeamWorkload } from "@/hooks/use-dashboard";

interface Technician {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  completed_tasks: number;
  assigned_tasks: number;
  efficiency: number;
  altitude?: string;
}

const altitudeStyles = {
  bronze: "bg-amber-900/20 text-amber-600 border-amber-600/30",
  silver: "bg-gray-400/20 text-gray-400 border-gray-400/30",
  gold: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  platinum: "bg-primary/20 text-primary border-primary/30",
};

export function TeamPerformance() {
  const { data: workload, isLoading, error } = useTeamWorkload();

  if (isLoading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="h-6 w-40 bg-secondary rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-secondary rounded" />
          ))}
        </div>
      </div>
    );
  }

  const technicians: Technician[] = (workload?.technicians as any[]) || [];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <Wrench className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Team Performance</h2>
            <p className="text-sm text-muted-foreground">Top technicians this month</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          Leaderboard
        </Button>
      </div>

      <div className="space-y-4">
        {technicians.length === 0 ? (
          <p className="text-xs text-center text-muted-foreground py-4">No team data available</p>
        ) : (
          technicians.map((tech, index) => (
            <div
              key={tech.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-1 text-muted-foreground w-6">
                {index === 0 ? (
                  <Award className="w-5 h-5 text-yellow-500" />
                ) : (
                  <span className="text-sm font-medium">#{index + 1}</span>
                )}
              </div>

              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {tech.avatar || getInitials(tech.name)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground truncate">{tech.name}</p>
                  {tech.altitude && (
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full border ${altitudeStyles[tech.altitude.toLowerCase() as keyof typeof altitudeStyles] || altitudeStyles.bronze
                        }`}
                    >
                      {tech.altitude}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span>{tech.rating || 0}</span>
                  </div>
                  <span>{tech.completed_tasks || 0} tasks</span>
                </div>
              </div>

              <div className="w-24 flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-sm font-medium text-success">{tech.efficiency || 0}%</span>
                </div>
                <Progress value={tech.efficiency || 0} className="h-1.5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
