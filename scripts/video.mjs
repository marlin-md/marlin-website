// 处理网站用的视频：转一份 1080p 给桌面、一份 720p 给手机，再截一帧做封面。
// 用法：pnpm video [视频路径] [--name 输出名] [--poster 秒]
// 默认取 ../promo-video/marlin-tour.mp4（在 promo-video 里用 pnpm render:tour 导出），
// 输出 public/video/marlin-tour-{1080,720}.mp4 与 -poster.webp
import { execFileSync } from 'node:child_process'
import { mkdir, rm } from 'node:fs/promises'
import { statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'
import sharp from 'sharp'

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args.splice(i, 2)[1] : def
}
const NAME = opt('name', 'marlin-tour')
// 封面默认取导览的目录页（第 15.5 秒，九个章节都在）：不自动播放的访客一眼知道视频讲什么
const POSTER_AT = opt('poster', '15.5')
const src = resolve(site, args[0] ?? '../promo-video/marlin-tour.mp4')
const out = join(site, 'public/video')

const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const mb = (f) => {
  const kb = statSync(f).size / 1024
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

await mkdir(out, { recursive: true })

// 桌面版：1080p，动画画面好压，CRF 22 足够清楚
const full = join(out, `${NAME}-1080.mp4`)
run([
  '-i', src,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-an', '-movflags', '+faststart',
  full
])

// 手机版：720p H.264，去掉音轨，moov 前置以便边下边播
const small = join(out, `${NAME}-720.mp4`)
run([
  '-i', src,
  '-vf', 'scale=1280:-2',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-an', '-movflags', '+faststart',
  small
])

const frame = join(out, '_poster.png')
run(['-ss', POSTER_AT, '-i', src, '-frames:v', '1', frame])
const poster = join(out, `${NAME}-poster.webp`)
await sharp(frame).resize({ width: 1280 }).webp({ quality: 82 }).toFile(poster)
await rm(frame)

console.log(`桌面版 ${mb(full)}，手机版 ${mb(small)}，封面 ${mb(poster)}`)
