<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 快速上手

5 分钟走一遍最常用的事：打开一篇文档、读、改、存。

## 1. 装好并设为默认打开方式

从 [下载页](https://marlin-md.cn/download) 下载安装包运行，不需要管理员权限。装好后第一次打开 `.md` 文件，窗口顶上会出现一行提示「把 Marlin 设为 `.md` 文件的默认打开方式」，点「去设置」，在系统设置里选 Marlin。

之后在资源管理器里双击任何 `.md` 文件，都会用 Marlin 打开。详细见 [安装与更新](../02-install/)。

## 2. 打开一篇文档

双击一个 `.md` 文件，Marlin 打开后显示的是排好版的文档，这叫**阅读态**：标题、列表、表格、代码、公式、流程图都已经画好。

<a class="shot" href="../images/qs-reading.webp" target="_blank"><img src="../images/qs-reading.webp" alt="阅读态" loading="lazy" decoding="async"></a>

- 文档长的话，按 <kbd>Ctrl+B</kbd> 打开左边的目录，点标题就跳过去
- 按住 `Ctrl` 滚动鼠标滚轮，放大或缩小整页

## 3. 改一改

按 <kbd>E</kbd>（或者点标题栏的「编辑」），进入**编辑态**。默认是左右分栏：左边是 Markdown 源码，右边是排好版的样子，两边跟着滚动。

<a class="shot" href="../images/qs-editing.webp" target="_blank"><img src="../images/qs-editing.webp" alt="编辑态：左边源码，右边预览" loading="lazy" decoding="async"></a>

在左边直接改，右边立即跟着变。想插入标题、表格、图片之类，在行首输入 <kbd>/</kbd>，从弹出的菜单里选。

> <strong class="alert-title" data-kind="tip">提示</strong>
> 不想看到 `**`、`#` 这些符号？按 <kbd>Alt+2</kbd> 换成「实时预览」，直接在排好版的正文里改。三种布局的区别见 [编辑基础](../05-editing/#三种编辑布局)。

## 4. 保存

按 <kbd>Ctrl+S</kbd> 保存，状态栏左边显示「已保存」。

<a class="shot" href="../images/qs-saved.webp" target="_blank"><img src="../images/qs-saved.webp" alt="状态栏的「已保存」" loading="lazy" decoding="async"></a>

保存后仍留在编辑态，可以接着改。改完了：

- 按 <kbd>Esc</kbd>，或点标题栏的「阅读」，回到阅读态
- 也可以 1 秒内连按 3 次 <kbd>Ctrl+S</kbd>：保存并回到阅读态

文档有没保存的修改时，标签上的文件名后面有一个 `*`，标题栏也会出现「保存」按钮。

## 5. 打开一个文件夹

写文档的人手里往往不止一篇。按 <kbd>Ctrl+Shift+O</kbd> 选一个文件夹（或者把文件夹拖进窗口），左边出现这个文件夹的文件树，单击文件就能看。

<a class="shot" href="../images/qs-folder.webp" target="_blank"><img src="../images/qs-folder.webp" alt="打开文件夹" loading="lazy" decoding="async"></a>

- <kbd>Ctrl+Shift+P</kbd> 按文件名快速找到一个文件
- <kbd>Ctrl+Shift+F</kbd> 在整个文件夹里搜索文字

文件夹的更多用法见 [文件夹](../12-folders/)；文件夹在 Git 仓库里时，还能直接同步，见 [Git 同步](../13-git/)。

## 接下来

- 想知道界面上每个按钮是干什么的：[认识界面](../03-interface/)
- 想把编辑用顺手：[编辑基础](../05-editing/)
- 想查某个快捷键：[快捷键](../shortcuts/)，或者在 Marlin 里按 <kbd>Ctrl+,</kbd> 打开设置，看「快捷键」页
