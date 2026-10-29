<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 用 AI 画图

不会写 Mermaid 也能有图：说一句要画什么，AI 写好图的源码，Marlin 画出来给你看，满意再插进文档。已有的图也能说一句话让它改，写错了让它修。

先要 [接上一个模型](../17-ai-setup/)。图是怎么写、怎么看的，见 [图表（Mermaid）](../09-mermaid/)。

## 一句话画图

1. 把光标放在要插图的地方
2. <kbd>Ctrl+J</kbd> →「用一句话画图」，或者输入 `/AI 画图`（`/ht`）
3. 说说要画什么，按 <kbd>Enter</kbd>

<a class="shot" href="../images/ai-draw-ask.webp" target="_blank"><img src="../images/ai-draw-ask.webp" alt="说要画什么" loading="lazy" decoding="async"></a>

AI 会选合适的图（流程图、时序图、思维导图、甘特图等）。画好的图先作为预览显示出来：

<a class="shot" href="../images/ai-draw.webp" target="_blank"><img src="../images/ai-draw.webp" alt="画好的图" loading="lazy" decoding="async"></a>

点「插入」（<kbd>Enter</kbd>）放进文档；不满意点「重新生成」，或「放弃」（<kbd>Esc</kbd>）。

> <strong class="alert-title" data-kind="note">注意</strong>
> AI 给的源码，Marlin 会先检查能不能画出来。画不出来时先自己修一遍，还不行就带着报错让 AI 再写一次；仍然不行就告诉你失败了，不会往文档里塞一张画不出来的图。

## 一句话改图

光标放在一张图里（源码里，或实时预览的图卡片上），<kbd>Ctrl+J</kbd> →「用一句话改图」，说怎么改，比如「在审核后面加一个失败分支」。改好的图同样先预览，「接受」后才替换原来的图，<kbd>Ctrl+Z</kbd> 能撤回。

## 让 AI 修

图写错了，图的位置显示红色的报错条。报错条上除了 Marlin 自己的「修复」，还有「✦ 让 AI 修」：把图和报错一起交给 AI 改正，结果同样先预览。

## 在画板里改

在流程图、时序图、思维导图的 [画板](../10-board/) 里，点工具栏上的「✦ AI 改图」（或按 <kbd>Ctrl+J</kbd>），在下面出现的输入框里说一句话：

<a class="shot" href="../images/ai-board.webp" target="_blank"><img src="../images/ai-board.webp" alt="画板里的「✦ AI 改图」" loading="lazy" decoding="async"></a>

1. 「✦ AI 改图」
2. 说怎么改，按 <kbd>Enter</kbd>（或点「改图」）

AI 改完，画板上标出改了哪些节点和连线。不满意点「撤销这次」，还想接着改点「继续说」。和你自己在画板上的操作一样，最后点「完成」才写回文档。
