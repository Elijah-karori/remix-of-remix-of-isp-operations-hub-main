import { apiFetch } from "./client";

export const rbacApi = {
    checkPermission: (permission: string) =>
        apiFetch(`/api/v1/rbac/check?permission=${encodeURIComponent(permission)}`),

    checkBatch: (permissions: string[]) =>
        apiFetch("/api/v1/rbac/check-batch", { method: "POST", body: JSON.stringify({ permissions }) }),

    myPermissions: () =>
        apiFetch("/api/v1/rbac/my-permissions"),
};

export const managementApi = {
    verifyOtp: (data: { email: string; otp: string; purpose: string }) =>
        apiFetch("/api/v1/management/rbac/verify-otp", { method: "POST", body: JSON.stringify(data) }),

    listSortedUsers: (params?: { sort_by?: string; algorithm?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.sort_by) searchParams.append("sort_by", params.sort_by);
        if (params?.algorithm) searchParams.append("algorithm", params.algorithm);
        return apiFetch(`/api/v1/management/rbac/users/sorted?${searchParams}`);
    },

    getRoleHierarchyTree: () =>
        apiFetch("/api/v1/management/rbac/roles/tree"),

    listSortedRoles: (params?: { sort_by?: string; algorithm?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.sort_by) searchParams.append("sort_by", params.sort_by);
        if (params?.algorithm) searchParams.append("algorithm", params.algorithm);
        return apiFetch(`/api/v1/management/rbac/roles/sorted?${searchParams}`);
    },

    updateUserStatus: (userId: number, status: string, notes?: string) =>
        apiFetch(`/api/v1/management/rbac/users/${userId}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status, notes })
        }),

    createPolicy: (data: any) =>
        apiFetch("/api/v1/management/rbac/policies", { method: "POST", body: JSON.stringify(data) }),

    activateRole: (roleId: number) =>
        apiFetch(`/api/v1/management/rbac/roles/${roleId}/activate`, { method: "POST" }),

    resolveRoleFuzzy: (roleName: string, threshold = 0.7) =>
        apiFetch(`/api/v1/management/rbac/roles/resolve-fuzzy?role_name=${encodeURIComponent(roleName)}&threshold=${threshold}`),

    analyzeIndependentRole: (roleName: string) =>
        apiFetch(`/api/v1/management/rbac/roles/analyze-independent?role_name=${encodeURIComponent(roleName)}`),

    getAdminMetrics: (days = 7) =>
        apiFetch(`/api/v1/management/dashboards/admin/metrics?days=${days}`),

    getAuditorHeatmap: () =>
        apiFetch("/api/v1/management/dashboards/auditor/heatmap"),

    getAuditTrails: (params?: { limit?: number; resource?: string; result?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.resource) searchParams.append("resource", params.resource);
        if (params?.result) searchParams.append("result", params.result);
        return apiFetch(`/api/v1/management/dashboards/auditor/trails?${searchParams}`);
    },

    getTesterCoverage: () =>
        apiFetch("/api/v1/management/dashboards/tester/coverage"),

    buildFeatureAccessPolicy: (data: any) =>
        apiFetch("/api/v1/management/policies/features", { method: "POST", body: JSON.stringify(data) }),

    bootstrapStandardRoles: () =>
        apiFetch("/api/v1/management/policies/bootstrap/roles", { method: "POST" }),
};
