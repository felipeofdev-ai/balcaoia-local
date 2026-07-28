import {
  ComplianceError,
  FeatureDisabledError,
  createForbiddenAdapter,
  type ForbiddenChannelType,
} from "@/lib/channels/adapter";

/**
 * Termos associados a automações não oficiais/proibidas (QR Code scraping,
 * bibliotecas não homologadas pelo WhatsApp, etc.). Usado para bloquear a
 * criação de integrações/canais com nomes que sugiram esse tipo de uso.
 */
const FORBIDDEN_TERMS: Array<{ term: string; type: ForbiddenChannelType }> = [
  { term: "openwa", type: "openwa" },
  { term: "open-wa", type: "openwa" },
  { term: "baileys", type: "baileys" },
  { term: "venom", type: "venom" },
  { term: "venom-bot", type: "venom" },
  { term: "evolutionapi", type: "evolution_api" },
  { term: "evolution-api", type: "evolution_api" },
  { term: "evolution_api", type: "evolution_api" },
  { term: "waautomate", type: "wa_automate" },
  { term: "wa-automate", type: "wa_automate" },
  { term: "qrcode", type: "qrcode_scraping" },
  { term: "qr-code", type: "qrcode_scraping" },
  { term: "scraping", type: "qrcode_scraping" },
  { term: "scraper", type: "qrcode_scraping" },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s\-_]+/g, "");
}

/**
 * Detecta se um nome de canal/integração menciona alguma automação não
 * oficial proibida no BalcãoIA Studio. Retorna o tipo proibido detectado ou
 * `null` quando o nome é compliant.
 */
export function detectForbiddenChannelTerm(name: string): ForbiddenChannelType | null {
  const normalized = normalize(name);
  for (const { term, type } of FORBIDDEN_TERMS) {
    if (normalized.includes(normalize(term))) {
      return type;
    }
  }
  return null;
}

export function isChannelNameCompliant(name: string): boolean {
  return detectForbiddenChannelTerm(name) === null;
}

/**
 * Lança ComplianceError (via createForbiddenAdapter) se o nome do canal
 * mencionar uma automação não oficial. Use antes de criar integrações
 * customizadas nomeadas pelo usuário.
 */
export function assertChannelNameIsCompliant(name: string): void {
  const forbidden = detectForbiddenChannelTerm(name);
  if (forbidden) {
    createForbiddenAdapter(forbidden);
  }
}

export { ComplianceError, FeatureDisabledError, createForbiddenAdapter };
export type { ForbiddenChannelType };
