import { apiFetch } from "./client";

export const inventoryApi = {
    createSupplier: (data: any) =>
        apiFetch("/api/v1/inventory/suppliers", { method: "POST", body: JSON.stringify(data) }),

    listSuppliers: (params?: { skip?: number; limit?: number; active_only?: boolean }) => {
        const searchParams = new URLSearchParams();
        if (params?.skip) searchParams.append("skip", String(params.skip));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.active_only !== undefined) searchParams.append("active_only", String(params.active_only));
        return apiFetch(`/api/v1/inventory/suppliers?${searchParams}`);
    },

    createProduct: (data: any) =>
        apiFetch("/api/v1/inventory/products", { method: "POST", body: JSON.stringify(data) }),

    listProducts: (params?: {
        skip?: number;
        limit?: number;
        category?: string;
        supplier_id?: number;
        low_stock?: boolean;
        is_empty_products?: boolean;
        search?: string;
        sort_by?: string;
        order?: 'asc' | 'desc';
    }) => {
        const searchParams = new URLSearchParams();
        if (params?.skip) searchParams.append("skip", String(params.skip));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.category) searchParams.append("category", params.category);
        if (params?.supplier_id) searchParams.append("supplier_id", String(params.supplier_id));
        if (params?.low_stock !== undefined) searchParams.append("low_stock", String(params.low_stock));
        if (params?.is_empty_products !== undefined) searchParams.append("is_empty_products", String(params.is_empty_products));
        if (params?.search) searchParams.append("search", params.search);
        if (params?.sort_by) searchParams.append("sort_by", params.sort_by);
        if (params?.order) searchParams.append("order", params.order);
        return apiFetch(`/api/v1/inventory/products?${searchParams}`);
    },

    getProduct: (productId: number) =>
        apiFetch(`/api/v1/inventory/products/${productId}`),

    updateProduct: (productId: number, data: any) =>
        apiFetch(`/api/v1/inventory/products/${productId}`, { method: "PATCH", body: JSON.stringify(data) }),

    syncProductFromClickup: (taskId: string) =>
        apiFetch(`/api/v1/inventory/products/sync-clickup/${taskId}`, { method: "POST" }),

    uploadProductImage: (productId: number, file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return apiFetch(`/api/v1/inventory/products/${productId}/image`, {
            method: "POST",
            body: formData,
            // Note: apiFetch usually assumes JSON, but for FormData we should let the browser set the boundary
        });
    },

    getProductImage: (productId: number) =>
        apiFetch(`/api/v1/inventory/products/${productId}/image`),

    searchProducts: (query: string, useScrapers = false, maxResults = 50) =>
        apiFetch(`/api/v1/products/search?q=${encodeURIComponent(query)}&use_scrapers=${useScrapers}&max_results=${maxResults}`),

    comparePrices: (productName: string, quantity: number) =>
        apiFetch("/api/v1/products/compare-prices", { method: "POST", body: JSON.stringify({ product_name: productName, quantity }) }),

    listCategories: () => apiFetch("/api/v1/products/categories"),

    getLowStock: (thresholdMultiplier = 1.5) =>
        apiFetch(`/api/v1/products/low-stock?threshold_multiplier=${thresholdMultiplier}`),
};
