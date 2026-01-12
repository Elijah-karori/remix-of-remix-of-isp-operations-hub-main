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

    listProducts: (params?: { skip?: number; limit?: number; category?: string; supplier_id?: number; low_stock?: boolean }) => {
        const searchParams = new URLSearchParams();
        if (params?.skip) searchParams.append("skip", String(params.skip));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.category) searchParams.append("category", params.category);
        if (params?.supplier_id) searchParams.append("supplier_id", String(params.supplier_id));
        if (params?.low_stock !== undefined) searchParams.append("low_stock", String(params.low_stock));
        return apiFetch(`/api/v1/inventory/products?${searchParams}`);
    },

    getProduct: (productId: number) =>
        apiFetch(`/api/v1/inventory/products/${productId}`),

    updateProduct: (productId: number, data: any) =>
        apiFetch(`/api/v1/inventory/products/${productId}`, { method: "PATCH", body: JSON.stringify(data) }),

    searchProducts: (query: string, useScrapers = false, maxResults = 50) =>
        apiFetch(`/api/v1/products/search?q=${encodeURIComponent(query)}&use_scrapers=${useScrapers}&max_results=${maxResults}`),

    comparePrices: (productName: string, quantity: number) =>
        apiFetch("/api/v1/products/compare-prices", { method: "POST", body: JSON.stringify({ product_name: productName, quantity }) }),

    listCategories: () => apiFetch("/api/v1/products/categories"),

    getLowStock: (thresholdMultiplier = 1.5) =>
        apiFetch(`/api/v1/products/low-stock?threshold_multiplier=${thresholdMultiplier}`),
};

export const scrapersApi = {
    triggerScraper: (supplierId: number) =>
        apiFetch(`/api/v1/scrapers/suppliers/${supplierId}/scrape`, { method: "POST" }),

    scrapeGenericUrl: (url: string, supplier_id?: number) =>
        apiFetch("/api/v1/scrapers/scrape-generic", { method: "POST", body: JSON.stringify({ url, supplier_id }) }),

    scrapeAllSuppliers: () =>
        apiFetch("/api/v1/scrapers/scrape-all", { method: "POST" }),

    getPriceHistory: (productId: number, limit = 100) =>
        apiFetch(`/api/v1/scrapers/price-history/${productId}?limit=${limit}`),

    getRecentPriceDrops: (days = 7, minDropPercent = 5.0) => {
        const searchParams = new URLSearchParams();
        searchParams.append("days", String(days));
        searchParams.append("min_drop_percent", String(minDropPercent));
        return apiFetch(`/api/v1/scrapers/price-drops?${searchParams}`);
    },
};
