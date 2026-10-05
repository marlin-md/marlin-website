// 从 Marlin 主仓库同步网站要用的内容：更新日志、截图、品牌图。
// 用法：
//   pnpm sync <主仓库本地路径>     从本地克隆拷贝（推荐，私有仓库也能用）
//   MARLIN_REPO=<路径> pnpm sync
//   pnpm sync                        从 GitHub 公开仓库的 main 分支下载
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const local = process.argv[2] ?? process.env.MARLIN_REPO
const RAW = 'https://raw.githubusercontent.com/marlin-md/marlin/main/'

// 主仓库路径 → 网站路径。截图放 src/assets，由 Astro 转成 WebP 并按屏宽输出
const assets = {
  'docs/images/reading.png': 'src/assets/screens/reading.png',
  'docs/images/editing.png': 'src/assets/screens/editing.png',
  'docs/images/mermaid.png': 'src/assets/screens/mermaid.png',
  'docs/images/search.png': 'src/assets/screens/search.png',
  'docs/images/settings.png': 'src/assets/screens/settings.png',
  'docs/images/start.png': 'src/assets/screens/start.png'
}

// 需要加工的图：品牌图缩到网页用得到的尺寸，截图按需裁剪
const derived = [
  { from: 'brand/mark-flat.png', width: 120, to: 'public/brand/mark.png' },
  { from: 'brand/app-icon.png', width: 64, to: 'public/favicon.png' },
  { from: 'brand/app-icon.png', width: 180, to: 'public/apple-touch-icon.png' },
  // 首页「打开文件夹」只看左边的文件树与搜索结果，裁出来放大才看得清
  { from: 'docs/images/search.png', crop: { left: 0, top: 0, width: 760, height: 540 }, to: 'src/assets/screens/search-crop.png' }
]

async function fetchFile(path) {
  if (local) return readFile(join(local, path))
  const res = await fetch(RAW + path)
  if (!res.ok) throw new Error(`下载 ${path} 失败：HTTP ${res.status}（仓库未公开时请传本地路径）`)
  return Buffer.from(await res.arrayBuffer())
}

async function syncChangelog() {
  const src = (await fetchFile('docs/CHANGELOG.md')).toString('utf8')
  // 去掉原文第一行「# 变更记录」，页面标题由网站自己给
  const body = src.replace(/^#\s+.*\r?\n/, '')
  const page = '<!-- 由 scripts/sync.mjs 从主仓库 docs/CHANGELOG.md 生成，不要手改 -->\n\n' + body.trimStart()
  await mkdir(join(site, 'src/content'), { recursive: true })
  await writeFile(join(site, 'src/content/changelog.md'), page)
}

async function syncAssets() {
  for (const [from, to] of Object.entries(assets)) {
    const dest = join(site, to)
    await mkdir(dirname(dest), { recursive: true })
    if (local && existsSync(join(local, from))) await copyFile(join(local, from), dest)
    else await writeFile(dest, await fetchFile(from))
  }
}

async function syncDerived() {
  for (const { from, width, crop, to } of derived) {
    const dest = join(site, to)
    await mkdir(dirname(dest), { recursive: true })
    let img = sharp(await fetchFile(from))
    if (crop) img = img.extract(crop)
    if (width) img = img.resize({ width })
    await img.png({ compressionLevel: 9 }).toFile(dest)
  }
}

await syncChangelog()
await syncAssets()
await syncDerived()
console.log(`已同步：changelog.md、${Object.keys(assets).length} 张截图、${derived.length} 张加工图（来源：${local ?? 'GitHub'}）`)
