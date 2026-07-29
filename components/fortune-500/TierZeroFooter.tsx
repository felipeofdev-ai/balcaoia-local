import Link from "next/link";

type Props = { icon?: string };

export function TierZeroFooter({ icon = "◆" }: Props) {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <div className="mb-5 flex items-center justify-center gap-2">
          <span aria-hidden>{icon}</span>
          <span className="text-xs font-bold tracking-[0.16em] text-white uppercase">BalcãoIA</span>
        </div>
        <p className="text-xs text-white/25">© 2026 BalcãoIA · balcaoialocal.com.br</p>
        <p className="mx-auto mt-3 max-w-lg text-[11px] font-light leading-relaxed text-white/20">
          Produto digital entregue após confirmação do pagamento. Conteúdo educativo. Resultados
          variam conforme execução e contexto. Sem promessa de renda, lucro ou vendas garantidas.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-[11px] text-white/25">
          <Link href="/termos-de-uso" className="hover:text-white/50">
            Termos
          </Link>
          <Link href="/politica-de-privacidade" className="hover:text-white/50">
            Privacidade
          </Link>
          <Link href="/afiliados" className="hover:text-white/50">
            Afiliados
          </Link>
          <Link href="/disclaimer" className="hover:text-white/50">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
