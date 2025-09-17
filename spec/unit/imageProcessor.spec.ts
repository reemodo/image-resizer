import { resizeImage } from '../../src/utils/imageProcessor';
import fs from 'fs';
import path from 'path';

describe('resizeImage utility', () => {
  const src = path.join(process.cwd(), 'images', 'full', 'fjord.jpg');

  beforeAll(() => {
    if (!fs.existsSync(src)) {
      fail('Add images/full/fjord.jpg before running unit tests.');
    }
  });

  it('creates a resized image with valid inputs', async () => {
    const resultPath = await resizeImage('fjord.jpg', 150, 150);
    expect(resultPath).toBeDefined();
    expect(fs.existsSync(resultPath)).toBeTrue();
  });

  it('throws on invalid width/height', async () => {
    await expectAsync(resizeImage('fjord.jpg', -10, 100)).toBeRejectedWithError('Invalid width');
  });

  it('throws when source not found', async () => {
    await expectAsync(resizeImage('nope.jpg', 100, 100)).toBeRejectedWithError('Source image not found');
  });
});
