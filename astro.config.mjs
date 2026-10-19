// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// 默认部署在 GitHub Pages：https://marlin-md.github.io/marlin-website/。
// 部署到自己的域名时构建前设 SITE_URL、BASE_PATH，例如 SITE_URL=https://marlin-md.cn BASE_PATH=/ pnpm build
// （站内路径都经 src/lib/url.ts 拼；canonical、站点地图、robots.txt、llms.txt 都跟着 site 走）
export default defineConfig({
  site: process.env.SITE_URL || 'https://marlin-md.github.io',
  base: process.env.BASE_PATH || '/marlin-website',
  integrations: [vue()],
  trailingSlash: 'ignore'
})
