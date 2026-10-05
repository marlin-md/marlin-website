// 构建时从更新日志取最新版本号与日期（只在 .astro 里用，避免把整份日志打进前端脚本）
import changelog from '../content/changelog.md?raw'

export interface Release {
  version: string
  date: string
  summary: string
}

function parseLatest(text: string): Release {
  const m = text.match(/^## (\d+\.\d+\.\d+) — (\d{4}-\d{2}-\d{2})\s*\n+([^\n#][^\n]*)/m)
  if (!m) throw new Error('changelog.md 里找不到「## x.y.z — YYYY-MM-DD」格式的版本标题')
  return { version: m[1], date: m[2], summary: m[3].trim() }
}

export const latest = parseLatest(changelog)
