import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições de uso do BalcãoIA Local, incluindo limites de responsabilidade e regras de uso do produto.",
};

export default function TermosDeUsoPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-[var(--brand-graphite)] sm:text-4xl">
        Termos de Uso
      </h1>
      <p>Última atualização: 27 de julho de 2026.</p>

      <p>
        Ao acessar ou utilizar o site e a plataforma <strong>BalcãoIA Local</strong>{" "}
        (&quot;Serviço&quot;), você concorda com os termos e condições
        descritos abaixo. Se você não concorda com algum destes termos, não
        utilize o Serviço.
      </p>

      <h2>1. O que é o BalcãoIA</h2>
      <p>
        O BalcãoIA é uma ferramenta educacional e de produtividade que ajuda
        donos de negócios locais a <strong>organizar</strong> o próprio
        atendimento ao cliente, por meio de diagnósticos, roteiros, checklists
        e materiais gerados a partir das informações fornecidas pelo usuário.
      </p>
      <p>
        O BalcãoIA <strong>não é um serviço de automação não oficial de
        contas de WhatsApp</strong> ou de qualquer outra plataforma de
        mensagens, e não envia mensagens em nome do usuário para seus
        clientes finais. Os materiais gerados devem ser utilizados
        manualmente pelo próprio usuário ou por sua equipe.
      </p>

      <h2>2. Cadastro e elegibilidade</h2>
      <p>
        Para utilizar determinadas funcionalidades, pode ser necessário
        fornecer informações verdadeiras, completas e atualizadas. Você é
        responsável por manter a confidencialidade de eventuais credenciais
        de acesso.
      </p>

      <h2>3. Uso permitido</h2>
      <p>Ao usar o Serviço, você concorda em não:</p>
      <ul>
        <li>Utilizar o Serviço para fins ilegais ou não autorizados;</li>
        <li>Enviar spam ou mensagens não solicitadas usando os materiais gerados;</li>
        <li>
          Utilizar os materiais para automação não oficial, scraping ou uso
          indevido de plataformas de terceiros (como WhatsApp ou Instagram),
          em violação aos termos dessas plataformas;
        </li>
        <li>Tentar copiar, revender ou distribuir o Serviço sem autorização;</li>
        <li>Tentar acessar áreas restritas do sistema sem autorização.</li>
      </ul>

      <h2>4. Pagamentos e reembolso</h2>
      <p>
        Os valores e condições de pagamento vigentes são exibidos na página de
        vendas no momento da compra. Quando aplicável, oferecemos garantia de
        reembolso conforme informado na oferta, mediante solicitação por
        e-mail dentro do prazo estipulado.
      </p>

      <h2>5. Resultados e responsabilidade</h2>
      <p>
        O BalcãoIA fornece ferramentas e materiais de apoio, mas{" "}
        <strong>não garante resultados específicos de vendas ou faturamento</strong>,
        já que estes dependem de fatores fora do nosso controle, como
        execução, mercado e características individuais de cada negócio. O
        Serviço é fornecido &quot;como está&quot;, sem garantias de qualquer
        tipo além das previstas em lei.
      </p>

      <h2>6. Propriedade intelectual</h2>
      <p>
        Todo o conteúdo do site, marca, logotipo e materiais educacionais são
        de propriedade do BalcãoIA ou de seus licenciantes, sendo protegidos
        pela legislação de direitos autorais e propriedade industrial
        aplicável. Os materiais personalizados gerados a partir dos dados do
        seu negócio são de uso do usuário para os fins previstos nestes
        termos.
      </p>

      <h2>7. Independência de marcas de terceiros</h2>
      <p>
        O BalcãoIA não é afiliado, associado ou endossado pelo WhatsApp LLC ou
        pela Meta Platforms, Inc. Consulte nossa página de{" "}
        <a href="/disclaimer" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
          Disclaimer de Marcas
        </a>{" "}
        para mais detalhes.
      </p>

      <h2>8. Cancelamento e término</h2>
      <p>
        Você pode deixar de utilizar o Serviço e solicitar o cancelamento das
        comunicações a qualquer momento, sem burocracia, conforme descrito em
        nossa{" "}
        <a href="/politica-de-privacidade" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
          Política de Privacidade
        </a>
        .
      </p>

      <h2>9. Alterações destes termos</h2>
      <p>
        Podemos atualizar estes Termos de Uso periodicamente. O uso continuado
        do Serviço após alterações constitui aceitação dos novos termos.
      </p>

      <h2>10. Legislação aplicável</h2>
      <p>
        Estes Termos são regidos pelas leis da República Federativa do
        Brasil. Fica eleito o foro do domicílio do usuário para dirimir
        eventuais controvérsias, salvo disposição legal em contrário.
      </p>

      <h2>11. Contato</h2>
      <p>
        Dúvidas sobre estes Termos podem ser enviadas para{" "}
        <a href="mailto:contato@balcaoialocal.com.br" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
          contato@balcaoialocal.com.br
        </a>
        .
      </p>
    </>
  );
}
