// 下载相关的常量与链接拼接。安装包命名与主仓库 README 保持一致。
// 源码仓库不公开；安装包和更新清单在公开的发布仓库里。
export const REPO = 'marlin-md/marlin-releases'
export const REPO_URL = `https://github.com/${REPO}`
export const RELEASES_URL = `${REPO_URL}/releases`

export interface Asset {
  name: string
  url: string
  /** 字节数；构建时拿不到，运行时从 GitHub API 取到才有 */
  size?: number
}

export interface Downloads {
  version: string
  /** 发布日期 YYYY-MM-DD；构建时来自更新日志，运行时来自 GitHub */
  date?: string
  setup: Asset
  portable: Asset
}

export function downloadsFor(version: string, date?: string): Downloads {
  const base = `${RELEASES_URL}/download/v${version}`
  const setup = `Marlin_${version}_x64-setup.exe`
  const portable = `Marlin_${version}_x64-portable.zip`
  return {
    version,
    date,
    setup: { name: setup, url: `${base}/${setup}` },
    portable: { name: portable, url: `${base}/${portable}` }
  }
}

interface GhRelease {
  tag_name: string
  published_at: string
  assets: { name: string; size: number; browser_download_url: string }[]
}

/** 从 GitHub 取最新正式版；网站发布落后于 App 发版时以它为准。失败返回 null。 */
export async function fetchLatest(): Promise<Downloads | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) return null
    const rel = (await res.json()) as GhRelease
    const pick = (suffix: string): Asset | undefined => {
      const a = rel.assets.find((x) => x.name.endsWith(suffix))
      return a && { name: a.name, url: a.browser_download_url, size: a.size }
    }
    const setup = pick('_x64-setup.exe')
    const portable = pick('_x64-portable.zip')
    if (!setup || !portable) return null
    return { version: rel.tag_name.replace(/^v/, ''), date: rel.published_at.slice(0, 10), setup, portable }
  } catch {
    return null
  }
}

/**
 * 历次版本安装版与便携版的下载次数之和（GitHub 统计，含自动更新下的安装包）。失败返回 null。
 * 首屏和页尾各有一个下载入口，共用一次请求。
 */
let downloadCount: Promise<number | null> | undefined
export function fetchDownloadCount(): Promise<number | null> {
  downloadCount ??= (async () => {
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, {
        headers: { Accept: 'application/vnd.github+json' }
      })
      if (!res.ok) return null
      const rels = (await res.json()) as { assets: { name: string; download_count: number }[] }[]
      return rels
        .flatMap((r) => r.assets)
        .filter((a) => /\.(exe|zip)$/.test(a.name))
        .reduce((n, a) => n + a.download_count, 0)
    } catch {
      return null
    }
  })()
  return downloadCount
}

export function formatSize(bytes?: number): string {
  return bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : ''
}
