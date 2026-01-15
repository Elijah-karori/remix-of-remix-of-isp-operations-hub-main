import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
    return (
        <DashboardLayout title="Analytics" subtitle="Business intelligence and reporting">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <BarChart3 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    Comprehensive reporting on project profitability, financial forecasting,
                    and resource utilization is coming soon.
                </p>
            </div>
        </DashboardLayout>
    );
}
