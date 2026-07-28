/**
 * Conta de demonstração oficial do BalcãoIA Studio.
 * Funciona sem Firebase/Supabase (login local no navegador).
 * Não use como senha de produção de clientes reais.
 */
export const DEMO_ACCOUNT = {
  email: "demo@balcaoialocal.com.br",
  password: "BalcaoIA7D!",
  name: "Demo BalcãoIA",
} as const;

export function isDemoAccount(email: string, password: string) {
  return (
    email.trim().toLowerCase() === DEMO_ACCOUNT.email &&
    password === DEMO_ACCOUNT.password
  );
}
