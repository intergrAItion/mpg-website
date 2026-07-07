import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const logoPath = path.join(root, 'public', 'logo-green.png')
const outPath = path.join(root, 'public', 'og-card.png')

const WIDTH = 1200
const HEIGHT = 630
const LOGO_WIDTH = Math.round(WIDTH * 0.6) // 60% of canvas width

const meta = await sharp(logoPath).metadata()
console.log(`Source logo: ${meta.width}x${meta.height} (${meta.format})`)

// Resize logo to 60% of canvas width, height auto (fit inside preserves aspect ratio)
const logo = await sharp(logoPath)
  .resize({ width: LOGO_WIDTH, fit: 'inside' })
  .toBuffer()

// 1200x630 canvas filled with brand green, logo composited centred
await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: '#07341C',
  },
})
  .composite([{ input: logo, gravity: 'centre' }])
  .png()
  .toFile(outPath)

const out = await sharp(outPath).metadata()
console.log(`Wrote ${outPath}: ${out.width}x${out.height}`)
