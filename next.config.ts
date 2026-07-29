import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/produtos/j1-prompts-whatsapp", destination: "/produtos/10-prompts-whatsapp-vendem", permanent: true },
      { source: "/produtos/a1-whatsapp-etico", destination: "/produtos/whatsapp-etico-negocios", permanent: true },
      { source: "/produtos/a2-balcaoia-pro", destination: "/produtos/checklist-atendimento-local", permanent: true },
      { source: "/produtos/b1-foco-14", destination: "/produtos/foco-14", permanent: true },
      { source: "/produtos/c2-chatgpt-empreendedores", destination: "/produtos/chatgpt-empreendedores", permanent: true },
      { source: "/produtos/d1-instagram-negocios-ia", destination: "/produtos/instagram-negocios-locais-ia", permanent: true },
      { source: "/produtos/d3-google-meu-negocio", destination: "/produtos/google-meu-negocio-masterclass", permanent: true },
      { source: "/produtos/whatsapp-etico", destination: "/produtos/whatsapp-etico-negocios", permanent: false },
      { source: "/produtos/balcaoia-pro", destination: "/produtos/checklist-atendimento-local", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
