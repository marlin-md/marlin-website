// 站内路径都从这里拼：网站部署在 GitHub Pages 的 /marlin-website/ 下，
// 以后换成自己的域名时只改 astro.config.mjs 的 site 和 base。
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** 站内路径（以 / 开头）加上部署的前缀。 */
export const url = (p: string) => BASE + p
