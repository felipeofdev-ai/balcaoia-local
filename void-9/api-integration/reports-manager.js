/**
 * Relatórios via Hotmart Payments API (leitura real).
 */

import { hotmartClient } from "../lib/hotmart-client.js";
import { logger } from "../lib/logger.js";

function toMs(date) {
  if (!date) return undefined;
  if (typeof date === "number") return date;
  const t = Date.parse(String(date));
  return Number.isFinite(t) ? t : undefined;
}

export async function getSalesReport(startDate, endDate, productId) {
  logger.info("reports.sales", { startDate, endDate, productId });
  return hotmartClient.get("sales/history", {
    start_date: toMs(startDate),
    end_date: toMs(endDate),
    product_id: productId,
    max_results: 100,
  });
}

export async function getSalesSummary(startDate, endDate, productId) {
  return hotmartClient.get("sales/summary", {
    start_date: toMs(startDate),
    end_date: toMs(endDate),
    product_id: productId,
  });
}

export async function getConversionRate(productId, period) {
  // Proxy: summary no período; conversão real de checkout exige pixels/analytics.
  const end = Date.now();
  const start = end - (Number(period) || 30) * 86_400_000;
  const summary = await getSalesSummary(start, end, productId);
  return {
    ok: true,
    productId,
    periodDays: Number(period) || 30,
    summary,
    note: "Taxa de conversão de página exige analytics (Meta/GA). Aqui: resumo de vendas Hotmart.",
  };
}

export async function getRevenueByProduct() {
  const end = Date.now();
  const start = end - 90 * 86_400_000;
  const summary = await getSalesSummary(start, end);
  return { ok: true, days: 90, summary };
}

export async function getAffiliatePerformance(productId) {
  return hotmartClient.get("sales/history", {
    product_id: productId,
    max_results: 100,
  });
}

export async function getSubscriptionMetrics(productId) {
  return {
    ok: true,
    productId,
    note: "MRR/churn/LTV: use endpoints de subscription do app Hotmart Developers se o escopo estiver habilitado.",
    panel: "https://app-vlc.hotmart.com/",
  };
}

export async function getDailyRevenue(days = 7) {
  const end = Date.now();
  const start = end - Number(days) * 86_400_000;
  return getSalesSummary(start, end);
}

export async function exportReport(type, format = "json", filters = {}) {
  let data;
  if (type === "sales") {
    data = await getSalesReport(filters.startDate, filters.endDate, filters.productId);
  } else if (type === "summary") {
    data = await getSalesSummary(filters.startDate, filters.endDate, filters.productId);
  } else {
    data = await getRevenueByProduct();
  }

  if (format === "csv") {
    const rows = Array.isArray(data?.items) ? data.items : [data];
    const header = Object.keys(rows[0] || { value: 1 }).join(",");
    const body = rows
      .map((r) =>
        Object.values(r)
          .map((v) => JSON.stringify(v ?? ""))
          .join(",")
      )
      .join("\n");
    return { ok: true, format: "csv", content: `${header}\n${body}` };
  }

  return { ok: true, format: "json", content: data };
}

export default {
  getSalesReport,
  getSalesSummary,
  getConversionRate,
  getRevenueByProduct,
  getAffiliatePerformance,
  getSubscriptionMetrics,
  getDailyRevenue,
  exportReport,
};
