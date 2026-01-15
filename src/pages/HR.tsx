import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users } from "lucide-react";

export default function HR() {
    return (
        <DashboardLayout title="Human Resources" subtitle="Employee management and payroll">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Users className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">HR Module</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    The Human Resources module is currently being integrated with the new API client.
                    Soon you will be able to manage employee profiles, track attendance, and process payroll here.
                </p>
            </div>
        </DashboardLayout>
    );
}
