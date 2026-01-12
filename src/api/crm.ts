import { apiFetch } from "./client";

export const crmApi = {
    leads: () => apiFetch("/api/v1/crm/leads"),
    lead: (id: number) => apiFetch(`/api/v1/crm/leads/${id}`),
    createLead: (data: any) => apiFetch("/api/v1/crm/leads", { method: "POST", body: JSON.stringify(data) }),
    updateLead: (id: number, data: any) => apiFetch(`/api/v1/crm/leads/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deals: () => apiFetch("/api/v1/crm/deals"),
    createDeal: (data: any) => apiFetch("/api/v1/crm/deals", { method: "POST", body: JSON.stringify(data) }),
    activities: () => apiFetch("/api/v1/crm/activities"),
    logActivity: (data: any) => apiFetch("/api/v1/crm/activities", { method: "POST", body: JSON.stringify(data) }),
};
