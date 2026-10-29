# Marlin 官网

Marlin（墨鳞）的产品网站，Astro 7 + Vue 组件（交互部分），纯静态输出。

## 开发

```bash
pnpm install
pnpm sync <主仓库本地路径>   # 同步更新日志、使用指南、品牌图
pnpm video [视频路径]         # 转出网站用的 1080p / 720p 与封面，默认取 ../promo-video/marlin-tour.mp4
pnpm dev                      # http://localhost:4321
pnpm build                    # 输出到 dist/
pnpm check                    # 类型检查
```

## 内容从哪来

| 网站里的 | 来源 | 更新方式 |
|---|---|---|
| 更新日志、最新版本号与日期 | 主仓库 `docs/CHANGELOG.md` | `pnpm sync` |
| Logo、favicon | 主仓库 `brand/` | `pnpm sync` |
| 使用指南 `/guide/`（`src/content/guide/`、`public/guide/images/`） | 主仓库 `guide/`（Markdown 和截图，截图由主仓库的 `pnpm guide:shots` 生成） | `pnpm sync <主仓库本地路径>`：拷贝时把相对链接、提示框、按键、Mermaid 换成网站上的写法（`scripts/guide-markdown.mjs`）；侧栏目录读指南首页（`src/lib/guide.ts`） |
| 截图 `src/assets/shots/`（2 倍图，Astro 转成 WebP） | promo-video 的 `scripts/capture`：用主仓库的测试版打开示例工作区截取，和导览视频同一批 | 重新截取后拷过来；`search-crop.png` 是 `search.png` 左上 1520×1080 的裁剪 |
| 下载链接 | 公开的发布仓库 `marlin-md/marlin-releases`（源码仓库不公开）：`Marlin_<版本>_x64-setup.exe` / `-portable.zip`，tag 为 `v<版本>` | 自动：构建时按版本号拼，打开页面时再查 GitHub 最新 Release |
| 实测数字、功能文案 | 主仓库 README 与 `docs/CHANGELOG.md`，手工同步 | 改 `src/pages/index.astro`；口号在 `src/lib/brand.ts` |
| 常见问题（同时生成 FAQPage 结构化数据） | 手写，事实以主仓库为准 | 改 `src/lib/faq.ts` |
| 分享卡片 `public/og.png` | 用网站样式排版后截图（1200×630） | 文案或截图大改时重新截 |
| 功能导览视频 `public/video/marlin-tour-*` | `promo-video/marlin-tour.mp4`（4 分 12 秒，12 章，无声；在 promo-video 里 `pnpm render:tour` 导出） | `pnpm video`：转出 1080p / 720p 与封面（第 15.5 秒的目录页）。导览时间轴变了要同步改 `src/lib/tour.ts` |

## 目录

```
src/
  pages/        index（首页）、download、changelog、guide/（使用指南首页和每一章）
  layouts/      Base.astro：顶栏、页脚、明暗切换；Guide.astro：指南的目录侧栏、上一章 / 下一章、Mermaid
  components/   PromoVideo（宣传视频与章节条）、DownloadLinks（下载与安装引导）
  lib/          release.ts（下载链接）、latest.ts（从更新日志解析版本）、faq.ts（常见问题）、tour.ts（导览视频章节）、video.ts（视频地址的版本摘要，pnpm video 生成）
  content/      changelog.md、guide/（sync 生成，不要手改）
  styles/       global.css：配色与字体 token（品牌色取自主仓库 docs/05-DESIGN.md）
scripts/sync.mjs、guide-markdown.mjs、video.mjs
```

## 待办

- 网站地址 https://marlin-md.cn ，同一份构建部署两处：国内线路解析到阿里云服务器（`/app/marlin-website/dist`，Nginx），境外线路解析到 GitHub Pages（推到 main 自动发布，见 `.github/workflows/deploy.yml`，域名在 `public/CNAME`）。服务器部署与证书见运维仓库 ops-pilot 任务 010
- 推到 main 后 Actions 同时发布两处：GitHub Pages，以及用 rsync 同步到服务器（job `server`，发布用户 `deploy-marlin`，密钥在仓库 Secrets：`DEPLOY_SSH_KEY`、`DEPLOY_KNOWN_HOSTS`、`DEPLOY_HOST`）
- 部署到别的地址：构建前设 `SITE_URL`、`BASE_PATH`（Git Bash 里加 `MSYS_NO_PATHCONV=1`，否则 `/` 会被改写成 Git 的安装目录）。canonical、`sitemap.xml`、`robots.txt`、`llms.txt` 都跟着 `site` 生成（`src/pages/*.ts`）
- 接入统计（Umami 或 Plausible）：下载按钮已带 `data-event="download-setup"` / `"download-portable"`
- 拿到代码签名证书后：删掉下载页「第一次运行时的安全提示」、下载引导里的 SmartScreen 说明、常见问题里对应的一条
