import { NextResponse } from "next/server";
import { z } from "zod";
import { generateFullEbook, ebookToMarkdown } from "@/lib/ebook-engine/generator";
import { TOP_NICHES_2026, getEbookBySlug } from "@/lib/market-research/trends";

export const runtime = "nodejs";
export const maxDuration = 60;

const schema = z.object({
  slug: z.string().optional(),
  nicheIndex: z.number().int().min(0).optional(),
  ebookIndex: z.number().int().min(0).default(0),
  authorName: z.string().default("BalcãoIA"),
  format: z.enum(["json", "markdown"]).default("json"),
  mode: z.enum(["outline", "full"]).default("outline"),
  maxChapters: z.number().int().min(1).max(12).optional(),
});

export async function GET() {
  return NextResponse.json({
    totalNiches: TOP_NICHES_2026.length,
    niches: TOP_NICHES_2026.map((n, i) => ({
      index: i,
      id: n.id,
      name: n.name,
      category: n.category,
      avgTicket: n.avgTicket,
      trendScore: n.trendScore,
      affiliateCommission: n.affiliateCommission,
      complianceNote: n.complianceNote,
      ebookIdeas: n.ebookIdeas.map((e, j) => ({
        index: j,
        slug: e.slug,
        title: e.title,
        subtitle: e.subtitle,
        price: e.price,
        alignedWithBalcaoia: Boolean(e.alignedWithBalcaoia),
      })),
    })),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const { slug, nicheIndex, ebookIndex, authorName, format, mode, maxChapters } = parsed.data;

  let idea = slug ? getEbookBySlug(slug) : null;
  let nicheName = idea?.nicheName ?? TOP_NICHES_2026[0]?.name ?? "Geral";

  if (!idea) {
    const niche = TOP_NICHES_2026[nicheIndex ?? 0] ?? TOP_NICHES_2026[0];
    const ebook = niche.ebookIdeas[ebookIndex] ?? niche.ebookIdeas[0];
    idea = { ...ebook, nicheName: niche.name, nicheId: niche.id };
    nicheName = niche.name;
  }

  try {
    const ebook = await generateFullEbook(idea, nicheName, {
      authorName,
      mode,
      maxChapters: mode === "full" ? maxChapters ?? 3 : maxChapters,
    });

    if (format === "markdown") {
      return new NextResponse(ebookToMarkdown(ebook), {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition": `attachment; filename="${ebook.slug}.md"`,
        },
      });
    }

    return NextResponse.json({ success: true, ebook, metadata: ebook.metadata });
  } catch (error) {
    console.error("[/api/ebooks/generate]", error);
    return NextResponse.json(
      { success: false, error: "Falha ao gerar ebook. Tente mode=outline." },
      { status: 500 }
    );
  }
}
