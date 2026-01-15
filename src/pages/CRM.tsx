import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserCircle } from "lucide-react";

export default function CRM() {
    return (
        <DashboardLayout title="CRM" subtitle="Customer Relationship Management">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <UserCircle className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">CRM Module</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    Manage your customer base, leads, and interactions in the upcoming CRM module.
                    We are currently mapping the new API endpoints to this interface.
                </p>
            </div>
        </DashboardLayout>
    );
}
