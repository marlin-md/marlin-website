// 使用指南的目录：从指南首页（src/content/guide/README.md）的分组和链接读出来，
// 侧栏、上一章 / 下一章都按它排，不另外维护一份。
import readme from '../content/guide/README.md?raw'

export interface Chapter {
  /** 文件名去掉 .md，也是网址里的那一段：/guide/12-folders/ */
  slug: string
  title: string
  /** 「：」后面那句说明 */
  blurb: string
}

export interface Part {
  name: string
  chapters: Chapter[]
}

export const parts: Part[] = []
for (const line of readme.split(/\r?\n/)) {
  const h = /^##\s+(.+)$/.exec(line)
  if (h) {
    parts.push({ name: h[1].trim(), chapters: [] })
    continue
  }
  // 拷进网站时链接已换成 ./12-folders/（scripts/guide-markdown.mjs）
  const m = /^\s*(?:\d+\.|-)\s+\[([^\]]+)\]\(\.\/([^)#/]+)\/\)(?:：(.*))?$/.exec(line)
  if (m && parts.length) parts[parts.length - 1].chapters.push({ title: m[1], slug: m[2], blurb: m[3]?.trim() ?? '' })
}

export const chapters: Chapter[] = parts.flatMap((p) => p.chapters)
