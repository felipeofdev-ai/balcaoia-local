import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o BalcãoIA coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-[var(--brand-graphite)] sm:text-4xl">
        Política de Privacidade
      </h1>
      <p>Última atualização: 27 de julho de 2026.</p>

      <p>
        Esta Política de Privacidade descreve como o <strong>BalcãoIA</strong>{" "}
        (&quot;nós&quot;) coleta, usa, armazena e protege os dados pessoais dos
        visitantes e usuários (&quot;você&quot;) do site e da plataforma
        BalcãoIA Local, em conformidade com a Lei Geral de Proteção de Dados
        Pessoais (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>1. Quais dados coletamos</h2>
      <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
      <ul>
        <li>Nome completo;</li>
        <li>E-mail;</li>
        <li>Telefone/WhatsApp (opcional);</li>
        <li>Segmento e tipo de perfil do seu negócio (opcional);</li>
        <li>
          Respostas fornecidas em checklists e diagnósticos preenchidos
          voluntariamente;
        </li>
        <li>
          Dados técnicos de navegação (como origem do acesso e parâmetros de
          campanha), coletados de forma agregada para melhorar o produto.
        </li>
      </ul>

      <h2>2. Base legal e finalidade do tratamento</h2>
      <p>
        Tratamos seus dados com base no seu <strong>consentimento explícito</strong>,
        fornecido no momento do cadastro em nossos formulários, para as
        seguintes finalidades:
      </p>
      <ul>
        <li>Enviar o material solicitado (diagnóstico, checklist, materiais educativos);</li>
        <li>Entrar em contato por e-mail ou WhatsApp com informações sobre o BalcãoIA;</li>
        <li>Personalizar recomendações de acordo com o segmento do seu negócio;</li>
        <li>Cumprir obrigações legais e regulatórias, quando aplicável.</li>
      </ul>
      <p>
        Nós <strong>não enviamos spam</strong> e não compartilhamos, vendemos
        ou alugamos seus dados pessoais para fins de marketing de terceiros.
      </p>

      <h2>3. Compartilhamento de dados</h2>
      <p>
        Seus dados podem ser processados por prestadores de serviço que nos
        auxiliam a operar a plataforma (por exemplo, provedores de e-mail
        transacional e de armazenamento em nuvem), sempre sob obrigações
        contratuais de confidencialidade e segurança. Não compartilhamos seus
        dados com o WhatsApp LLC, Meta Platforms, Inc. ou qualquer outra
        empresa para fins não relacionados à prestação do nosso serviço.
      </p>

      <h2>4. Armazenamento e segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais razoáveis para proteger
        seus dados contra acesso não autorizado, perda, alteração ou
        divulgação indevida. Os dados ficam armazenados em servidores seguros,
        pelo tempo necessário para cumprir as finalidades descritas nesta
        política ou conforme exigido por lei.
      </p>

      <h2>5. Seus direitos como titular de dados</h2>
      <p>De acordo com a LGPD, você tem direito a:</p>
      <ul>
        <li>Confirmar a existência de tratamento dos seus dados;</li>
        <li>Acessar, corrigir ou atualizar seus dados;</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
        <li>Solicitar a portabilidade dos seus dados;</li>
        <li>
          <strong>Revogar seu consentimento e optar por não receber mais
          comunicações (opt-out)</strong> a qualquer momento;
        </li>
        <li>Solicitar informações sobre o compartilhamento dos seus dados.</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, ou para deixar de receber
        nossas comunicações, basta enviar um e-mail para{" "}
        <a href="mailto:contato@balcaoialocal.com.br" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
          contato@balcaoialocal.com.br
        </a>{" "}
        com o assunto &quot;Privacidade&quot;. Atenderemos sua solicitação em
        prazo razoável, conforme previsto em lei.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Utilizamos cookies e tecnologias semelhantes estritamente necessárias
        para o funcionamento do site e para entender, de forma agregada, como
        os visitantes interagem com nossas páginas. Você pode desativar
        cookies nas configurações do seu navegador, embora isso possa afetar a
        experiência de uso.
      </p>

      <h2>7. Alterações a esta política</h2>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Sempre
        que houver mudanças relevantes, indicaremos a nova data de atualização
        no topo desta página.
      </p>

      <h2>8. Contato</h2>
      <p>
        Dúvidas sobre esta política ou sobre o tratamento dos seus dados podem
        ser enviadas para{" "}
        <a href="mailto:contato@balcaoialocal.com.br" className="font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
          contato@balcaoialocal.com.br
        </a>
        .
      </p>
    </>
  );
}
