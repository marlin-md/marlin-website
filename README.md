# Marlin 官网

Marlin（墨鳞）的产品网站，Astro 7 + Vue 组件（交互部分），纯静态输出。

## 开发

```bash
pnpm install
pnpm sync <主仓库本地路径>   # 同步更新日志、截图、品牌图；仓库公开后可省略路径，直接从 GitHub 拉
pnpm video [视频路径]         # 转出网站用的 1080p / 720p 与封面，默认取 ../promo-video/marlin-tour.mp4
pnpm dev                      # http://localhost:4321
pnpm build                    # 输出到 dist/
pnpm check                    # 类型检查
```

## 内容从哪来

| 网站里的 | 来源 | 更新方式 |
|---|---|---|
| 更新日志、最新版本号与日期 | 主仓库 `docs/CHANGELOG.md` | `pnpm sync` |
| 截图（含「打开文件夹」的裁剪图）、Logo、favicon | 主仓库 `docs/images/`、`brand/` | `pnpm sync`；截图由 Astro 转成 WebP |
| 下载链接 | 公开的发布仓库 `marlin-md/marlin-releases`（源码仓库不公开）：`Marlin_<版本>_x64-setup.exe` / `-portable.zip`，tag 为 `v<版本>` | 自动：构建时按版本号拼，打开页面时再查 GitHub 最新 Release |
| 速度标尺、完整实测数据、功能文案、路线图 | 主仓库 README 与 `docs/08-ROADMAP-2.md`，手工同步 | 改 `src/pages/index.astro`、`src/components/SpeedScale.astro` |
| 常见问题（同时生成 FAQPage 结构化数据） | 手写，事实以主仓库为准 | 改 `src/lib/faq.ts` |
| 主题演示色值 | 主仓库 `themes/*/theme.css` | 改 `src/components/ThemeShowcase.vue` |
| 分享卡片 `public/og.png` | 用网站样式排版后截图（1200×630） | 文案或截图大改时重新截 |
| 功能导览视频 `public/video/marlin-tour-*` | `promo-video/marlin-tour.mp4`（3 分 07 秒，9 章，无声；在 promo-video 里 `pnpm render:tour` 导出） | `pnpm video`：转出 1080p / 720p 与封面（第 15.5 秒的目录页）。导览时间轴变了要同步改 `src/lib/tour.ts` |

## 目录

```
src/
  pages/        index（首页）、download、changelog
  layouts/      Base.astro：顶栏、页脚、明暗切换
  components/   HeroWindow（可操作的窗口演示）、PromoVideo（宣传视频与章节条）、SpeedScale（速度标尺）、TableDemo（表格排序）、
                MermaidDemo（报错时保留旧图）、ThemeShowcase、DownloadLinks（下载与安装引导）
  lib/          release.ts（下载链接）、latest.ts（从更新日志解析版本）、faq.ts（常见问题）、tour.ts（导览视频章节）
  content/      changelog.md（sync 生成，不要手改）
  styles/       global.css：配色与字体 token，取自主仓库 docs/05-DESIGN.md
scripts/sync.mjs、video.mjs
```

## 待办

- 现在用 GitHub Pages 部署（推到 main 自动发布，见 `.github/workflows/deploy.yml`），地址 https://marlin-md.github.io/marlin-website/ 。站内路径都经 `src/lib/url.ts` 加上 `/marlin-website` 前缀
- 换成自己的域名后：`astro.config.mjs` 改 `site`、去掉 `base`，Pages 设置里填域名；加 `@astrojs/sitemap` 和 canonical
- 接入统计（Umami 或 Plausible）：下载按钮已带 `data-event="download-setup"` / `"download-portable"`
- 拿到代码签名证书后：删掉下载页「第一次运行时的安全提示」、下载引导里的 SmartScreen 说明、常见问题里对应的一条
