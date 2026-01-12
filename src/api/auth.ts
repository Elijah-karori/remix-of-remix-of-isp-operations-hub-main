import { apiFetch, API_BASE_URL, setAccessToken } from "./client";

export const authApi = {
    login: async (email: string, password: string) => {
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: "Login failed" }));
            throw new Error(error.detail || "Login failed");
        }

        const data = await response.json();
        setAccessToken(data.access_token);
        return data;
    },

    register: async (data: { email: string; full_name: string; phone: string; password: string }) => {
        return apiFetch("/api/v1/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    me: async () => apiFetch("/api/v1/auth/me"),

    refresh: async () => {
        const data: any = await apiFetch("/api/v1/auth/refresh", { method: "POST" });
        if (data.access_token) {
            setAccessToken(data.access_token);
        }
        return data;
    },

    passwordlessRequest: async (email: string) =>
        apiFetch(`/api/v1/auth/passwordless/request?email=${encodeURIComponent(email)}`, { method: "POST" }),

    passwordlessVerify: async (token: string) => {
        const data: any = await apiFetch(`/api/v1/auth/passwordless/verify?token=${encodeURIComponent(token)}`);
        if (data.access_token) {
            setAccessToken(data.access_token);
        }
        return data;
    },

    registerOtpRequest: async (data: { email: string; full_name: string; phone: string; role_id?: number }) =>
        apiFetch("/api/v1/auth/register/otp/request", { method: "POST", body: JSON.stringify(data) }),

    registerOtpVerify: async (email: string, otp: string) => {
        const data: any = await apiFetch(`/api/v1/auth/register/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, { method: "POST" });
        if (data.access_token) {
            setAccessToken(data.access_token);
        }
        return data;
    },

    setPassword: async (password: string) =>
        apiFetch("/api/v1/auth/set-password", { method: "POST", body: JSON.stringify({ password }) }),

    logout: () => setAccessToken(null),
};
