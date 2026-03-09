import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename, dirname } from "path";
import { pathToFileURL } from "url";
import { type Canvas, type SKRSContext2D, createCanvas } from "@napi-rs/canvas";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

GlobalWorkerOptions.workerSrc = pathToFileURL(
  join(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs")
).href;

const STANDARD_FONTS_URL = pathToFileURL(
  join(process.cwd(), "node_modules/pdfjs-dist/standard_fonts/")
).href;

const certsDir = join(process.cwd(), "src/assets/certifications");
const DPI_SCALE = 150 / 72;

interface ICanvasAndContext {
  canvas: Canvas;
  context: SKRSContext2D;
}

interface IConversionResult {
  pdf: string;
  jpg: string;
}

class NodeCanvasFactory {
  create(w: number, h: number): ICanvasAndContext {
    const canvas = createCanvas(w, h);
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(cc: ICanvasAndContext, w: number, h: number): void {
    cc.canvas.width = w;
    cc.canvas.height = h;
  }
  destroy(cc: ICanvasAndContext): void {
    cc.canvas.width = 0;
    cc.canvas.height = 0;
  }
}

function findPdfsWithoutJpg(dir: string): string[] {
  const pdfs: string[] = [];
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      pdfs.push(...findPdfsWithoutJpg(fullPath));
    } else if (extname(file).toLowerCase() === ".pdf") {
      const jpgPath = join(dir, `${basename(file, ".pdf")}.jpg`);
      if (!existsSync(jpgPath)) pdfs.push(fullPath);
    }
  }
  return pdfs;
}

async function convertPdfToJpg(pdfPath: string): Promise<IConversionResult> {
  const factory = new NodeCanvasFactory();
  const data = new Uint8Array(readFileSync(pdfPath));
  const pdf = await getDocument({
    data,
    standardFontDataUrl: STANDARD_FONTS_URL,
    CanvasFactory: NodeCanvasFactory,
  }).promise;

  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: DPI_SCALE });
  const { canvas, context } = factory.create(viewport.width, viewport.height);

  await page.render({
    canvas: canvas as unknown as HTMLCanvasElement,
    canvasContext: context as unknown as CanvasRenderingContext2D,
    viewport,
  }).promise;

  const jpgPath = join(dirname(pdfPath), `${basename(pdfPath, ".pdf")}.jpg`);
  writeFileSync(jpgPath, canvas.toBuffer("image/jpeg", 90));
  factory.destroy({ canvas, context });

  return { pdf: pdfPath, jpg: jpgPath };
}

console.log("Scanning for PDFs without JPG counterparts...");

try {
  const pdfs = findPdfsWithoutJpg(certsDir);

  if (pdfs.length === 0) {
    console.log("No PDFs need conversion.");
    process.exit(0);
  }

  console.log(`Found ${pdfs.length} PDF(s) to convert:`);

  for (const pdf of pdfs) {
    console.log(`  Converting: ${pdf}`);
    const result = await convertPdfToJpg(pdf);
    console.log(`  Created: ${result.jpg}`);
  }

  console.log("PDF conversion complete!");
} catch (error) {
  console.error("Error during PDF conversion:", error);
  process.exit(1);
}
