<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 认识界面

<a class="shot" href="../images/ui-overview.webp" target="_blank"><img src="../images/ui-overview.webp" alt="Marlin 的窗口" loading="lazy" decoding="async"></a>

1. **侧栏开关**：收起或展开左边的侧栏（<kbd>Ctrl+B</kbd>）
2. **标签**：每个打开的文件一个标签
3. **阅读 / 编辑**：在两种状态之间切换
4. **放映、导出**：全屏讲文档；存成 PDF、HTML 或打印
5. **☰ 菜单**：新建、打开、保存，以及所有功能的入口
6. **侧栏**：文件树、大纲、搜索、同步
7. **正文**
8. **状态栏**：当前状态、字数、缩放、主题等

## 标题栏

标题栏上的按钮随状态变化。阅读时：

<a class="shot" href="../images/ui-titlebar-read.webp" target="_blank"><img src="../images/ui-titlebar-read.webp" alt="阅读时的标题栏" loading="lazy" decoding="async"></a>

1. 查找（<kbd>Ctrl+F</kbd>）
2. 阅读 / 编辑
3. 放映（<kbd>F5</kbd>）
4. 导出：导出 PDF、导出 HTML、打印
5. ☰ 菜单

编辑时：

<a class="shot" href="../images/ui-titlebar-edit.webp" target="_blank"><img src="../images/ui-titlebar-edit.webp" alt="编辑时的标题栏" loading="lazy" decoding="async"></a>

1. 保存：有没保存的修改时才出现（<kbd>Ctrl+S</kbd>）
2. 撤销、重做（<kbd>Ctrl+Z</kbd> / <kbd>Ctrl+Y</kbd>）
3. 查找（<kbd>Ctrl+F</kbd>）
4. 编辑布局：分栏、实时预览、仅源码（<kbd>Alt+1</kbd> / <kbd>Alt+2</kbd> / <kbd>Alt+3</kbd>）
5. 阅读 / 编辑

放映和导出是读的时候做的事，编辑时标题栏上不显示，但 <kbd>F5</kbd>、<kbd>Ctrl+P</kbd> 和 ☰ 菜单里的「放映与导出」照常能用。

鼠标停在任何按钮上，提示里都写着它的快捷键。

## ☰ 菜单

标题栏最右边的「☰」里能找到 Marlin 的所有功能，右边写着快捷键。不记得快捷键时，从这里找就行。

<a class="shot" href="../images/ui-menu.webp" target="_blank"><img src="../images/ui-menu.webp" alt="☰ 菜单" loading="lazy" decoding="async"></a>

| 分组 | 有什么 |
|---|---|
| 文件 | 新建文件、新建窗口、打开文件、打开文件夹、快速打开、克隆仓库、最近打开 |
| 当前文档 | 保存、另存为、文档历史、关闭标签 |
| 编辑 | 撤销、重做、查找、替换、AI 命令 |
| 视图 | 侧栏、在文件夹中搜索、三种编辑布局、放大 / 缩小 / 实际大小、主题 |
| 放映与导出 | 放映、导出 PDF、导出 HTML、打印 |
| 帮助 | 使用指南（在浏览器里打开本指南）、Markdown 语法速查、键盘快捷键、关于 Marlin |
| 设置 | <kbd>Ctrl+,</kbd> |

用不了的项是灰的，比如没有打开文档时的「保存」。

## 标签

每个打开的文件一个标签，点标签切换，<kbd>Ctrl+Tab</kbd> 依次切换。

- 文件名后面的 `*`：有没保存的修改
- 文件名是**斜体**：临时标签。在文件树里单击文件时，它在临时标签里打开；再单击别的文件，就替换掉它，逛一圈目录不会开出一排标签。双击标签、双击文件或开始编辑，它就变成普通标签
- 紫色小点：外部的 AI 助手改过这个文档，见 [MCP](../21-mcp/)
- 关闭：标签上的 ×、鼠标中键点标签，或 <kbd>Ctrl+W</kbd>。关掉最后一个标签回到起始页

右键标签：关闭、关闭其他、关闭右侧、固定、复制路径、在资源管理器中显示、在文件树中显示、文档历史（见 [文档历史](../14-history/)）。

## 侧栏

按 <kbd>Ctrl+B</kbd> 或点标题栏最左边的按钮收起、展开；拖侧栏的右边缘调宽度。侧栏右上角的「«」也能收起它。

只打开了一个文件时，侧栏是这篇文档的**目录**。打开了文件夹时，侧栏顶上有几页：

| 页 | 内容 |
|---|---|
| 文件 | 文件夹的文件树（<kbd>Ctrl+Shift+E</kbd>），见 [文件夹](../12-folders/) |
| 大纲 | 当前文档的标题目录，点标题跳过去；配了 AI 模型时，上方还有摘要卡片 |
| 搜索 | 在整个文件夹里搜索（<kbd>Ctrl+Shift+F</kbd>），见 [文件夹](../12-folders/#在文件夹中搜索) |
| 同步 | 文件夹在 Git 仓库里时才有：提交、拉取、推送，数字是有改动的文件数，见 [Git 同步](../13-git/) |

## 状态栏

<a class="shot" href="../images/ui-statusbar.webp" target="_blank"><img src="../images/ui-statusbar.webp" alt="状态栏" loading="lazy" decoding="async"></a>

左边是当前的状态和最常用的按键提示：阅读态时是「<kbd>E</kbd> 编辑」，编辑态时是「<kbd>Ctrl+S</kbd> 保存」「<kbd>/</kbd> 插入」「<kbd>Esc</kbd> 退出」，后面是文档所在的文件夹。

右边从左到右（只显示用得上的几项）：

1. **新版本**：有新版本可以更新时出现
2. **分支**：文件夹在 Git 仓库里时，显示分支名，<kbd>↑</kbd> 是没推送的提交数，<kbd>↓</kbd> 是远端的新提交数；点它打开同步页
3. **字数**：只数读者看得到的文字；选中文字时是「选中 n / 全文」，点开看中文字、英文单词的明细
4. **编码**：文件的编码，一般是 UTF-8
5. **缩放**：`−` <kbd>+</kbd> 和当前比例，点比例可选「适应窗口宽度」或固定比例
6. **主题**：点它换主题（<kbd>Ctrl+Shift+T</kbd>）

外部的 AI 助手（比如 Claude Code）通过 MCP 连着 Marlin 时，最左边还会出现「✦ 助手的名字」，点开能看到它最近写了什么、恢复到写入之前，或者断开它。

编辑时还会显示光标所在的行和列。另外几项是给想看速度的人的：文档分成了多少块、这次排版用了多少毫秒、窗口打开用了多少毫秒。

## 起始页

没有打开任何文件时，窗口里是起始页。

<a class="shot" href="../images/ui-start.webp" target="_blank"><img src="../images/ui-start.webp" alt="起始页" loading="lazy" decoding="async"></a>

1. 打开文件、新建文件、打开文件夹、克隆仓库
2. 最近打开的文件和文件夹，分两页
3. 在最近打开里搜索
4. 列表只显示最近 6 个，「全部」展开其余的

最下面的「看看 5 分钟上手」打开本指南的 [快速上手](../01-quick-start/)；打开过 10 个文件以后，这一行就不再显示。

单击打开；按住 `Ctrl` 单击，在新窗口里打开。已经移动或删除的文件是灰的，点右边的 × 从列表里去掉。重新打开一篇读过的文档，会回到上次读到的位置。

## 多个窗口

<kbd>Ctrl+Shift+N</kbd> 新建一个窗口。每个窗口可以打开不同的文件夹。

从资源管理器双击打开文件时，默认在最近用过的窗口里新开一个标签；想每次都开新窗口，在设置 →「文件与窗口」里改「从外部打开」。在 Marlin 里按住 `Ctrl` 点链接、点最近打开的文件，也是在新窗口里打开。
