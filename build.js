import { mkdir, copyFile, rm } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const files = ['index.html', 'style.css', 'app.js', 'data.json']

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })

for (const file of files) {
  await copyFile(join(root, file), join(dist, file))
}

console.log(`Built ${files.length} files into dist/`)
