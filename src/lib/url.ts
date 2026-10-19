// 站内路径都从这里拼：默认部署在 GitHub Pages 的 /marlin-website/ 下，
// 换域名时构建前设 SITE_URL、BASE_PATH（见 astro.config.mjs）。
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** 站内路径（以 / 开头）加上部署的前缀。 */
export const url = (p: string) => BASE + p

/** 站内路径的完整地址（canonical、站点地图、结构化数据用）。 */
export const absUrl = (p: string) => new URL(url(p), import.meta.env.SITE).href
