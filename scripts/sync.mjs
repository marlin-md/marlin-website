// 从 Marlin 主仓库同步网站要用的内容：更新日志、使用指南、品牌图。
// 截图不在这里：src/assets/shots 由 promo-video/scripts/capture 从测试版截取。
// 用法：
//   pnpm sync <主仓库本地路径>     从本地克隆拷贝（推荐，私有仓库也能用）
//   MARLIN_REPO=<路径> pnpm sync
//   pnpm sync                        从 GitHub 公开仓库的 main 分支下载（使用指南不行，要本地路径）
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { guidePage } from './guide-markdown.mjs'

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const local = process.argv[2] ?? process.env.MARLIN_REPO
const RAW = 'https://raw.githubusercontent.com/marlin-md/marlin/main/'

// 需要加工的图：品牌图缩到网页用得到的尺寸
const derived = [
  { from: 'brand/mark-flat.png', width: 120, to: 'public/brand/mark.png' },
  { from: 'brand/app-icon.png', width: 64, to: 'public/favicon.png' },
  { from: 'brand/app-icon.png', width: 180, to: 'public/apple-touch-icon.png' }
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

// 使用指南：主仓库 guide/ 的 .md 加工后（链接、提示框、按键，见 guide-markdown.mjs）放进 src/content/guide，
// 图拷到 public/guide/images。只能从本地克隆拷：要列出目录里的文件
async function syncGuide() {
  if (!local) throw new Error('同步使用指南要传主仓库的本地路径：pnpm sync <路径>')
  const from = join(local, 'guide')
  const pages = join(site, 'src/content/guide')
  const images = join(site, 'public/guide/images')
  await rm(pages, { recursive: true, force: true })
  await rm(images, { recursive: true, force: true })
  await mkdir(pages, { recursive: true })
  await mkdir(images, { recursive: true })
  const md = (await readdir(from)).filter((f) => f.endsWith('.md'))
  const note = '<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->\n\n'
  for (const f of md) await writeFile(join(pages, f), note + guidePage((await readFile(join(from, f), 'utf8')).replace(/^<!--[\s\S]*?-->\s*/, ''), f === 'README.md'))
  const pics = await readdir(join(from, 'images'))
  for (const f of pics) await copyFile(join(from, 'images', f), join(images, f))
  return { pages: md.length, images: pics.length }
}

async function syncDerived() {
  for (const { from, width, to } of derived) {
    const dest = join(site, to)
    await mkdir(dirname(dest), { recursive: true })
    await sharp(await fetchFile(from)).resize({ width }).png({ compressionLevel: 9 }).toFile(dest)
  }
}

await syncChangelog()
const guide = await syncGuide()
await syncDerived()
console.log(`已同步：changelog.md、使用指南 ${guide.pages} 页 ${guide.images} 张图、${derived.length} 张品牌图（来源：${local ?? 'GitHub'}）`)
