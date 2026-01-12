import { apiFetch } from "./client";

export const hrApi = {
    createEmployee: (data: any) =>
        apiFetch("/api/v1/hr/employees", { method: "POST", body: JSON.stringify(data) }),

    listEmployees: (params?: { engagement_type?: string; is_active?: boolean; skip?: number; limit?: number }) => {
        const searchParams = new URLSearchParams();
        if (params?.engagement_type) searchParams.append("engagement_type", params.engagement_type);
        if (params?.is_active !== undefined) searchParams.append("is_active", String(params.is_active));
        if (params?.skip) searchParams.append("skip", String(params.skip));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        return apiFetch(`/api/v1/hr/employees?${searchParams}`);
    },

    getEmployee: (employeeId: number) =>
        apiFetch(`/api/v1/hr/employees/${employeeId}`),

    approveWorkflow: (instanceId: number, comment?: string) => {
        const searchParams = new URLSearchParams();
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/hr/workflow/${instanceId}/approve?${searchParams}`, { method: "POST" });
    },

    toggleEmployeeStatus: (userId: number) =>
        apiFetch(`/api/v1/hr/employees/${userId}/toggle-status`, { method: "PATCH" }),

    createRateCard: (data: any) =>
        apiFetch("/api/v1/hr/rate-cards", { method: "POST", body: JSON.stringify(data) }),

    getRateCards: (employeeId: number, activeOnly = true) =>
        apiFetch(`/api/v1/hr/rate-cards/${employeeId}?active_only=${activeOnly}`),

    calculatePayout: (data: any) =>
        apiFetch("/api/v1/hr/payouts/calculate", { method: "POST", body: JSON.stringify(data) }),

    getPendingPayouts: (limit = 50) =>
        apiFetch(`/api/v1/hr/payouts/pending?limit=${limit}`),

    getEmployeePayouts: (employeeId: number, limit = 10) =>
        apiFetch(`/api/v1/hr/payouts/employee/${employeeId}?limit=${limit}`),

    approvePayout: (payoutId: number, data: any) =>
        apiFetch(`/api/v1/hr/payouts/${payoutId}/approve`, { method: "POST", body: JSON.stringify(data) }),

    markPayoutPaid: (payoutId: number, paymentMethod: string, paymentReference: string) => {
        const searchParams = new URLSearchParams();
        searchParams.append("payment_method", paymentMethod);
        searchParams.append("payment_reference", paymentReference);
        return apiFetch(`/api/v1/hr/payouts/${payoutId}/mark-paid?${searchParams}`, { method: "POST" });
    },

    recordComplaint: (data: any) =>
        apiFetch("/api/v1/hr/complaints", { method: "POST", body: JSON.stringify(data) }),

    listComplaints: (employeeId?: number) => {
        const searchParams = new URLSearchParams();
        if (employeeId) searchParams.append("employee_id", String(employeeId));
        return apiFetch(`/api/v1/hr/complaints?${searchParams}`);
    },

    getPendingComplaints: (limit = 50) =>
        apiFetch(`/api/v1/hr/complaints/pending?limit=${limit}`),

    investigateComplaint: (complaintId: number, params: { is_valid: boolean; investigation_notes: string; resolution?: string }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("is_valid", String(params.is_valid));
        searchParams.append("investigation_notes", params.investigation_notes);
        if (params.resolution) searchParams.append("resolution", params.resolution);
        return apiFetch(`/api/v1/hr/complaints/${complaintId}/investigate?${searchParams}`, { method: "POST" });
    },

    recordAttendance: (data: any) =>
        apiFetch("/api/v1/hr/attendance", { method: "POST", body: JSON.stringify(data) }),

    getAttendance: (employeeId: number, startDate: string, endDate: string) =>
        apiFetch(`/api/v1/hr/attendance/${employeeId}?start_date=${startDate}&end_date=${endDate}`),

    getPayrollSummary: (periodStart: string, periodEnd: string) =>
        apiFetch(`/api/v1/hr/reports/payroll-summary?period_start=${periodStart}&period_end=${periodEnd}`),

    getEmployeePerformance: (employeeId: number, periodStart: string, periodEnd: string) =>
        apiFetch(`/api/v1/hr/reports/employee-performance/${employeeId}?period_start=${periodStart}&period_end=${periodEnd}`),
};

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
