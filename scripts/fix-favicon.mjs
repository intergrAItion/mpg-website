import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const input = path.join(__dirname, '../public/favicon-no-bg.png')
const output = path.join(__dirname, '../public/favicon-no-bg.png')

const metadata = await sharp(input).metadata()
const size = Math.max(metadata.width, metadata.height)

await sharp(input)
  .resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .resize(180, 180, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .png()
  .toFile(output + '.tmp.png')

import { renameSync } from 'fs'
renameSync(output + '.tmp.png', output)
console.log('Favicon fixed: 180x180px square')
