import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  const base = SITE.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/api/", "/admin"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
