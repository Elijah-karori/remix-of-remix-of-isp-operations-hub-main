import { apiFetch } from "./client";

export const dashboardsApi = {
    getProjectsOverview: () =>
        apiFetch("/api/v1/dashboards/projects-overview"),

    getTaskAllocation: () =>
        apiFetch("/api/v1/dashboards/task-allocation"),

    getBudgetTracking: () =>
        apiFetch("/api/v1/dashboards/budget-tracking"),

    getTeamWorkload: () =>
        apiFetch("/api/v1/dashboards/team-workload"),

    getDepartmentOverview: (departmentId: number) =>
        apiFetch(`/api/v1/dashboards/department/${departmentId}/overview`),
};
