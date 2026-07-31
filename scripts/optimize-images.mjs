import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(rootDir, 'src/content/posts');
const outDir = path.join(rootDir, 'public/images/posts');
const widths = [640, 1200, 1920];

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((file) => file.endsWith('.jpg'));

for (const file of files) {
  const slug = file.replace(/\.jpg$/, '');
  const srcPath = path.join(srcDir, file);
  for (const width of widths) {
    const outPath = path.join(outDir, `${slug}-${width}.webp`);
    await sharp(srcPath).resize(width).webp({ quality: 80 }).toFile(outPath);
  }
  console.log(`optimized ${slug}`);
}
