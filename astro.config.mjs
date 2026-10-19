// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// 网站在 https://marlin-md.cn：国内线路解析到阿里云服务器，境外线路解析到 GitHub Pages（public/CNAME），两处是同一份构建。
// 要部署到别处时构建前设 SITE_URL、BASE_PATH，例如 SITE_URL=https://marlin-md.github.io BASE_PATH=/marlin-website pnpm build
// （站内路径都经 src/lib/url.ts 拼；canonical、站点地图、robots.txt、llms.txt 都跟着 site 走）
export default defineConfig({
  site: process.env.SITE_URL || 'https://marlin-md.cn',
  base: process.env.BASE_PATH || '/',
  integrations: [vue()],
  trailingSlash: 'ignore'
})
