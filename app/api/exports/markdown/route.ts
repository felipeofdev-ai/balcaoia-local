import { NextResponse } from "next/server";
import { buildMarkdownPackage, slugifyFilename, type ExportAsset } from "@/lib/utils/markdown-export";

export const runtime = "nodejs";

interface ExportMarkdownBody {
  businessName?: string;
  assets?: ExportAsset[];
  disclaimer?: string;
}

export async function POST(request: Request) {
  let body: ExportMarkdownBody;
  try {
    body = (await request.json()) as ExportMarkdownBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { businessName, assets, disclaimer } = body;

  if (!businessName || !assets || !assets.length) {
    return NextResponse.json(
      { error: "businessName e assets (lista não vazia) são obrigatórios." },
      { status: 400 }
    );
  }

  const markdown = buildMarkdownPackage(businessName, assets, disclaimer);
  const filename = `${slugifyFilename(businessName)}.md`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
