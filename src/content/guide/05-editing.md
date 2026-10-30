<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 编辑基础

## 进入和退出编辑

进入编辑（**编辑态**），任选一种：

- 按 <kbd>E</kbd>（或 <kbd>Ctrl+E</kbd>）
- 点标题栏的「编辑」
- 在正文里右键 →「编辑」：光标直接在你右键的那一段
- 按 <kbd>Alt+1</kbd> / <kbd>Alt+2</kbd> / <kbd>Alt+3</kbd>：直接进入对应的编辑布局

回到阅读（**阅读态**）：按 <kbd>Esc</kbd>、<kbd>Ctrl+E</kbd>，或点标题栏的「阅读」。有没保存的修改时，窗口顶上会问：

- **保存并退出**
- **放弃修改**：回到上次保存的内容
- **继续编辑**

## 三种编辑布局

编辑时，标题栏上有三个布局按钮，随时切换：

| 布局 | 快捷键 | 样子 | 适合 |
|---|---|---|---|
| 分栏 | <kbd>Alt+1</kbd> | 左边源码，右边预览，两边跟着滚动 | 熟悉 Markdown，想同时看源码和效果 |
| 实时预览 | <kbd>Alt+2</kbd> | 直接在排好版的正文里改，光标所在的地方才露出 `**`、`#` 这些符号 | 不想看到符号，像用 Word 一样写 |
| 仅源码 | <kbd>Alt+3</kbd> | 只有源码，占满窗口 | 专心写、改大段的文字 |

<a class="shot" href="../images/edit-split.webp" target="_blank"><img src="../images/edit-split.webp" alt="分栏" loading="lazy" decoding="async"></a>

<a class="shot" href="../images/edit-live.webp" target="_blank"><img src="../images/edit-live.webp" alt="实时预览" loading="lazy" decoding="async"></a>

<a class="shot" href="../images/edit-source.webp" target="_blank"><img src="../images/edit-source.webp" alt="仅源码" loading="lazy" decoding="async"></a>

<kbd>Ctrl+&#92;</kbd> 按顺序轮换三种布局。分栏时可以拖中间的分隔线调两边的宽度；在右边的预览里双击，左边的光标就跳到那里。

文档第一次进入编辑时用哪种布局，在设置（<kbd>Ctrl+,</kbd>）→「编辑器」→「编辑时布局」里选，默认是分栏。之后在同一个标签里退出编辑再进来，还是上次用的布局。实时预览里表格、图、公式等怎么改，见 [实时预览](../06-live-preview/)。

## 保存

| 做法 | 说明 |
|---|---|
| <kbd>Ctrl+S</kbd> | 保存，留在编辑态。1 秒内连按 3 次：保存并回到阅读 |
| 标题栏的「保存」 | 有没保存的修改时才出现 |
| ☰ →「保存」 | |

有没保存的修改时，标签上的文件名后面有一个 `*`，状态栏左边写着「未保存」。

> <strong class="alert-title" data-kind="note">注意</strong>
> Marlin 每 30 秒把没保存的修改另存一份。万一 Marlin 或电脑意外关掉，下次打开这篇文档时会提示「发现……的未保存修改」，点「恢复」就回来了。

### 新建文件

<kbd>Ctrl+N</kbd>（或起始页、☰ 里的「新建文件」）：先选好存在哪里、叫什么，然后直接进入编辑。

### 另存为

<kbd>Ctrl+Shift+S</kbd> 或 ☰ →「另存为…」：存一份新文件，标签换成新文件，原来的文件保持上次保存的样子。

存到别的文件夹时，文档里的相对链接和图片路径会自动改好，仍然指向原来的文件。

## 撤销和重做

| | 快捷键 | 鼠标 |
|---|---|---|
| 撤销 | <kbd>Ctrl+Z</kbd> | 标题栏的 ↶；右键 →「撤销」；☰ →「编辑」→「撤销」 |
| 重做 | <kbd>Ctrl+Y</kbd> 或 <kbd>Ctrl+Shift+Z</kbd> | 标题栏的 ↷；右键 →「重做」 |

## 加粗、斜体等格式

选中文字后：

- 上方的格式工具条（见下一节）
- <kbd>Ctrl+B</kbd> 加粗，<kbd>Ctrl+I</kbd> 斜体，<kbd>Ctrl+K</kbd> 加链接
- 右键 →「格式」：加粗、斜体、删除线、行内代码、链接

已经是加粗的文字再按一次，就去掉加粗；只选中粗体里的几个字也一样，整段粗体都去掉。选区两头的空格不会被包进去；选了好几段时每段分别加。没有选中文字时，插入一对标记，光标在中间，接着打字就行。

## 选中文字时的格式工具条

在实时预览和分栏里，选中文字停一下，选区上方出现一条工具条：

<a class="shot" href="../images/format-bar.webp" target="_blank"><img src="../images/format-bar.webp" alt="选中文字后出现的格式工具条" loading="lazy" decoding="async"></a>

1. 加粗、斜体、删除线、行内代码：点一下加上，再点去掉。选中的字已经是这种格式时，按钮是按下的样子
2. 链接：工具条变成一个输入框，粘贴网址按 <kbd>Enter</kbd>（<kbd>Esc</kbd> 取消）。已经是链接时框里是原来的网址，可以改；清空后 <kbd>Enter</kbd> 去掉链接、文字留下。选中的字本身是网址时，直接变成链接
3. ✦ AI：打开 AI 命令，见 [用 AI 写](../18-ai-writing/)。没配 AI 模型时没有这个按钮

点完选区还在，可以接着点别的；每点一次，<kbd>Ctrl+Z</kbd> 撤回一步。光标在行内代码里时，加粗、斜体、删除线点不了。

代码块、表格、图表里，以及仅源码布局里不出现。不想要：设置 →「编辑器」，取消「选中文字时显示格式工具条」。

<a class="shot" href="../images/edit-format.webp" target="_blank"><img src="../images/edit-format.webp" alt="右键菜单里的「格式」" loading="lazy" decoding="async"></a>

> <strong class="alert-title" data-kind="note">注意</strong>
> <kbd>Ctrl+B</kbd> 只有光标在编辑器里时是加粗；在别处按，是收起或展开侧栏。

## 用「/」插入

在行首或空格后输入 <kbd>/</kbd>，弹出插入菜单。接着打字过滤，中文、拼音首字母、英文都行：`/表格`、`/bg`、`/table` 找到的都是表格。<kbd>↑</kbd> <kbd>↓</kbd> 选，<kbd>Enter</kbd> 插入。

<a class="shot" href="../images/edit-slash.webp" target="_blank"><img src="../images/edit-slash.webp" alt="插入菜单" loading="lazy" decoding="async"></a>

| 分组 | 能插入 |
|---|---|
| 文本 | 标题 1–3、引用、提示框（注意 / 提示 / 警告）、分割线 |
| 列表 | 无序列表、有序列表、任务列表 |
| 块 | 表格、代码块、数学公式、折叠块 |
| 媒体 | 图片、链接、脚注 |
| 图表 | 流程图、时序图、思维导图、AI 画图 |
| 其他 | 今天的日期 |

插入的模板里有几个空位（比如链接的「文字」和「网址」），按 <kbd>Tab</kbd> 在空位之间跳。

插入表格时，先在弹出的网格里点选几行几列：

<a class="shot" href="../images/edit-table-size.webp" target="_blank"><img src="../images/edit-table-size.webp" alt="选择表格大小" loading="lazy" decoding="async"></a>

不想要这个菜单：设置 →「编辑器」，取消「输入 / 插入模板」。

## 插入图片

- **粘贴截图**：截图后在编辑器里 <kbd>Ctrl+V</kbd>
- **拖进来**：把图片文件拖到编辑器里想放的位置
- **从菜单选**：`/图片`，选一个图片文件

图片会存进文档旁边的 `assets` 文件夹，文档里插入的是相对路径，比如 `![](assets/image-3fa2c1d0.png)`。整个文件夹拷到别处，图片照样显示。同一张图贴两次，只存一份。

<a class="shot" href="../images/edit-image.webp" target="_blank"><img src="../images/edit-image.webp" alt="粘贴截图后" loading="lazy" decoding="async"></a>

1. 文档里插入的那一行
2. 预览里显示的图片
3. 新建的 `assets` 文件夹（文件夹在 Git 里时，旁边的 U 表示是新文件，还没提交）

想存到别的文件夹：设置 →「编辑器」→「图片存到」，写相对文档的路径（比如 `images`）或绝对路径；留空就和文档放在一起。

## 写的时候的小帮手

- **列表接着写**：在列表、引用里按 <kbd>Enter</kbd>，自动接上下一项；空的一项再按 <kbd>Enter</kbd> 结束列表
- **缩进**：<kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>
- **跳出括号**：输入 `(`、<kbd>[</kbd>、引号时自动补上另一半；光标在补上的那一半前面时，按 <kbd>Tab</kbd> 跳到它后面
- **拼写检查**：拼错的英文单词下面有红色波浪线，右键看建议或「添加到词典」。只查英文，可以在设置 →「编辑器」里关掉
- **字数**：状态栏右边。只数读者看得到的文字，不算代码、图表、公式和链接地址；选中一段时显示「选中 n / 全文」

<a class="shot" href="../images/edit-wordcount.webp" target="_blank"><img src="../images/edit-wordcount.webp" alt="字数统计" loading="lazy" decoding="async"></a>

## 右键菜单

编辑器里右键：

- 撤销、重做
- 剪切、复制、粘贴、粘贴为纯文本
- 全选；选中文字时还有「格式」
- AI 润色、AI 修正错别字和语法、AI 命令（要先在设置 →「AI」里添加模型）

拼错的词上右键，最上面先列出拼写建议。

## 更多

多光标、移动行、查找替换等进阶的编辑技巧见 [写作进阶](../08-writing/)；全部按键见 [快捷键](../shortcuts/)。
