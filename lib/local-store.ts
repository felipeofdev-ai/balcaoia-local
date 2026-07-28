/**
 * Store local em memória/localStorage para MVP sem Supabase configurado.
 * Permite validação visual completa do fluxo.
 */

import type { WizardData } from "@/types/business";
import type { AssetType } from "@/types/database";

export interface LocalBusiness {
  id: string;
  name: string;
  segment: string;
  city: string;
  description: string;
  wizard_completed: boolean;
  wizard_step: number;
  wizardData: WizardData;
  assets: Record<string, { content: string; model: string; updatedAt: string }>;
  created_at: string;
}

export interface LocalLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  segment?: string;
  profileType: string;
  consent: boolean;
  source?: string;
  created_at: string;
}

export interface LocalNicheTemplate {
  id: string;
  niche: string;
  description: string;
  suggestedTone: string;
  suggestedFaqs: string[];
  suggestedObjections: string[];
  complianceAlerts: string[];
  createdAt: string;
}

export interface LocalHotmartEvent {
  id: string;
  eventType: string;
  buyerEmail?: string;
  buyerName?: string;
  productId?: string;
  purchaseId?: string;
  createdAt: string;
}

const BUSINESSES_KEY = "balcaoia_businesses";
const LEADS_KEY = "balcaoia_leads";
const USER_KEY = "balcaoia_user";
const DIAGNOSTIC_KEY = "balcaoia_diagnostic";
const ADMIN_KEY = "balcaoia_admin";
const DEMO_COOKIE = "balcaoia_demo";
const NICHE_TEMPLATES_KEY = "balcaoia_niche_templates";
const HOTMART_EVENTS_KEY = "balcaoia_hotmart_events";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getLocalUser(): { name: string; email: string } | null {
  if (!canUseStorage()) return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as { name: string; email: string }) : null;
}

export function setLocalUser(user: { name: string; email: string }) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (canUseStorage()) {
    document.cookie = `${DEMO_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 30}`;
  }
}

export function clearLocalUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ADMIN_KEY);
  if (canUseStorage()) {
    document.cookie = `${DEMO_COOKIE}=; path=/; max-age=0`;
  }
}

export function isAdminDemo(): boolean {
  if (!canUseStorage()) return false;
  return localStorage.getItem(ADMIN_KEY) === "1";
}

export function setAdminDemo(value: boolean) {
  if (!canUseStorage()) return;
  if (value) localStorage.setItem(ADMIN_KEY, "1");
  else localStorage.removeItem(ADMIN_KEY);
}

export function getBusinesses(): LocalBusiness[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(BUSINESSES_KEY);
  return raw ? (JSON.parse(raw) as LocalBusiness[]) : [];
}

export function saveBusinesses(list: LocalBusiness[]) {
  localStorage.setItem(BUSINESSES_KEY, JSON.stringify(list));
}

export function getBusiness(id: string): LocalBusiness | undefined {
  return getBusinesses().find((b) => b.id === id);
}

export function upsertBusiness(business: LocalBusiness) {
  const list = getBusinesses();
  const idx = list.findIndex((b) => b.id === business.id);
  if (idx >= 0) list[idx] = business;
  else list.push(business);
  saveBusinesses(list);
  return business;
}

export function saveLead(lead: LocalLead) {
  if (!canUseStorage()) return;
  const raw = localStorage.getItem(LEADS_KEY);
  const list: LocalLead[] = raw ? JSON.parse(raw) : [];
  list.push(lead);
  localStorage.setItem(LEADS_KEY, JSON.stringify(list));
}

export function getLeads(): LocalLead[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(LEADS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveDiagnostic(data: unknown) {
  localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(data));
}

export function getDiagnostic() {
  if (!canUseStorage()) return null;
  const raw = localStorage.getItem(DIAGNOSTIC_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveAsset(
  businessId: string,
  type: AssetType | string,
  content: string,
  model = "mock"
) {
  const b = getBusiness(businessId);
  if (!b) return;
  b.assets[type] = { content, model, updatedAt: new Date().toISOString() };
  upsertBusiness(b);
}

export function getNicheTemplates(): LocalNicheTemplate[] {
  if (!canUseStorage()) {
    // Lazy import avoids a require-cycle at module init time on the server.
    return [];
  }
  const raw = localStorage.getItem(NICHE_TEMPLATES_KEY);
  if (raw) return JSON.parse(raw) as LocalNicheTemplate[];
  return [];
}

export function ensureNicheTemplatesSeeded(defaults: LocalNicheTemplate[]) {
  if (!canUseStorage()) return defaults;
  const raw = localStorage.getItem(NICHE_TEMPLATES_KEY);
  if (raw) return JSON.parse(raw) as LocalNicheTemplate[];
  localStorage.setItem(NICHE_TEMPLATES_KEY, JSON.stringify(defaults));
  return defaults;
}

export function saveNicheTemplates(list: LocalNicheTemplate[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(NICHE_TEMPLATES_KEY, JSON.stringify(list));
}

export function upsertNicheTemplate(template: LocalNicheTemplate) {
  const list = getNicheTemplates();
  const idx = list.findIndex((t) => t.id === template.id);
  if (idx >= 0) list[idx] = template;
  else list.push(template);
  saveNicheTemplates(list);
  return template;
}

export function deleteNicheTemplate(id: string) {
  const list = getNicheTemplates().filter((t) => t.id !== id);
  saveNicheTemplates(list);
}

export function getHotmartEvents(): LocalHotmartEvent[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(HOTMART_EVENTS_KEY);
  return raw ? (JSON.parse(raw) as LocalHotmartEvent[]) : [];
}

export function saveHotmartEvent(event: LocalHotmartEvent) {
  if (!canUseStorage()) return;
  const list = getHotmartEvents();
  list.unshift(event);
  localStorage.setItem(HOTMART_EVENTS_KEY, JSON.stringify(list));
}
