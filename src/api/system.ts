import { apiFetch } from "./client";

export const usersApi = {
    list: () => apiFetch("/api/v1/users/"),
    create: (data: any) => apiFetch("/api/v1/users/", { method: "POST", body: JSON.stringify(data) }),
    get: (userId: number) => apiFetch(`/api/v1/users/${userId}`),
    update: (userId: number, data: any) => apiFetch(`/api/v1/users/${userId}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (userId: number) => apiFetch(`/api/v1/users/${userId}`, { method: "DELETE" }),
    restore: (userId: number) => apiFetch(`/api/v1/users/${userId}/restore`, { method: "POST" }),
};

export const workflowApi = {
    list: (statusFilter?: string) => {
        const searchParams = new URLSearchParams();
        if (statusFilter) searchParams.append("status_filter", statusFilter);
        return apiFetch(`/api/v1/workflow/?${searchParams}`);
    },
    get: (workflowId: number) => apiFetch(`/api/v1/workflow/${workflowId}`),
    delete: (workflowId: number) => apiFetch(`/api/v1/workflow/${workflowId}`, { method: "DELETE" }),
    createGraph: (data: any) => apiFetch("/api/v1/workflow/graph", { method: "POST", body: JSON.stringify(data) }),
    updateGraph: (workflowId: number, data: any) => apiFetch(`/api/v1/workflow/${workflowId}/graph`, { method: "PUT", body: JSON.stringify(data) }),
    publish: (workflowId: number) => apiFetch(`/api/v1/workflow/${workflowId}/publish`, { method: "POST" }),
    clone: (workflowId: number, newName: string) => apiFetch(`/api/v1/workflow/${workflowId}/clone?new_name=${encodeURIComponent(newName)}`, { method: "POST" }),
    start: (data: any) => apiFetch("/api/v1/workflow/start", { method: "POST", body: JSON.stringify(data) }),
    performAction: (instanceId: number, action: string, comment?: string) => {
        const searchParams = new URLSearchParams();
        searchParams.append("action", action);
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/workflow/instances/${instanceId}/actions?${searchParams}`, { method: "POST" });
    },
    myApprovals: () => apiFetch("/api/v1/workflow/my-approvals"),
    getStats: () => apiFetch("/api/v1/workflow/stats"),
    approve: (instanceId: number, comment?: string) => {
        const searchParams = new URLSearchParams();
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/workflow/${instanceId}/approve?${searchParams}`, { method: "POST" });
    },
    reject: (instanceId: number, comment?: string) => {
        const searchParams = new URLSearchParams();
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/workflow/${instanceId}/reject?${searchParams}`, { method: "POST" });
    },
    comment: (instanceId: number, comment: string) =>
        apiFetch(`/api/v1/workflow/${instanceId}/comment?comment=${encodeURIComponent(comment)}`, { method: "POST" }),
    listPending: () => apiFetch("/api/v1/workflow/pending"),
};

export const permissionsApi = {
    getRoles: () => apiFetch("/api/v1/permissions/roles"),
    getPermissions: () => apiFetch("/api/v1/permissions/permissions"),
    getMyPermissions: () => apiFetch("/api/v1/permissions/my-permissions"),
    assignRole: (userId: number, roleId: number) =>
        apiFetch(`/api/v1/permissions/assign?user_id=${userId}&role_id=${roleId}`, { method: "POST" }),
};

export const dashboardApi = {
    getProjectsOverview: () => apiFetch("/api/v1/dashboards/projects-overview"),
    getTaskAllocation: () => apiFetch("/api/v1/dashboards/task-allocation"),
    getBudgetTracking: () => apiFetch("/api/v1/dashboards/budget-tracking"),
    getTeamWorkload: () => apiFetch("/api/v1/dashboards/team-workload"),
    getDepartmentOverview: (departmentId: number) => apiFetch(`/api/v1/dashboards/department/${departmentId}/overview`),
};
