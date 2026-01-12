import { apiFetch } from "./client";

export const projectsApi = {
    list: (params?: {
        skip?: number;
        limit?: number;
        status?: string;
        division_id?: number;
        department_id?: number;
        infrastructure_type?: string
    }) => {
        const searchParams = new URLSearchParams();
        if (params?.skip) searchParams.append("skip", String(params.skip));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.status) searchParams.append("status", params.status);
        if (params?.division_id) searchParams.append("division_id", String(params.division_id));
        if (params?.department_id) searchParams.append("department_id", String(params.department_id));
        if (params?.infrastructure_type) searchParams.append("infrastructure_type", params.infrastructure_type);
        return apiFetch(`/api/v1/projects/?${searchParams}`);
    },

    create: (data: any) =>
        apiFetch("/api/v1/projects/", { method: "POST", body: JSON.stringify(data) }),

    getByDepartment: (departmentId: number) =>
        apiFetch(`/api/v1/projects/by-department/${departmentId}`),

    get: (projectId: number) =>
        apiFetch(`/api/v1/projects/${projectId}`),

    update: (projectId: number, data: any) =>
        apiFetch(`/api/v1/projects/${projectId}`, { method: "PUT", body: JSON.stringify(data) }),

    delete: (projectId: number) =>
        apiFetch(`/api/v1/projects/${projectId}`, { method: "DELETE" }),

    createMilestone: (projectId: number, data: any) =>
        apiFetch(`/api/v1/projects/${projectId}/milestones`, { method: "POST", body: JSON.stringify(data) }),

    getMilestones: (projectId: number) =>
        apiFetch(`/api/v1/projects/${projectId}/milestones`),

    updateMilestone: (milestoneId: number, data: any) =>
        apiFetch(`/api/v1/projects/milestones/${milestoneId}`, { method: "PUT", body: JSON.stringify(data) }),

    createBudget: (projectId: number, data: any) =>
        apiFetch(`/api/v1/projects/${projectId}/budget`, { method: "POST", body: JSON.stringify(data) }),

    getBudget: (projectId: number) =>
        apiFetch(`/api/v1/projects/${projectId}/budget`),

    getBudgetSummary: (projectId: number) =>
        apiFetch(`/api/v1/projects/${projectId}/budget/summary`),

    getTeam: (projectId: number) =>
        apiFetch(`/api/v1/projects/${projectId}/team`),
};
