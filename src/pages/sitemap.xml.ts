// 站点地图：页面少，直接列出；首页和下载页的更新时间取最新版本的发布日期
import type { APIRoute } from 'astro'
import { latest } from '../lib/latest'
import { absUrl } from '../lib/url'

const pages = ['/', '/download/', '/changelog/']

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${absUrl(p)}</loc><lastmod>${latest.date}</lastmod></url>`).join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  )
