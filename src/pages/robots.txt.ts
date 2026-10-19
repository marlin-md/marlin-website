// robots.txt 只在域名根目录生效：部署在 GitHub Pages 子路径下时这份不起作用，换成自己的域名后才生效
import type { APIRoute } from 'astro'
import { absUrl } from '../lib/url'

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absUrl('/sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
