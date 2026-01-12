import { apiFetch } from "./client";

export const mpesaApi = {
    registerC2BUrls: () =>
        apiFetch("/api/v1/finance/mpesa/c2b/register-urls", { method: "POST" }),

    stkPush: (data: {
        phone_number: string;
        amount: number;
        account_reference: string;
        description: string;
        customer_id?: number;
        project_id?: number;
    }) =>
        apiFetch("/api/v1/finance/mpesa/stkpush", { method: "POST", body: JSON.stringify(data) }),

    simulateC2B: (data: { amount: number; msisdn: string; bill_ref: string }) =>
        apiFetch("/api/v1/finance/mpesa/c2b/simulate", { method: "POST", body: JSON.stringify(data) }),

    generateQR: (data: { amount: number; ref: string; trx_code: string }) =>
        apiFetch("/api/v1/finance/mpesa/qr/generate", { method: "POST", body: JSON.stringify(data) }),

    b2cPay: (data: { phone_number: string; amount: number; remarks: string; occasion?: string }) =>
        apiFetch("/api/v1/finance/mpesa/b2c/pay", { method: "POST", body: JSON.stringify(data) }),

    b2bPay: (data: any) =>
        apiFetch("/api/v1/finance/mpesa/b2b/pay", { method: "POST", body: JSON.stringify(data) }),

    remitTax: (data: any) =>
        apiFetch("/api/v1/finance/mpesa/tax/remit", { method: "POST", body: JSON.stringify(data) }),

    createRatiba: (data: any) =>
        apiFetch("/api/v1/finance/mpesa/ratiba/create", { method: "POST", body: JSON.stringify(data) }),

    getBalance: () =>
        apiFetch("/api/v1/finance/mpesa/balance"),

    checkStatus: (transaction_id: string) =>
        apiFetch("/api/v1/finance/mpesa/transaction/status", { method: "POST", body: JSON.stringify({ transaction_id }) }),

    reverseTransaction: (data: { transaction_id: string; amount: number; receiver_party: string; remarks: string }) =>
        apiFetch("/api/v1/finance/mpesa/transaction/reverse", { method: "POST", body: JSON.stringify(data) }),

    listTransactions: (params?: { limit?: number; status?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.status) searchParams.append("status", params.status);
        return apiFetch(`/api/v1/finance/mpesa/transactions?${searchParams}`);
    },

    getTransaction: (id: number) =>
        apiFetch(`/api/v1/finance/mpesa/transactions/${id}`),

    getTransactionByReceipt: (receipt: string) =>
        apiFetch(`/api/v1/finance/mpesa/transactions/receipt/${receipt}`),

    reconcile: (data: { start_date: string; end_date: string }) =>
        apiFetch("/api/v1/finance/mpesa/reconcile", { method: "POST", body: JSON.stringify(data) }),
};
