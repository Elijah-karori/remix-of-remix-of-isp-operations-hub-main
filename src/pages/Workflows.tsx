import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GitBranch } from "lucide-react";

export default function Workflows() {
    return (
        <DashboardLayout title="Workflows" subtitle="Process automation and approval tracking">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <GitBranch className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Workflows Module</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    The visual workflow engine is being built. Track approvals, automate repetitive tasks,
                    and manage business logic across departments.
                </p>
            </div>
        </DashboardLayout>
    );
}
