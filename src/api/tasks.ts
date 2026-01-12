import { apiFetch } from "./client";

export const tasksApi = {
    list: (params?: {
        skip?: number;
        limit?: number;
        project_id?: number;
        status?: string;
        assigned_role?: string;
        department_id?: number;
        priority?: string
    }) => {
        const searchParams = new URLSearchParams();
        if (params?.skip) searchParams.append("skip", String(params.skip));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.project_id) searchParams.append("project_id", String(params.project_id));
        if (params?.status) searchParams.append("status", params.status);
        if (params?.assigned_role) searchParams.append("assigned_role", params.assigned_role);
        if (params?.department_id) searchParams.append("department_id", String(params.department_id));
        if (params?.priority) searchParams.append("priority", params.priority);
        return apiFetch(`/api/v1/tasks/?${searchParams}`);
    },

    create: (data: any) =>
        apiFetch("/api/v1/tasks/", { method: "POST", body: JSON.stringify(data) }),

    myAssignments: () =>
        apiFetch("/api/v1/tasks/my-assignments"),

    getByDepartment: (departmentId: number) =>
        apiFetch(`/api/v1/tasks/by-department/${departmentId}`),

    get: (taskId: number) =>
        apiFetch(`/api/v1/tasks/${taskId}`),

    update: (taskId: number, data: any) =>
        apiFetch(`/api/v1/tasks/${taskId}`, { method: "PUT", body: JSON.stringify(data) }),

    assignByRole: (data: { task_id: number; role_name: string; department_id?: number }) =>
        apiFetch("/api/v1/tasks/assign-by-role", { method: "POST", body: JSON.stringify(data) }),

    logHours: (taskId: number, data: { hours: number; notes?: string }) =>
        apiFetch(`/api/v1/tasks/${taskId}/hours`, { method: "PUT", body: JSON.stringify(data) }),

    addDependency: (taskId: number, dependsOnTaskId: number, dependencyType = "finish_to_start") =>
        apiFetch(`/api/v1/tasks/${taskId}/dependencies?depends_on_task_id=${dependsOnTaskId}&dependency_type=${dependencyType}`, { method: "POST" }),

    getDependencies: (taskId: number) =>
        apiFetch(`/api/v1/tasks/${taskId}/dependencies`),
};
