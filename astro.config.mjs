// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// 现在部署在 GitHub Pages：https://marlin-md.github.io/marlin-website/。
// 换成自己的域名后改 site、去掉 base（站内路径都经 src/lib/url.ts 拼），并加上 @astrojs/sitemap
export default defineConfig({
  site: 'https://marlin-md.github.io',
  base: '/marlin-website',
  integrations: [vue()],
  trailingSlash: 'ignore'
})
