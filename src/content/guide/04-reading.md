<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 阅读

Marlin 打开文档时是**阅读态**：只看，不会不小心改到。要改的时候按 <kbd>E</kbd>，见 [编辑基础](../05-editing/)。

## 打开文件

| 办法 | 说明 |
|---|---|
| 在资源管理器里双击 `.md` | 要先把 Marlin 设为默认打开方式，见 [安装与更新](../02-install/#设为默认打开方式) |
| 拖进窗口 | 文件、文件夹都可以拖；一次拖几个文件就开几个标签 |
| <kbd>Ctrl+O</kbd> | 选择文件；也在 ☰ →「打开文件…」 |
| 最近打开 | 起始页的列表，或 ☰ →「最近打开」 |
| 文件夹里 | 打开文件夹后，在左边的文件树里点 |

除了 `.md`，Marlin 也能打开：

- `.mmd` / `.mermaid`：整个文件就是一张图
- 图片和 PDF：在标签里看，可以缩放
- `json`、`yaml`、`toml`、代码和脚本：在带语法高亮的编辑器里看和改，脚本不会运行

重新打开一篇读过的文档，会回到上次读到的位置。

## 用目录跳转

按 <kbd>Ctrl+B</kbd> 打开侧栏，看文档的目录（打开了文件夹时是侧栏的「大纲」页）。当前读到的标题会高亮，点标题就跳过去。

<a class="shot" href="../images/read-outline.webp" target="_blank"><img src="../images/read-outline.webp" alt="侧栏的大纲" loading="lazy" decoding="async"></a>

## 放大缩小

- `Ctrl` <kbd>+</kbd> / `Ctrl` <kbd>-</kbd> / `Ctrl` <kbd>0</kbd>，或者按住 `Ctrl` 滚动鼠标滚轮
- 状态栏右边的 `−` <kbd>+</kbd>；点中间的比例，可以选「适应窗口宽度」或固定比例

缩放的是整页，文字、图、表一起变大变小。正文的字号、行宽想长期调整，在设置 →「外观」→「排版」里改。

## 查找

按 <kbd>Ctrl+F</kbd>，或点标题栏的放大镜，正文右上角出现查找框。输入文字，所有匹配的地方都会标出来；<kbd>Enter</kbd> 下一个，<kbd>Shift+Enter</kbd> 上一个，<kbd>Esc</kbd> 关掉。

<a class="shot" href="../images/read-find.webp" target="_blank"><img src="../images/read-find.webp" alt="查找框" loading="lazy" decoding="async"></a>

要替换文字，按 <kbd>Ctrl+H</kbd>：Marlin 会先进入编辑，再打开替换框。在整个文件夹里找，用 <kbd>Ctrl+Shift+F</kbd>。

## 文档属性

很多文档开头有一段用 `---` 包起来的属性（叫 YAML front matter），比如：

```markdown
---
title: 快速上手
owner: 周敏
tags: [入门, 后端]
---
```

Marlin 把它显示成一张属性表，标签显示成一个个小块，而不是一条分隔线加一堆文字。

<a class="shot" href="../images/read-props.webp" target="_blank"><img src="../images/read-props.webp" alt="文档属性表" loading="lazy" decoding="async"></a>

## 链接

| 链接指向 | 点一下 |
|---|---|
| 网址（`https://…`） | 在浏览器里打开 |
| 另一篇本地文档（`[说明](guide.md)`） | 在 Marlin 的新标签里打开；按住 `Ctrl` 点，在新窗口里打开 |
| 文档里的标题（`[安装](guide.md#安装)`、`[见下文](#安装)`） | 打开并滚到那个标题 |

右键链接还有「打开链接」「复制链接地址」。

## 图片、图表和代码

- 点图片，全屏看大图；<kbd>+</kbd> <kbd>-</kbd> <kbd>0</kbd> 缩放，<kbd>Esc</kbd> 关
- 点 Mermaid 图表，同样可以放大、拖动着看全貌；右键可以复制图片、复制 SVG、保存为 PNG
- 鼠标移到代码块上，右上角出现复制按钮，一点就把整段代码复制下来

## 右键

在正文里右键：复制、全选，以及「编辑」——进入编辑，光标就在你右键的那一段。

## 文件被别的程序改了

文档开着的时候，如果它被 VS Code、Git 或其他程序改了：

- 你没在编辑它：Marlin 自动重新加载，显示新的内容
- 你正在编辑、有没保存的修改：窗口顶上出现提示，选「重新加载（丢弃我的修改）」或「保留我的修改」

<a class="shot" href="../images/read-changed.webp" target="_blank"><img src="../images/read-changed.webp" alt="文件被别的程序改了时的提示" loading="lazy" decoding="async"></a>

## 不是 UTF-8 的文件

GBK 等编码的文件也能正常显示，但会以只读方式打开，窗口顶上提示「转为 UTF-8 并保存」。转换后就能编辑了。状态栏右边显示文件的编码。

## 很大的文档

几 MB 的文档也能秒开：Marlin 只排版屏幕附近的内容，滚到哪里排到哪里。10 MB 的文档约 2 秒可见，滚动流畅。

> <strong class="alert-title" data-kind="warning">警告</strong>
> 10 MB 级别的文档在编辑态里每次按键会慢半秒左右，阅读没有影响。超过约 4 MB 的文档不能导出 PDF 或打印，可以导出 HTML。
