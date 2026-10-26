// llms.txt：给 AI 搜索和大模型读的纯文本简介（https://llmstxt.org）。事实以主仓库 README 为准，常见问题与首页共用
import type { APIRoute } from 'astro'
import { faqs } from '../lib/faq'
import { latest } from '../lib/latest'
import { RELEASES_URL } from '../lib/release'
import { absUrl } from '../lib/url'

const text = `# Marlin 墨鳞

> Marlin（墨鳞）是 Windows 上免费的 Markdown 阅读器与编辑器。双击 .md 文件即打开排好版的文档，在排好版的正文里直接编辑；流程图、时序图、思维导图可在画板里画，支持 Git 同步，按 F5 把文档当幻灯片放映。面向开发者、技术写作者和 Markdown 爱好者。

- 最新版本：${latest.version}（${latest.date}）
- 系统：Windows 10 1809 及以上、Windows 11，x64
- 价格：免费，不需要注册账号；文档只在本机，不上传（只有用户自己配置 AI 模型并发起 AI 操作时，才把选定的内容发给所选模型）
- 安装包：6.4 MB；另有免安装的便携版
- 技术：Tauri 2 + Rust，使用系统自带的 WebView2，不打包浏览器内核

## 功能

- 秒开：已开着 Marlin 时再开一个文件约 70 ms；10 MB 的文档 1.8 秒打开，滚动 68–140 fps
- 编辑：分栏（左源码右预览）、实时预览（在排好版的正文里直接改）、仅源码三种布局；表格是可编辑的网格；输入 / 插入标题、表格、代码块、公式、图表等
- 画图：Mermaid 图直接渲染；流程图、时序图、思维导图在画板里拖拽修改，写回纯 Mermaid 文本
- Git：文件树标出改动，编辑器标出改过的行，与上次提交并排对比；一键提交、拉取、推送
- 放映：F5 全屏讲文档，激光笔、画笔、荧光笔，退出即清空
- 工作区：打开文件夹，快速打开、全目录搜索（支持正则），改名时同步改链接
- 数学公式：KaTeX 排版
- 导出：A4 PDF 或单个 HTML 文件
- 主题：内置 6 套，主题就是一份 CSS
- AI：接 DeepSeek、通义千问、Kimi 等 OpenAI 兼容接口或本机的 Ollama、LM Studio；润色、翻译、续写，用一句话画图、改图，文档摘要；结果逐处预览，接受了才改文档
- MCP：Claude Code、Codex、Cursor 等 AI 助手可以读写打开的文档，写进编辑器、一步撤销（预览，默认关）
- 文档历史：每次保存留一份，对比、还原
- 自动更新：有新版本时状态栏提示，点一下安装

## 链接

- [官网](${absUrl('/')})
- [下载](${absUrl('/download/')})
- [更新日志](${absUrl('/changelog/')})
- [GitHub Releases](${RELEASES_URL})

## 常见问题

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`

export const GET: APIRoute = () => new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
