<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 数学公式

公式用 LaTeX 写法，Marlin 用 KaTeX 排版。文档里没有公式时，这部分不加载，不影响打开速度。

## 写法

| 写法 | 效果 |
|---|---|
| `$E = mc^2$` | 行内公式，和文字排在一起 |
| 单独几行 `$$`、公式、`$$` | 独立公式，单独占一段、居中 |
| ```` ```math ```` 代码块 | 和 `$$` 一样，GitHub 也认这种写法 |

```markdown
前 $n$ 天的累计订单量：

$$
\sum_{i=1}^{n} q_i = \frac{n(n+1)}{2}\,\bar q
$$
```

编辑时输入 `/公式`（或 `/gs`）插入一个独立公式。

## 在实时预览里改

- **独立公式**：光标进去时是一张卡片，上面写 LaTeX，下面实时排版，见 [实时预览](../06-live-preview/#公式)
- **行内公式**：一直显示排好的样子。点一下，弹出小框，上面改 LaTeX，下面预览：

<a class="shot" href="../images/math-inline.webp" target="_blank"><img src="../images/math-inline.webp" alt="行内公式的小框" loading="lazy" decoding="async"></a>

<kbd>Enter</kbd> 或点别处确定，<kbd>Esc</kbd> 不改；把框里清空再确定，就删掉这个公式。在正文里，行内公式是一个整体：<kbd>←</kbd> <kbd>→</kbd> 一步跨过它，退格整个删掉。

## 写错了

写错的公式显示成红色的原文，鼠标停上去看错在哪里，文档的其他部分照常显示。

## 导出

导出 PDF、HTML 时公式一起带上，导出的 HTML 在别的电脑上打开也能正常显示。
