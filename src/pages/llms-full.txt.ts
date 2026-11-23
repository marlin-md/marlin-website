// llms-full.txt：构建时按指南目录顺序拼接各章源文件全文（https://llmstxt.org）
import type { APIRoute } from 'astro'
import { chapters } from '../lib/guide'
import { absUrl } from '../lib/url'

const files = import.meta.glob('../content/guide/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

function rawFor(slug: string): string {
  const entry = Object.entries(files).find(([path]) => path.endsWith(`/${slug}.md`))
  if (!entry) throw new Error(`llms-full.txt：找不到指南源文件 ${slug}.md`)
  return entry[1]
}

/** 去掉同步注释，图片 HTML 改成带 alt 的 Markdown，并在章标题下加上线上页面链接。 */
function chapterText(slug: string, raw: string): string {
  let body = raw.replace(/^<!--[\s\S]*?-->\s*/, '').trim()
  body = body.replace(/<a class="shot"[^>]*>\s*<img\b[^>]*?\balt="([^"]*)"[^>]*>\s*<\/a>/g, '![$1]')
  body = body.replace(/<img\b[^>]*?\balt="([^"]*)"[^>]*>/g, '![$1]')
  const pageUrl = absUrl(`/guide/${slug}/`)
  if (/^# /m.test(body)) {
    body = body.replace(/^# .+$/m, (heading) => `${heading}\n\n页面：${pageUrl}`)
  } else {
    body = `页面：${pageUrl}\n\n${body}`
  }
  return body
}

const text = `# Marlin 墨鳞 · 完整使用指南

以下各章按官网使用指南的章节顺序排列，正文取自各章源文件。

${chapters.map((c) => chapterText(c.slug, rawFor(c.slug))).join('\n\n---\n\n')}
`

export const GET: APIRoute = () =>
  new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
