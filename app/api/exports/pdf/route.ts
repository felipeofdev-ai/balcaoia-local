import { NextResponse } from "next/server";
import { buildPdfPackage, type PdfExportAsset } from "@/lib/utils/pdf-export";
import { slugifyFilename } from "@/lib/utils/markdown-export";

export const runtime = "nodejs";

interface ExportPdfBody {
  businessName?: string;
  assets?: PdfExportAsset[];
}

export async function POST(request: Request) {
  let body: ExportPdfBody;
  try {
    body = (await request.json()) as ExportPdfBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { businessName, assets } = body;

  if (!businessName || !assets || !assets.length) {
    return NextResponse.json(
      { error: "businessName e assets (lista não vazia) são obrigatórios." },
      { status: 400 }
    );
  }

  const result = await buildPdfPackage(businessName, assets);

  if (!result.ok || !result.bytes) {
    return NextResponse.json(
      { ok: false, fallbackMessage: result.fallbackMessage },
      { status: 200 }
    );
  }

  const filename = `${slugifyFilename(businessName)}.pdf`;

  return new NextResponse(Buffer.from(result.bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
