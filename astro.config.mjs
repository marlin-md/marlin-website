// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// 域名确定后填 site，并加上 @astrojs/sitemap
export default defineConfig({
  integrations: [vue()],
  trailingSlash: 'ignore'
})
