export const ANALYTICS_EVENTS = [
  "lead_submitted",
  "diagnostic_started",
  "diagnostic_completed",
  "sales_cta_clicked",
  "checkout_clicked",
  "wizard_started",
  "wizard_completed",
  "asset_generated",
  "simulator_used",
  "export_created",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Rastreamento de eventos "mock-friendly": sempre loga no console (útil em
 * dev/testes) e, se disponível no browser, também empurra para
 * `window.dataLayer` (compatível com GTM/GA4), sem exigir nenhum SDK externo.
 */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  const payload = { event, ...props, timestamp: new Date().toISOString() };

  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", payload);
  }

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
  }
}
