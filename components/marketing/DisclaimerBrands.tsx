import { cn } from "@/lib/utils";

export interface DisclaimerBrandsProps {
  className?: string;
  compact?: boolean;
}

/**
 * Texto legal fixo sobre independência de marca. Não alterar o conteúdo
 * sem revisão jurídica — protege o produto de alegações de associação
 * indevida com WhatsApp LLC / Meta Platforms, Inc.
 */
export function DisclaimerBrands({ className, compact = false }: DisclaimerBrandsProps) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-white/50",
        compact && "max-w-2xl",
        className
      )}
    >
      BalcãoIA é uma ferramenta educacional e de produtividade independente,
      criada para ajudar negócios locais a organizar e melhorar seu próprio
      atendimento. Não somos afiliados, associados, autorizados, patrocinados
      ou endossados por, nem de qualquer outra forma oficialmente conectados
      com o WhatsApp LLC, a Meta Platforms, Inc., ou qualquer uma de suas
      subsidiárias ou afiliadas. Os nomes oficiais WhatsApp, Meta e demais
      marcas relacionadas, assim como seus respectivos logotipos, são marcas
      registradas de seus respectivos proprietários. O uso desses nomes é
      feito apenas para fins de referência e identificação do contexto de
      uso do produto, e não implica qualquer tipo de parceria, endosso ou
      relação comercial oficial.
    </p>
  );
}
