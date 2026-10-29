<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 放映

开会时要给大家讲一篇文档，不用另做幻灯片：按 <kbd>F5</kbd>，文档全屏，字放大，从封面开始，一屏一屏往下讲，还能拿演示笔圈重点。

## 开始和退出

- 开始：按 <kbd>F5</kbd>，或者点标题栏的「▶ 放映」。编辑时标题栏上没有这个按钮，<kbd>F5</kbd> 和 ☰ →「放映与导出」→「放映」照常能用
- 退出：按 <kbd>Esc</kbd>，或者点右下角工具条上的「退出」

放映时窗口占满整个屏幕（任务栏也盖住），标题栏、标签、侧栏、状态栏都藏起来，只剩文档。鼠标停 2 秒自动隐藏。退出后，窗口大小、缩放和原来一样；从编辑态开始放映的，退出后还在原来的编辑布局里。

放映只是换个样子看，不会改到文档。

## 封面

放映从封面开始：

<a class="shot" href="../images/present-cover.webp" target="_blank"><img src="../images/present-cover.webp" alt="放映的封面" loading="lazy" decoding="async"></a>

- 标题：取文档开头属性表里的 `title`；没有的话取第一个一级标题（正文里就不再重复显示它）；再没有就用文件名
- 下面一行：属性表里的 `author` 和 `date`，有才显示

想要上图这样的封面，在文档最开头写：

```markdown
---
title: 订单服务 Q3 回顾
author: 周敏
date: 2026-10-12
---
```

属性表本身放映时不显示。属性表怎么写，见 [阅读](../04-reading/#文档属性)。

## 翻页

放映不是一页一页的幻灯片，而是整篇文档连续往下滚，每次滚一屏：

| 按键 | 作用 |
|---|---|
| <kbd>↓</kbd>、<kbd>PageDown</kbd>、<kbd>空格</kbd> | 下一屏（留一点上一屏的内容，方便接着讲） |
| <kbd>↑</kbd>、<kbd>PageUp</kbd>、<kbd>Shift+空格</kbd> | 上一屏 |
| <kbd>→</kbd> / <kbd>←</kbd> | 下一个 / 上一个标题，标题对齐到屏幕顶上。在封面按 <kbd>→</kbd> 到第一节 |
| <kbd>Home</kbd> / <kbd>End</kbd> | 回到封面 / 文末 |
| 滚轮 | 照常滚动 |

<kbd>←</kbd> <kbd>→</kbd> 在文档用到的最高两级标题之间跳，比如一级和二级，或者二级和三级。所以把要讲的每一部分写成一个标题，翻起来就像幻灯片。

## 演示笔

屏幕右下角是演示笔的工具条，鼠标不在上面时会变淡：

<a class="shot" href="../images/present-toolbar.webp" target="_blank"><img src="../images/present-toolbar.webp" alt="演示笔的工具条" loading="lazy" decoding="async"></a>

1. 激光笔（<kbd>L</kbd>）、画笔（<kbd>P</kbd>）、荧光笔（<kbd>H</kbd>）、橡皮（<kbd>X</kbd>）。再按一次同一个键，或者按 <kbd>Esc</kbd>，放下笔
2. 清除全部笔迹（<kbd>C</kbd>）
3. 画笔的颜色：红、蓝、绿、黑、白，拿着画笔时按 <kbd>1</kbd>–<kbd>5</kbd> 也能换
4. 画笔的粗细
5. 缩放，见下文
6. 退出放映

<a class="shot" href="../images/present-pens.webp" target="_blank"><img src="../images/present-pens.webp" alt="用演示笔圈重点" loading="lazy" decoding="async"></a>

- **激光笔**：一个跟着鼠标的红点，带一小段拖尾，不留痕迹
- **画笔**：按住鼠标画。用数位笔时，线条粗细跟着压力变
- **荧光笔**：黄色、半透明的粗笔，适合划一整行
- **橡皮**：碰到哪一笔，就擦掉那一整笔

笔迹画在内容上，不是画在屏幕上：往下翻时笔迹跟着内容移走，翻回来还在原处；放大缩小时也跟着一起变。拿着笔时照样能用滚轮和翻页键。

笔迹不会写进文档。退出放映就清空，下次放映是干净的。

> <strong class="alert-title" data-kind="tip">提示</strong>
> 拿着笔时按 <kbd>Esc</kbd> 先放下笔，再按一次才退出放映，不会一不小心就退出了。

## 放大缩小

放映开始时自动放大到正文铺满屏幕宽度。觉得字太大或太小：

- <kbd>Ctrl +</kbd> / <kbd>Ctrl -</kbd>，或者工具条上的 `−` <kbd>+</kbd>
- <kbd>Ctrl 0</kbd> 或工具条上的「适应」：回到铺满屏幕宽度

## 图和公式

图表、公式、代码、图片和阅读时一样显示。

- 比一屏还高的图，会缩小到一屏放得下，翻页时整张图都在屏幕里
- 点一张图，全屏看它：滚轮缩放、拖动，<kbd>0</kbd> 回到适应屏幕。<kbd>Esc</kbd> 或点空白处回到放映，还在原来的位置
- 拿着画笔时点图是在上面画，不会打开图
