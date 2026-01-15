import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
    return (
        <DashboardLayout title="Settings" subtitle="System configuration and profile">
            <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-xl border-dashed border-2">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <SettingsIcon className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Global Settings</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-center">
                    Configure API endpoints, mail services, and user profile preferences
                    in the upcoming settings panel.
                </p>
            </div>
        </DashboardLayout>
    );
}
