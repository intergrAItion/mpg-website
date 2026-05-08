import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const input = path.join(__dirname, '../public/logo-no-bg.png')
const output = path.join(__dirname, '../public/favicon-no-bg.png')

// First read and log actual dimensions
const metadata = await sharp(input).metadata()
console.log('Logo dimensions:', metadata.width, 'x', metadata.height)

const width = metadata.width
const height = metadata.height

// Crop tightly to bird and nest icon only
// The icon occupies approximately the left 32% of the logo width
// Centre it vertically with a small margin
const cropWidth = Math.floor(width * 0.32)
const cropHeight = Math.min(cropWidth, height)
const cropTop = Math.floor((height - cropHeight) / 2)

console.log('Crop area:', cropWidth, 'x', cropHeight, 'from top:', cropTop)

await sharp(input)
  .extract({
    left: 0,
    top: cropTop,
    width: cropWidth,
    height: cropHeight
  })
  .resize(180, 180, {
    fit: 'contain',
    background: {
      r: 255, g: 255, b: 255, alpha: 1
    }
  })
  .png()
  .toFile(output)

console.log('Favicon saved to:', output)
