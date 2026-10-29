<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 画板

流程图、时序图、思维导图可以在画板里改：点、拖、打字就行，不用写 Mermaid 语法。改完点「完成」，Marlin 只改动源码里相关的那几行，文件里始终是纯 Mermaid 文本。

## 打开画板

| 在哪里 | 怎么做 |
|---|---|
| 实时预览 | 光标进入图表卡片，点卡片头上的「画板」；光标不在卡片里时，点图右上角的「✎ 编辑」 |
| 分栏、仅源码 | 光标放进 ```` ```mermaid ```` 代码块，点那一行末尾的「✎ 编辑图」 |
| 阅读态 | 右键图 →「在画板里编辑」（会先进入编辑） |
| <kbd>/</kbd> 菜单 | 在分栏、仅源码里插入流程图、时序图、思维导图，直接打开画板 |

## 三种画板都有的

<a class="shot" href="../images/board-flow.webp" target="_blank"><img src="../images/board-flow.webp" alt="流程图画板" loading="lazy" decoding="async"></a>

1. 加节点、改形状、编组、删除（每种画板的工具不同）
2. ✦ AI 改图：用一句话让 AI 改这张图（要先在设置里添加 AI 模型）
3. 撤销、重做（<kbd>Ctrl+Z</kbd> / <kbd>Ctrl+Y</kbd>）
4. 缩小、适应窗口、放大（<kbd>-</kbd> <kbd>0</kbd> <kbd>+</kbd>）；滚轮缩放，按住空格或鼠标中键拖动平移
5. 改动：标出和打开画板时相比改了什么；选中：缩放到选中的部分
6. 全屏（<kbd>F11</kbd>）
7. 取消（<kbd>Esc</kbd>）、完成（<kbd>Ctrl+Enter</kbd>）
8. 属性面板：选中的东西有哪些可以改；什么都没选时是整张图的设置

底下一行是这种画板的操作提示。

### 看改了什么

点工具栏上的「改动 N」：新加的标绿、改过的标蓝，删掉的列在底下一行。

<a class="shot" href="../images/board-changes.webp" target="_blank"><img src="../images/board-changes.webp" alt="「改动 N」" loading="lazy" decoding="async"></a>

### 写回

点「完成」，整个画板里的修改一次写回文档，在编辑器里一次 <kbd>Ctrl+Z</kbd> 就能整个退回。

- 只改动相关的几行，注释、配置、原来的排版都不动，用 Git 看改动时一目了然
- 你写的节点 id 从来不改；画板新建的节点，id 取它的文字（`通知仓库 --> 发货`）
- 画板认不得的写法，整张图只读，并说明原因，不会写坏文件

## 流程图

### 用键盘画

选中一个节点：

- 直接打字，改它的文字（中文输入法也行）
- <kbd>Tab</kbd> 接出一个新节点，<kbd>Enter</kbd> 加一个同级节点
- 方向键换选中的节点，<kbd>Delete</kbd> 删除

<a class="shot" href="../images/board-flow-keys.webp" target="_blank"><img src="../images/board-flow-keys.webp" alt="用键盘画流程图" loading="lazy" decoding="async"></a>

### 用鼠标画

- 从工具栏把形状拖到画布上，新建节点
- 从节点右侧的圆点拖出连线，连到另一个节点；拖到空白处就新建一个节点并连上
- 把节点拖到另一个节点的左右，是调同一层的顺序；拖到上下，是放到它的上面或下面
- 在空白处拖出一个框，框选几个节点；<kbd>Ctrl+点击</kbd> 或 <kbd>Shift+点击</kbd> 多选，<kbd>Ctrl+A</kbd> 全选

### 属性面板

选中节点时：

<a class="shot" href="../images/board-flow-props.webp" target="_blank"><img src="../images/board-flow-props.webp" alt="流程图的属性面板" loading="lazy" decoding="async"></a>

- 文字、8 种形状、颜色、放在哪个分组里
- 多选时，形状、颜色、分组一次改全部

选中连线时：两端是谁、线上的文字、线型（实线、虚线、粗线、隐形）、末端（箭头、无、圆头、叉头）、反转方向。

什么都没选时：整张图的方向（从上到下、从左到右……）。

### 分组

选中几个节点按 <kbd>Ctrl+G</kbd>（或「放进新分组」），放进一个新分组，分组可以嵌套；<kbd>Ctrl+Shift+G</kbd> 取消分组。节点可以拖进、拖出分组。选中分组可以改标题、方向，或者解散。

## 时序图

<a class="shot" href="../images/board-seq.webp" target="_blank"><img src="../images/board-seq.webp" alt="时序图画板" loading="lazy" decoding="async"></a>

1. 时间线：每条消息、注释、框一行，按先后排列
2. 图：点图里的消息、注释、框，左边对应的行就选中
3. 属性面板

在时间线里改：

- 行里直接改文字，<kbd>Enter</kbd> 写入并在下面加一条回复
- 拖行首的 ⋮⋮ 或按 <kbd>Alt+↑</kbd> / <kbd>Alt+↓</kbd> 调顺序；拖进框里就进了框
- 选中几行（<kbd>Shift+点击</kbd>），点工具栏的「循环」「分支」「可选」「并行」把它们包进一个框

<a class="shot" href="../images/board-seq-edit.webp" target="_blank"><img src="../images/board-seq-edit.webp" alt="改字、加一条回复" loading="lazy" decoding="async"></a>

参与者（时间线顶上一排）：左右拖动调顺序，双击改名，选方框或小人。

属性面板里改消息的两端、10 种箭头、激活条、反转方向；注释的位置；框的条件、加一段、解开。什么都没选时可以开关自动编号。

做不了的操作会说明原因，比如删除一个还有消息用到的参与者。

## 思维导图

像用 XMind 一样在图上改。选中一个主题：

| 做法 | 按键 |
|---|---|
| 改文字 | 直接打字，或 <kbd>F2</kbd> |
| 加子主题 | <kbd>Tab</kbd> |
| 加同级主题 | <kbd>Enter</kbd> |
| 升一级 | <kbd>Shift+Tab</kbd> |
| 调顺序 | <kbd>Alt+↑</kbd> / <kbd>Alt+↓</kbd> |
| 删除 | <kbd>Delete</kbd> |

<a class="shot" href="../images/board-mind.webp" target="_blank"><img src="../images/board-mind.webp" alt="用键盘加主题" loading="lazy" decoding="async"></a>

- 把主题拖到另一个主题中间，放进它下面；拖到上下边，排到它前后
- 工具栏的「大纲」打开左边的大纲，适合大段整理
- 属性面板里可以选 7 种形状和图标
- 选中一个主题粘贴几行文字，按缩进加成子主题

### 树状布局

Mermaid 默认的思维导图布局每改一处整张重排。Marlin 用的树状布局里，加一个主题时别的分支不动。用 `/思维导图` 新建的默认就是树状；以前写的导图打开画板时，顶上有一条提示，一键换成树状。在 GitHub 等不认树状布局的地方，照常按原来的布局显示。

### 把提纲变成思维导图

在编辑器里粘贴一段提纲（列表、缩进的文字或标题），旁边出现「转成思维导图」：

<a class="shot" href="../images/outline-paste.webp" target="_blank"><img src="../images/outline-paste.webp" alt="粘贴提纲后" loading="lazy" decoding="async"></a>

点一下就变成一张思维导图，<kbd>Ctrl+Z</kbd> 换回原文：

<a class="shot" href="../images/outline-mind.webp" target="_blank"><img src="../images/outline-mind.webp" alt="转成的思维导图" loading="lazy" decoding="async"></a>
