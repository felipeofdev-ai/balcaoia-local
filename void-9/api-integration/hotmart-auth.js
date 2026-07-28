/**
 * Autenticação Hotmart — reexport do token-manager.
 */
export {
  getAccessToken,
  clearTokenCache,
  withAuthRetry,
} from "../lib/token-manager.js";
