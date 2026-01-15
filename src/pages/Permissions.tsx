import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Shield } from "lucide-react";

export default function Permissions() {
    return (
        <DashboardLayout title="Permissions" subtitle="RBAC and access control management">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Shield className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Permissions Module</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    Manage roles, departments, and specific feature access policies.
                    The RBAC API is now integrated with the new security layer.
                </p>
            </div>
        </DashboardLayout>
    );
}
