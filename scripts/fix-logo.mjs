import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { renameSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const input = path.join(__dirname, '../public/logo-no-bg.png')
const tmp = input + '.tmp.png'

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const pixels = new Uint8ClampedArray(data)

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i]
  const g = pixels[i + 1]
  const b = pixels[i + 2]
  const a = pixels[i + 3]

  // Force light/white pixels to fully opaque white
  if (r > 180 && g > 180 && b > 180 && a < 220) {
    pixels[i] = 255
    pixels[i + 1] = 255
    pixels[i + 2] = 255
    pixels[i + 3] = 255
  }

  // Force gold pixels to fully opaque
  if (r > 150 && g > 100 && b < 100 && a < 220) {
    pixels[i + 3] = 255
  }
}

await sharp(Buffer.from(pixels), {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4
  }
})
.png()
.toFile(tmp)

renameSync(tmp, input)
console.log('Logo text opacity fixed successfully')
