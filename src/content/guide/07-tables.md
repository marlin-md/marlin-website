<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 表格

在 Marlin 里改表格，可以像用表格软件一样点格子、拖行列，不用对着 `|` 和 `---` 数位置。存下来的仍然是标准的 Markdown 表格。

## 插入表格

编辑时输入 `/表格`（或 `/bg`），先在弹出的网格里选几列几行，就插入一张空表：

<a class="shot" href="../images/edit-table-size.webp" target="_blank"><img src="../images/edit-table-size.webp" alt="选择表格大小" loading="lazy" decoding="async"></a>

## 在实时预览里原地改

实时预览（<kbd>Alt+2</kbd>）里，点表格的任意一格，表格就在原地变成可编辑的网格：

<a class="shot" href="../images/table-inline.webp" target="_blank"><img src="../images/table-inline.webp" alt="点格子，表格原地变成网格" loading="lazy" decoding="async"></a>

- 点进一格，内容是全选的，直接打字就替换掉它
- <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> 左右移动，<kbd>Enter</kbd> 到下一行；在最后一格按 <kbd>Tab</kbd> 新增一行
- <kbd>Shift+Enter</kbd> 在格子里换行，格子跟着变高；多行的格子里 <kbd>↑</kbd> <kbd>↓</kbd> 先在格子里上下走，到头了才去上一行、下一行
- 改完一格就写进文档，每一步都能 <kbd>Ctrl+Z</kbd> 撤销
- <kbd>Esc</kbd> 或点表格外面，离开网格

格子平时显示排好版的样子；进去改时显示 Markdown 原文，`**加粗**`、`` `代码` ``、`[链接](…)` 照原样写。格子里的换行进去改时也是换行，看不到 `<br>`（见下面「存下来是什么样」）。

### 插入行和列

鼠标停在行号的上下边缘、列头的左右边缘，出现一条蓝线和一个「+」，点它就在那里插入一行或一列：

<a class="shot" href="../images/table-plus.webp" target="_blank"><img src="../images/table-plus.webp" alt="行与行之间的「+」" loading="lazy" decoding="async"></a>

也可以用网格上方的「+ 行」「+ 列」，或者右键行号、列头。

### 选中一块

在格子上拖动，或者点行号、列头，选中一块：

<a class="shot" href="../images/table-select.webp" target="_blank"><img src="../images/table-select.webp" alt="选中一块格子" loading="lazy" decoding="async"></a>

- <kbd>Ctrl+C</kbd> 复制出去，能直接贴进 Excel、WPS
- 从 Excel、WPS、飞书表格复制的一片单元格，<kbd>Ctrl+V</kbd> 贴进来，从当前格开始覆盖，不够的行列自动补上
- <kbd>Delete</kbd> 清空选中的格子
- 右键还有剪切、复制、粘贴，以及这一行、这一列的操作

### 行和列的右键菜单

<a class="shot" href="../images/table-colmenu.webp" target="_blank"><img src="../images/table-colmenu.webp" alt="列头的右键菜单" loading="lazy" decoding="async"></a>

插入、删除、对齐、按这一列排序都在这里。排序时数字按大小排，中文按拼音排，表头不动。

### 调整顺序

拖行号上下移动一行，拖列头左右移动一列。

## 表格面板

表格大、想要更大的地方改时，点网格上方的「⤢ 展开」，打开表格面板：

<a class="shot" href="../images/table-panel.webp" target="_blank"><img src="../images/table-panel.webp" alt="表格面板" loading="lazy" decoding="async"></a>

1. 增删行列
2. 当前列的对齐：左、中、右
3. 按当前列升序、降序排列
4. 撤销、重做
5. 取消、完成：在面板里的改动，点「完成」（<kbd>Ctrl+Enter</kbd>）一次写回文档，编辑器里一次 <kbd>Ctrl+Z</kbd> 就能整个退回
6. 行号：点它选中整行，拖它调整顺序，右键更多操作
7. 列头：同上，对列

### 在分栏、仅源码里

这两种布局里，把光标放进表格，表格第一行的末尾出现「✎ 编辑表格」，点它打开表格面板：

<a class="shot" href="../images/table-source.webp" target="_blank"><img src="../images/table-source.webp" alt="源码里的「✎ 编辑表格」" loading="lazy" decoding="async"></a>

## 存下来是什么样

- 原来的表格是列宽对齐的，改完重新对齐（中文按两个字宽算）；原来是紧凑写法（`|a|b|`），就保持紧凑
- 没改的行一个字符不动，用 Git 看改动时只有改到的那几行
- 格子里的 `|` 会自动写成 `\|`，换行写成 `<br>`：Markdown 的表格一行只能写在一行里，别的软件也是这样存的。所以只有在源码里能看到 `<br>`，网格、表格面板、阅读视图里都是真正的换行

## 宽表格

列很多的表格，每列至少 5 个字宽，放不下时在原地左右滚动；滚动时第一列固定不动，里面的长文字自动折行。

> <strong class="alert-title" data-kind="note">注意</strong>
> Markdown 表格不能合并单元格，Marlin 也不做公式计算。
