// 从使用指南「常见问题」页的 Markdown 抽出问答，供该页 FAQPage 结构化数据使用。
// 取该页实际展示的条目，不和首页 faq.ts 混用。
import type { Faq } from './faq'

/** 把指南问答里的 Markdown / HTML 收成纯文本（JSON-LD 用）。 */
export function mdToPlain(s: string): string {
  let t = s
  t = t.replace(/<kbd>([\s\S]*?)<\/kbd>/gi, '$1')
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  t = t.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
  t = t.replace(/`([^`]+)`/g, '$1')
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1')
  t = t.replace(/<[^>]+>/g, '')
  t = t.replace(/&nbsp;/g, ' ')
  t = t.replace(/&amp;/g, '&')
  t = t.replace(/&lt;/g, '<')
  t = t.replace(/&gt;/g, '>')
  t = t.replace(/&quot;/g, '"')
  t = t.replace(/[ \t]+\n/g, '\n')
  t = t.replace(/\n{3,}/g, '\n\n')
  return t.trim()
}

/** 解析 26-faq.md：`##` 是分组，`**问题**` 是问题，随后到下一问或下一分组是答案。 */
export function parseGuideFaqs(md: string): Faq[] {
  const body = md.replace(/^<!--[\s\S]*?-->\s*/, '')
  const lines = body.split(/\r?\n/)
  const items: Faq[] = []
  let q: string | null = null
  let buf: string[] = []
  const flush = () => {
    if (q != null) {
      const a = mdToPlain(buf.join('\n'))
      if (a) items.push({ q, a })
    }
    q = null
    buf = []
  }
  const qRe = /^\*\*(.+)\*\*\s*$/
  for (const line of lines) {
    if (/^#+\s/.test(line)) {
      if (q != null) flush()
      continue
    }
    const m = qRe.exec(line)
    if (m) {
      flush()
      q = mdToPlain(m[1])
      continue
    }
    if (q != null) buf.push(line)
  }
  flush()
  return items
}

export function faqPageJsonLd(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }
}
