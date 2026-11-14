// 构建时从 GitHub Releases 读取最新安装包大小和版本号。
// 只在 .astro / 服务端端点里引用，不要从 Vue 等客户端代码导入，以免把 GITHUB_TOKEN 打进前端包。
import { REPO } from './release'

const API_BASE = process.env.MARLIN_GITHUB_API_BASE || 'https://api.github.com'

export interface ReleaseMeta {
  version: string
  /** 十进制 MB，一位小数，例如 "7.1 MB" */
  fileSize: string
  setupBytes: number
}

interface GhRelease {
  tag_name: string
  assets: { name: string; size: number }[]
}

/** 十进制 MB，保留一位小数。7,119,827 字节 → "7.1 MB"。 */
export function formatFileSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`
}

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

let cached: Promise<ReleaseMeta | null> | undefined

/**
 * 构建时调用一次 GitHub API，取 marlin-releases 最新正式版里安装包（*_x64-setup.exe）的大小和版本。
 * 失败时返回 null 并打警告，不让构建失败。
 * 可用 MARLIN_GITHUB_API_BASE 覆盖 API 根地址（仅用于离线/失败路径测试）。
 */
export function getReleaseMeta(): Promise<ReleaseMeta | null> {
  cached ??= (async () => {
    try {
      const res = await fetch(`${API_BASE}/repos/${REPO}/releases/latest`, {
        headers: ghHeaders()
      })
      if (!res.ok) {
        console.warn(`getReleaseMeta: GitHub API ${res.status} ${res.statusText}`)
        return null
      }
      const rel = (await res.json()) as GhRelease
      const setup = rel.assets.find((a) => a.name.endsWith('_x64-setup.exe'))
      if (!setup) {
        console.warn('getReleaseMeta: 最新 Release 里没有安装包（*_x64-setup.exe）')
        return null
      }
      return {
        version: rel.tag_name.replace(/^v/, ''),
        fileSize: formatFileSize(setup.size),
        setupBytes: setup.size
      }
    } catch (err) {
      console.warn('getReleaseMeta: 读取最新 Release 失败', err)
      return null
    }
  })()
  return cached
}
