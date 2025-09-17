import express from 'express';
import path from 'path';
import { resizeImage } from '../utils/imageProcessor';

const router = express.Router();

router.get('/', async (req, res) => {
  const filename = req.query.filename as string | undefined;
  const widthStr = req.query.width as string | undefined;
  const heightStr = req.query.height as string | undefined;

  if (!filename) return res.status(400).json({ error: 'Missing filename parameter' });
  if (!widthStr || !heightStr) return res.status(400).json({ error: 'Missing width or height' });

  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    return res.status(400).json({ error: 'Invalid width or height' });
  }

  try {
    const thumbPath = await resizeImage(filename, width, height);
    return res.sendFile(path.resolve(thumbPath));
  } catch (err: any) {
    if (err.message === 'Source image not found') {
      return res.status(404).json({ error: 'Source image not found' });
    }
    return res.status(400).json({ error: err.message || 'Failed to process image' });
  }
});

export default router;
