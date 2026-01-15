import { apiFetch } from "./client";

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
