import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  if (!filename) throw new Error('Missing filename');
  if (!Number.isInteger(width) || width <= 0) throw new Error('Invalid width');
  if (!Number.isInteger(height) || height <= 0) throw new Error('Invalid height');

  const fullDir = path.join(process.cwd(), 'images', 'full');
  const thumbDir = path.join(process.cwd(), 'images', 'thumb');

  await fs.mkdir(thumbDir, { recursive: true });

  const ext = path.extname(filename) || '.jpg';
  const base = path.basename(filename, ext);
  const thumbFilename = `${base}_${width}x${height}${ext}`;

  const fullPath = path.join(fullDir, filename);
  const thumbPath = path.join(thumbDir, thumbFilename);

  // if cached
  try {
    await fs.access(thumbPath);
    return thumbPath;
  } catch {
    // continue to create
  }

  // ensure source exists
  try {
    await fs.access(fullPath);
  } catch {
    throw new Error('Source image not found');
  }

  await sharp(fullPath).resize(width, height).toFile(thumbPath);

  return thumbPath;
}
