import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileText } from "lucide-react";

export default function Audit() {
    return (
        <DashboardLayout title="Audit Logs" subtitle="System events and security tracking">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <FileText className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Audit & Security</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    View system-wide audit logs, track user changes, and monitor security events.
                    The audit API is now fully operational and will be displayed here soon.
                </p>
            </div>
        </DashboardLayout>
    );
}
