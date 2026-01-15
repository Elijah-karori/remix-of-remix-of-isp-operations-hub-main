import { apiFetch } from "./client";

export const techniciansApi = {
    getPerformance: (technicianId: number, periodStart?: string, periodEnd?: string) => {
        const searchParams = new URLSearchParams();
        if (periodStart) searchParams.append("period_start", periodStart);
        if (periodEnd) searchParams.append("period_end", periodEnd);
        return apiFetch(`/api/v1/technicians/${technicianId}/performance?${searchParams}`);
    },

    getLeaderboard: (params?: { period_start?: string; period_end?: string; limit?: number }) => {
        const searchParams = new URLSearchParams();
        if (params?.period_start) searchParams.append("period_start", params.period_start);
        if (params?.period_end) searchParams.append("period_end", params.period_end);
        if (params?.limit) searchParams.append("limit", String(params.limit));
        return apiFetch(`/api/v1/technicians/leaderboard?${searchParams}`);
    },

    recordSatisfaction: (data: any) =>
        apiFetch("/api/v1/technicians/satisfaction", { method: "POST", body: JSON.stringify(data) }),

    listSatisfaction: (params?: { technician_id?: number; task_id?: number; limit?: number }) => {
        const searchParams = new URLSearchParams();
        if (params?.technician_id) searchParams.append("technician_id", String(params.technician_id));
        if (params?.task_id) searchParams.append("task_id", String(params.task_id));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        return apiFetch(`/api/v1/technicians/satisfaction?${searchParams}`);
    },

    getAltitude: (technicianId: number) =>
        apiFetch(`/api/v1/technicians/${technicianId}/altitude`),
};
