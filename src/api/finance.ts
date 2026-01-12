import { apiFetch } from "./client";

export const financeApi = {
    getBudgetTemplate: (projectName = "New Project") =>
        apiFetch(`/api/v1/finance/budget-template?project_name=${encodeURIComponent(projectName)}`),

    getFinancialAccounts: () =>
        apiFetch("/api/v1/finance/financial-accounts/"),

    createFinancialAccount: (data: any) =>
        apiFetch("/api/v1/finance/financial-accounts/", { method: "POST", body: JSON.stringify(data) }),

    getFinancialAccount: (accountId: number) =>
        apiFetch(`/api/v1/finance/financial-accounts/${accountId}`),

    createSubBudget: (masterBudgetId: number, data: any) =>
        apiFetch(`/api/v1/finance/master-budgets/${masterBudgetId}/sub-budgets/`, { method: "POST", body: JSON.stringify(data) }),

    getSubBudgets: (masterBudgetId: number) =>
        apiFetch(`/api/v1/finance/master-budgets/${masterBudgetId}/sub-budgets/`),

    getSubBudget: (subBudgetId: number) =>
        apiFetch(`/api/v1/finance/sub-budgets/${subBudgetId}`),

    createBomVariance: (data: any) =>
        apiFetch("/api/v1/finance/bom-variances/", { method: "POST", body: JSON.stringify(data) }),

    uploadBudget: (formData: FormData) =>
        apiFetch("/api/v1/finance/upload-budget/", {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" } // Fetch might need this removed for boundary, but apiFetch adds json by default. Need to be careful.
        }),

    createBudgetUsage: (data: any) =>
        apiFetch("/api/v1/finance/budget-usages/", { method: "POST", body: JSON.stringify(data) }),

    approveBudgetUsage: (usageId: number, data: { approved: boolean; approver_id: number; notes?: string }) =>
        apiFetch(`/api/v1/finance/budget-usages/${usageId}/approve`, { method: "POST", body: JSON.stringify(data) }),

    getBudgetUsages: (subBudgetId: number) =>
        apiFetch(`/api/v1/finance/sub-budgets/${subBudgetId}/usages/`),

    detectTaskVariances: (taskId: number) =>
        apiFetch(`/api/v1/finance/tasks/${taskId}/detect-variances`, { method: "POST" }),

    approveBomVariance: (varianceId: number, data: { status: string; approved_by: number; notes?: string }) =>
        apiFetch(`/api/v1/finance/variances/${varianceId}/approve`, { method: "POST", body: JSON.stringify(data) }),

    getPendingVariances: (limit = 50) =>
        apiFetch(`/api/v1/finance/variances/pending?limit=${limit}`),

    getProjectFinancials: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/financials`),

    ncbaPay: (data: any) =>
        apiFetch("/api/v1/finance/ncba/pay", { method: "POST", body: JSON.stringify(data) }),

    getSnapshot: () =>
        apiFetch("/api/v1/finance/snapshot"),

    reconcileAccounts: (data: any) =>
        apiFetch("/api/v1/finance/reconcile", { method: "POST", body: JSON.stringify(data) }),

    processTaskCompletionFinancial: (taskId: number) =>
        apiFetch(`/api/v1/finance/tasks/${taskId}/complete-financial`, { method: "POST" }),

    generateInvoice: (data: any) =>
        apiFetch("/api/v1/finance/invoices/generate", { method: "POST", body: JSON.stringify(data) }),

    processPayment: (data: any) =>
        apiFetch("/api/v1/finance/payments/process", { method: "POST", body: JSON.stringify(data) }),

    getPaymentSchedule: (projectId: number) =>
        apiFetch(`/api/v1/finance/payments/schedule/${projectId}`),

    getOverdueInvoices: (daysOverdue = 0) =>
        apiFetch(`/api/v1/finance/payments/overdue?days_overdue=${daysOverdue}`),

    getInfrastructureAnalytics: (startDate: string, endDate: string) =>
        apiFetch(`/api/v1/finance/analytics/infrastructure-profitability?start_date=${startDate}&end_date=${endDate}`),

    recommendBudgetAllocation: (totalBudget: number, periodMonths = 12) =>
        apiFetch(`/api/v1/finance/analytics/budget-allocation?total_budget=${totalBudget}&period_months=${periodMonths}`),

    generateProfitabilityReport: (data: any) =>
        apiFetch("/api/v1/finance/analytics/profitability-report", { method: "POST", body: JSON.stringify(data) }),

    getMonthlyProfit: (year: number, month: number) =>
        apiFetch(`/api/v1/finance/analytics/monthly-profit/${year}/${month}`),

    getProjectProfitability: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/profitability`),

    completeProjectFinancial: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/complete`, { method: "POST" }),

    allocateProjectBudget: (projectId: number, data: any) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/budget/allocate`, { method: "POST", body: JSON.stringify(data) }),

    getBudgetSummary: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/budget/summary`),

    getProjectCosts: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/costs`),

    getBudgetVariance: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/variance`),

    getProjectForecast: (projectId: number) =>
        apiFetch(`/api/v1/finance/projects/${projectId}/forecast`),

    createPaymentMilestones: (projectId: number, data: any) =>
        apiFetch(`/api/v1/finance/payments/milestones?project_id=${projectId}`, { method: "POST", body: JSON.stringify(data) }),
};
