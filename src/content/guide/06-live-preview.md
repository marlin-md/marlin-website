<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 实时预览

实时预览是三种编辑布局之一（<kbd>Alt+2</kbd>，或标题栏的「实时预览」）：直接在排好版的正文里改，像用 Word 一样，不用看着 `**`、`#` 这些符号写。

想让文档一进编辑就是实时预览：设置（<kbd>Ctrl+,</kbd>）→「编辑器」→「编辑时布局」选「实时预览」。

## 符号只在光标所在处露出来

标题、加粗、斜体、链接、列表、引用、提示框都按阅读时的样子显示。光标移到哪里，哪里才露出 Markdown 的符号，方便你改；光标离开，又恢复成排好版的样子。选中文字时不露符号，选中的字不会挪动；要加粗、加链接，用选区上方的 [格式工具条](../05-editing/#选中文字时的格式工具条)。

<a class="shot" href="../images/live-reveal.webp" target="_blank"><img src="../images/live-reveal.webp" alt="光标移到哪里，哪里露出符号" loading="lazy" decoding="async"></a>

- 任务列表的方框点一下就勾上
- 按住 `Ctrl` 点链接，打开它
- 复制得到的是 Markdown 原文，贴到别处格式不丢

## 卡片

代码、公式、图表、表格、图片、折叠块这些整块的内容，在实时预览里是一张张**卡片**：平时显示结果，点进去就在原地改，不露出围栏、`$$` 这些标记。

用 <kbd>↑</kbd> <kbd>↓</kbd> 可以从上下文直接走进卡片、再走出来。每张卡片右上角的「⋯」（或在卡片上右键）可以复制整块的 Markdown、删除、上移、下移。

### 代码

<a class="shot" href="../images/live-code.webp" target="_blank"><img src="../images/live-code.webp" alt="代码卡片" loading="lazy" decoding="async"></a>

1. 选择代码的语言，按这种语言高亮
2. 复制整段代码；「⋯」里是复制整块、删除、移动

代码就在卡片里原地改。

### 公式

光标进入公式块时，上面是 LaTeX 输入区，下面实时排版：

<a class="shot" href="../images/live-math.webp" target="_blank"><img src="../images/live-math.webp" alt="公式卡片" loading="lazy" decoding="async"></a>

行内公式 `$…$` 点一下，弹出小框改，详见 [数学公式](../11-math/)。

### 图表

光标进入 Mermaid 图时，上面写源码，下面边写边画：

<a class="shot" href="../images/live-diagram.webp" target="_blank"><img src="../images/live-diagram.webp" alt="图表卡片" loading="lazy" decoding="async"></a>

1. 模板：换成流程图、时序图、思维导图的模板（<kbd>Ctrl+Z</kbd> 可以退回）
2. 画板：不写语法，在画板里拖拽着改（流程图、时序图、思维导图），见 [画板](../10-board/)
3. ⤢ 展开：在大窗口里改，上面源码、下面图，<kbd>Ctrl+Enter</kbd> 或「完成」写回
4. ⋯：复制、删除、移动

写错时图不会消失：保留上一版并变淡，上面一行红字指出第几行错了，详见 [图表](../09-mermaid/#写错了怎么办)。

### 图片

点一下图片选中它，出现工具条：

<a class="shot" href="../images/live-image.webp" target="_blank"><img src="../images/live-image.webp" alt="图片工具条" loading="lazy" decoding="async"></a>

1. 改说明文字（<kbd>Enter</kbd> 确定，<kbd>Esc</kbd> 不改）；「替换…」换一张图片，说明文字不变；「⋯」复制、删除、移动
2. 拖右下角调大小，旁边显示宽度。调过大小的图片写成 `<img src="…" width="…">`（Markdown 本身没有写大小的办法，GitHub、Typora、VS Code 都认这种写法）；工具条里多一个「原始大小」，变回去

### 表格

点表格里的任意一格，表格在原地变成可编辑的网格，详见 [表格](../07-tables/)。

### 折叠块

`<details>` 折叠块是一张卡片：头上的输入框改标题，下面直接写正文，`<details>`、`<summary>` 这些标签都不露出来。用 `/折叠块` 插入。

### 脚注、文档属性、HTML

- 脚注：正文里的 `[^1]` 显示成上标编号，文末的定义显示成脚注区；光标碰到时露出源码
- 文档开头的属性（YAML）显示成属性表，光标进去露出源码
- HTML 块显示渲染结果；要改源码，点它右上角的「⋯」→「编辑源码」

## 和另外两种布局的关系

三种布局改的是同一份文档、同一条撤销记录：在实时预览里改的，切到仅源码还能 <kbd>Ctrl+Z</kbd> 撤销；切换布局时光标停在同一处文字上。

什么都不改的话，文件一个字节都不变。
