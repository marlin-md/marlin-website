<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 外观与主题

## 换主题

Marlin 带了 6 套主题：

| 主题 | 明 / 暗 |
|---|---|
| Marlin Light | 明 |
| Marlin Dark | 暗 |
| GitHub Light | 明 |
| GitHub Dark | 暗 |
| 学术 | 明 |
| 护眼绿 | 明 |

默认跟随 Windows 的明暗：浅色模式下用 Marlin Light，深色模式下用 Marlin Dark。

换主题，任选一种：

- <kbd>Ctrl+Shift+T</kbd>，或点状态栏最右边的主题名：弹出主题列表，点一个就换
- ☰ →「视图」→「主题…」
- 设置（<kbd>Ctrl+,</kbd>）→「外观」：点主题卡片

主题管正文的配色和字体，标题栏、侧栏这些界面跟着主题的明暗变，图表和代码高亮也跟着主题走。换了主题，所有窗口一起换。

<a class="shot" href="../images/theme-dark.webp" target="_blank"><img src="../images/theme-dark.webp" alt="深色主题" loading="lazy" decoding="async"></a>

> <strong class="alert-title" data-kind="tip">提示</strong>
> <kbd>Ctrl+Shift+T</kbd> 被输入法占用时（有的输入法用它切换繁简），用状态栏的主题按钮或设置页，或者在输入法的设置里关掉这个快捷键。

## 设置 → 外观

<a class="shot" href="../images/settings-appearance.webp" target="_blank"><img src="../images/settings-appearance.webp" alt="设置 → 外观" loading="lazy" decoding="async"></a>

1. 主题：点一下就换，带框的是现在用的
2. 跟随系统明暗：Windows 切换浅色 / 深色模式时，Marlin 跟着换。打开后可以分别选「明亮时」「暗色时」用哪套主题
3. 代码高亮：代码块的配色，默认跟随主题；也可以单独选 GitHub、One Dark、Solarized Light
4. 打开主题目录：自己写的主题放这里，见下文
5. 排版：在主题的基础上调整

| 排版 | 范围 | 说明 |
|---|---|---|
| 字号 | 12–24 px | 正文的字号，标题等按比例跟着变 |
| 行高 | 1.2–2.4 | 行与行之间的距离 |
| 正文宽度 | 520–1400 px | 正文一行最宽多少；窗口窄时自动收窄 |
| 正文字体 | 字体名 | 比如 `Noto Serif SC, serif`；留空用主题的字体。字体要先装在电脑上 |

临时放大缩小用 <kbd>Ctrl +</kbd> / <kbd>Ctrl -</kbd>，见 [阅读](../04-reading/#放大缩小)。

## 自己写一套主题

一套主题就是主题目录里的一个文件夹，里面两个文件：

```
主题目录\
  我的主题\
    theme.json
    theme.css
```

主题目录在设置 →「外观」→「打开主题目录」（安装版是 `%APPDATA%\dev.marlin-md.marlin\themes`，便携版是程序旁边的 `data\themes`）。

`theme.json` 写名字和明暗：

```json
{
  "name": "我的主题",
  "appearance": "light"
}
```

`appearance` 写 `light` 或 `dark`，决定界面用浅色还是深色。不写 `theme.json` 也行，名字就是文件夹名，按浅色处理。

`theme.css` 给这些变量赋值。最省事的办法是复制下面这份（Marlin Light 的值），改颜色：

```css
:root {
  --md-bg: #FCFBF8;            /* 背景 */
  --md-fg: #24262B;            /* 文字 */
  --md-fg-muted: #6B6F78;      /* 次要文字 */
  --md-link: #1F6F8B;          /* 链接 */
  --md-border: #E6E3DC;        /* 分隔线、表格边框 */
  --md-code-bg: #F2F0EB;       /* 代码背景 */
  --md-code-fg: #2C2E33;       /* 代码文字 */
  --md-quote-border: #1F6F8B;  /* 引用左边的竖线 */
  --md-table-stripe: #F7F5F1;  /* 表格隔行底色 */
  --md-font-body: "IBM Plex Sans", "Microsoft YaHei", sans-serif;   /* 正文字体 */
  --md-font-heading: "Source Serif 4", "Microsoft YaHei", serif;    /* 标题字体 */
  --md-font-mono: "IBM Plex Mono", Consolas, monospace;             /* 代码字体 */
  --md-content-width: 760px;   /* 正文宽度 */

  --hl-kw: #8B3FA8;            /* 代码高亮：关键字 */
  --hl-str: #2F7D4A;           /* 字符串 */
  --hl-fn: #1F6F8B;            /* 函数名 */
  --hl-cm: #8A8E96;            /* 注释 */
  --hl-num: #B5541B;           /* 数字 */
}
```

懂 CSS 的话，还可以在后面写别的样式规则，作用在正文上。

保存后，主题出现在设置 →「外观」和主题列表里。改 `theme.css` 时，正在用的主题立刻跟着变，不用重启。

> <strong class="alert-title" data-kind="note">注意</strong>
> 用记事本保存时编码选 UTF-8 就行，带不带 BOM 都认。
