/**
 * Automações de e-mail — hooks (log + payload pronto para provedor).
 * Integre Resend/SendGrid depois; aqui não inventamos envio sem API key.
 */

import { logger } from "../lib/logger.js";

async function enqueue(template, customer) {
  const payload = {
    template,
    to: customer?.email,
    name: customer?.name,
    at: new Date().toISOString(),
  };
  logger.info("email.enqueue", payload);
  // Futuro: fetch(process.env.EMAIL_PROVIDER_URL, ...)
  return { ok: true, queued: true, ...payload };
}

export async function triggerWelcomeSequence(customer) {
  return enqueue("welcome", customer);
}

export async function triggerUpsellSequence(customer) {
  return enqueue("upsell", customer);
}

export async function triggerWinbackSequence(customer) {
  return enqueue("winback", customer);
}

export async function triggerAffiliateOnboarding(affiliate) {
  return enqueue("affiliate_onboarding", affiliate);
}

export default {
  triggerWelcomeSequence,
  triggerUpsellSequence,
  triggerWinbackSequence,
  triggerAffiliateOnboarding,
};
