import { apiFetch } from "./client";

export const workflowApi = {
    listWorkflows: (statusFilter?: string) => {
        const searchParams = new URLSearchParams();
        if (statusFilter) searchParams.append("status_filter", statusFilter);
        return apiFetch(`/api/v1/workflow/?${searchParams}`);
    },

    getWorkflow: (workflowId: number) =>
        apiFetch(`/api/v1/workflow/${workflowId}`),

    deleteWorkflow: (workflowId: number) =>
        apiFetch(`/api/v1/workflow/${workflowId}`, { method: "DELETE" }),

    createWorkflowGraph: (data: any) =>
        apiFetch("/api/v1/workflow/graph", { method: "POST", body: JSON.stringify(data) }),

    updateWorkflowGraph: (workflowId: number, data: any) =>
        apiFetch(`/api/v1/workflow/${workflowId}/graph`, { method: "PUT", body: JSON.stringify(data) }),

    publishWorkflow: (workflowId: number) =>
        apiFetch(`/api/v1/workflow/${workflowId}/publish`, { method: "POST" }),

    cloneWorkflow: (workflowId: number, newName: string) =>
        apiFetch(`/api/v1/workflow/${workflowId}/clone?new_name=${encodeURIComponent(newName)}`, { method: "POST" }),

    startWorkflow: (data: { workflow_id: number; priority?: string; data?: any }) =>
        apiFetch("/api/v1/workflow/start", { method: "POST", body: JSON.stringify(data) }),

    performAction: (instanceId: number, action: string, comment?: string) => {
        const searchParams = new URLSearchParams();
        searchParams.append("action", action);
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/workflow/instances/${instanceId}/actions?${searchParams}`, { method: "POST" });
    },

    myApprovals: () =>
        apiFetch("/api/v1/workflow/my-approvals"),

    getStats: () =>
        apiFetch("/api/v1/workflow/stats"),

    approveInstance: (instanceId: number, comment?: string) => {
        const searchParams = new URLSearchParams();
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/workflow/${instanceId}/approve?${searchParams}`, { method: "POST" });
    },

    rejectInstance: (instanceId: number, comment?: string) => {
        const searchParams = new URLSearchParams();
        if (comment) searchParams.append("comment", comment);
        return apiFetch(`/api/v1/workflow/${instanceId}/reject?${searchParams}`, { method: "POST" });
    },

    commentOnInstance: (instanceId: number, comment: string) =>
        apiFetch(`/api/v1/workflow/${instanceId}/comment?comment=${encodeURIComponent(comment)}`, { method: "POST" }),

    listPendingInstances: () =>
        apiFetch("/api/v1/workflow/pending"),
};
