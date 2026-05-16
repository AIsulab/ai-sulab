import { mkdir, copyFile, cp, rm } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const files = ['index.html', 'library.html', 'landing.css', 'style.css', 'app.js', 'data.json']

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })

for (const file of files) {
  await copyFile(join(root, file), join(dist, file))
}

await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true })
// 블로그 파일들도 빌드(배포) 폴더로 복사
try {
  await cp(join(root, 'blog'), join(dist, 'blog'), { recursive: true })
} catch (e) {
  console.log('blog 폴더가 아직 없습니다.');
}

console.log(`Built ${files.length} files into dist/`)
