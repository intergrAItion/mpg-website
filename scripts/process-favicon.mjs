import sharp from '../node_modules/sharp/lib/index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, '..', 'public', 'favicon.jpeg');
const outPath = path.join(__dirname, '..', 'public', 'favicon.png');

const meta = await sharp(srcPath).metadata();
const { width, height } = meta;

// Crop a centred square — image is 1254x627, so square side = height (627)
const squareSize = Math.min(width, height);
const left = Math.floor((width - squareSize) / 2);
const top = Math.floor((height - squareSize) / 2);

await sharp(srcPath)
  .extract({ left, top, width: squareSize, height: squareSize })
  .resize(64, 64, { fit: 'cover', position: 'centre' })
  .png()
  .toFile(outPath);

console.log(`favicon.png written: centred ${squareSize}x${squareSize} crop resized to 64x64`);
