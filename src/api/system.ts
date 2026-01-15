import { apiFetch } from "./client";

export const usersApi = {
    list: () => apiFetch("/api/v1/users/"),
    create: (data: any) => apiFetch("/api/v1/users/", { method: "POST", body: JSON.stringify(data) }),
    get: (userId: number) => apiFetch(`/api/v1/users/${userId}`),
    update: (userId: number, data: any) => apiFetch(`/api/v1/users/${userId}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (userId: number) => apiFetch(`/api/v1/users/${userId}`, { method: "DELETE" }),
    restore: (userId: number) => apiFetch(`/api/v1/users/${userId}/restore`, { method: "POST" }),
};


export const permissionsApi = {
    getRoles: () => apiFetch("/api/v1/permissions/roles"),
    getPermissions: () => apiFetch("/api/v1/permissions/permissions"),
    getMyPermissions: () => apiFetch("/api/v1/permissions/my-permissions"),
    assignRole: (userId: number, roleId: number) =>
        apiFetch(`/api/v1/permissions/assign?user_id=${userId}&role_id=${roleId}`, { method: "POST" }),
};
