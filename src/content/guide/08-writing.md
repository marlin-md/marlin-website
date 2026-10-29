<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 写作进阶

这一章是让编辑更快的技巧。全部按键见 [快捷键](../shortcuts/)。

## 查找和替换

| | 快捷键 | 鼠标 |
|---|---|---|
| 查找 | <kbd>Ctrl+F</kbd> | 标题栏的放大镜；☰ →「编辑」→「查找…」 |
| 替换 | <kbd>Ctrl+H</kbd> | ☰ →「编辑」→「替换…」；查找框左边的 › 展开替换 |

编辑时，查找框在编辑器顶上：

<a class="shot" href="../images/replace.webp" target="_blank"><img src="../images/replace.webp" alt="替换框" loading="lazy" decoding="async"></a>

- 三个开关：`Aa` 区分大小写，`ab` 全词匹配，`.*` 正则表达式
- 旁边显示「第几个 / 共几个」；<kbd>Enter</kbd> 或 <kbd>F3</kbd> 下一个，<kbd>Shift+Enter</kbd> 或 <kbd>Shift+F3</kbd> 上一个
- 「替换」换掉当前这一个，「全部替换」（<kbd>Ctrl+Alt+Enter</kbd>）一次换掉全部，<kbd>Ctrl+Z</kbd> 一次全部退回
- 正则替换可以用 `$1`、`$2` 引用括号里匹配到的内容
- <kbd>Esc</kbd> 关掉查找框

在整个文件夹里找，用侧栏的「搜索」（<kbd>Ctrl+Shift+F</kbd>）。

## 多光标：一次改好几处

<a class="shot" href="../images/multi-cursor.webp" target="_blank"><img src="../images/multi-cursor.webp" alt="Ctrl+D 加选下一处相同的内容，然后一起改" loading="lazy" decoding="async"></a>

| 做法 | 按键 |
|---|---|
| 加选下一处相同的内容 | <kbd>Ctrl+D</kbd>（可以连按） |
| 选中全部相同的内容 | <kbd>Ctrl+Shift+L</kbd> |
| 在点的地方加一个光标 | <kbd>Alt+点击</kbd> |
| 在上一行 / 下一行加一个光标 | <kbd>Ctrl+Alt+↑</kbd> / <kbd>Ctrl+Alt+↓</kbd> |
| 按列选择（选一个矩形区域） | <kbd>Shift+Alt+拖动</kbd> |
| 回到一个光标 | <kbd>Esc</kbd> |

有了多个光标，打字、删除、粘贴都在每个光标处同时进行。实时预览里也能用。

## 整行操作

| 做法 | 按键 |
|---|---|
| 把当前行往上 / 往下移 | <kbd>Alt+↑</kbd> / <kbd>Alt+↓</kbd> |
| 把当前行复制到上面 / 下面 | <kbd>Shift+Alt+↑</kbd> / <kbd>Shift+Alt+↓</kbd> |
| 删除当前行 | <kbd>Ctrl+Shift+K</kbd> |
| 选中当前行 | <kbd>Alt+L</kbd> |
| 在下面插一个空行 | <kbd>Ctrl+Enter</kbd> |
| 增加 / 减少缩进 | <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>，或 <kbd>Ctrl+]</kbd> / <kbd>Ctrl+[</kbd> |
| 注释 / 取消注释（`<!-- -->`） | <kbd>Ctrl+/</kbd> |

## 括号和引号

输入 `(`、<kbd>[</kbd>、`{`、引号、反引号以及中文括号和引号时，Marlin 自动补上另一半。光标在补上的那一半前面时，按 <kbd>Tab</kbd> 跳到它后面，不用伸手按方向键；其他地方的 <kbd>Tab</kbd> 照旧是缩进。

## 列表接着写

在列表、任务列表、引用里按 <kbd>Enter</kbd>，自动接上下一项的标记；在空的一项上再按 <kbd>Enter</kbd>，结束这个列表。

## 编辑代码和配置文件

在 Marlin 里打开 `json`、`yaml`、`toml`、`xml`、`csv`、`log`，以及 `js`、`ts`、`py`、`go`、`java`、<kbd>c</kbd>、`sh`、`ps1` 等代码和脚本文件，会直接进入带语法高亮的编辑器（这类文件没有阅读态和预览）。

- 保存时文件原来的编码标记（BOM）、换行符（CRLF / LF）、末尾有没有空行都保持不变
- <kbd>Tab</kbd> 跟着文件原来的缩进方式走
- 脚本只当文本编辑，从不运行
- 超过 5 MB 或内容是二进制的文件，以及 Word 等其他类型，交给系统里的程序打开

> <strong class="alert-title" data-kind="note">注意</strong>
> 文本和代码文件里 CRLF 与 LF 混用时，保存后统一成 CRLF。
