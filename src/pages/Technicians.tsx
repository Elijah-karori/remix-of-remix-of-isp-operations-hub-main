import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Wrench } from "lucide-react";

export default function Technicians() {
    return (
        <DashboardLayout title="Technicians" subtitle="Field operations and performance">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Wrench className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Technicians Module</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    The Technicians module is coming soon. This area will feature performance leaderboards,
                    task completion tracking, and field mission coordination.
                </p>
            </div>
        </DashboardLayout>
    );
}
