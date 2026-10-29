<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# Git 同步

很多团队把文档放在 Git 仓库里（GitHub、GitLab、Gitee 或公司自己的服务器），这样每次修改都有记录，几个人也能各改各的、再合到一起。Marlin 让你不用记 Git 命令，也能看到改了什么、把改动同步给同事。

先认识几个词：

| 词 | 意思 |
|---|---|
| 仓库 | 被 Git 管着的文件夹。你电脑上的是本地仓库，服务器上的叫远端 |
| 提交 | 把现在的改动记成一个版本，附一句说明。提交只在你电脑上 |
| 推送 | 把你的提交传到远端，同事就能拿到 |
| 拉取 | 把同事推送到远端的提交拿到你电脑上 |

> <strong class="alert-title" data-kind="note">注意</strong>
> Marlin 用的是电脑上装的 git，没装的话先去 [git-scm.com](https://git-scm.com/) 下载安装。登录也交给 git：用 SSH 密钥，或者在 git 弹出的登录窗口里登录。Marlin 不保存密码和令牌。
>
> 没装 git、或者打开的文件夹不在 Git 仓库里时，Marlin 里看不到任何和 Git 有关的东西。

## 文件夹在 Git 里时，你会看到什么

<a class="shot" href="../images/git-status.webp" target="_blank"><img src="../images/git-status.webp" alt="文件夹在 Git 里时" loading="lazy" decoding="async"></a>

1. **文件树上的标记**：上次提交以后改过的文件变色，右边标一个字母
   - <kbd>M</kbd>：改过
   - <kbd>U</kbd>：新文件，还没提交过
   - <kbd>A</kbd>：新文件，已经准备好提交
   - `!`：有冲突（见下文）
2. **文件夹上的点**：里面有改过的文件
3. **侧栏的「同步」页**：数字是有改动的文件数
4. **状态栏的分支**：`main` 是分支名，`↑2` 是你有 2 个提交还没推送，`↓1` 是远端有 1 个新提交你还没拉取。点它打开「同步」页

Marlin 打开文件夹时会去远端看一眼有没有新提交，之后每 10 分钟看一次，有就在状态栏显示 <kbd>↓</kbd>。只是看，不会自动拉取，也不会动你的文件。多久看一次在 设置 →「文件与窗口」→「自动获取远端」里改，可以改成只在打开文件夹时看。

在终端或别的 Git 工具里提交、拉取、切换分支以后，Marlin 1 秒内就会跟上。

## 编辑时看到改了哪几行

用分栏或仅源码布局编辑时，和上次提交比，改过的行左边有一道色条：

<a class="shot" href="../images/git-changes.webp" target="_blank"><img src="../images/git-changes.webp" alt="编辑器里改过的行" loading="lazy" decoding="async"></a>

- 蓝条：这一行改过
- 红色小三角：这里删掉了几行
- 绿条：新加的行

点色条，看上次提交时这里是什么样：

<a class="shot" href="../images/git-change-pop.webp" target="_blank"><img src="../images/git-change-pop.webp" alt="点色条看原来的内容" loading="lazy" decoding="async"></a>

点「还原这一块」就改回上次提交的内容。改回以后后悔了，<kbd>Ctrl+Z</kbd> 撤回。

> <strong class="alert-title" data-kind="note">注意</strong>
> 实时预览布局里没有色条，要看的话按 <kbd>Alt+1</kbd> 换到分栏。

## 同步：提交、拉取、推送

点侧栏的「同步」页（或者点状态栏的分支）：

<a class="shot" href="../images/git-sync.webp" target="_blank"><img src="../images/git-sync.webp" alt="同步页" loading="lazy" decoding="async"></a>

1. 分支、没推送和没拉取的提交数；「⋯」里是更多操作
2. 改过的文件。勾上的会被提交，不想这次提交的去掉勾；点文件名，并排看它和上次提交有什么不同
3. 提交说明。不填就用灰字写的那句，按改动自动生成，比如「更新 快速上手.md；新增 回滚手册.md」
4. 「同步」按钮

点「同步」，Marlin 依次做完这几步：

<pre class="mermaid">flowchart LR
  A[保存打开着的文档] --&gt; B[提交勾上的文件] --&gt; C[拉取同事的提交] --&gt; D[推送你的提交]</pre>

做完显示「已提交，已拉取，已推送，和远端一致了」。按钮上的字会随情况变：

| 按钮 | 什么时候 |
|---|---|
| 同步 | 有勾上的改动 |
| 拉取并推送 | 没有要提交的，只和远端对齐 |
| 提交 | 这个仓库没有远端，只能提交到本地 |

只想做其中一步，用「⋯」里的「只提交」「拉取」「推送」「获取（不合并）」。「获取」只看远端有什么新提交，不改你的文件。

### 并排对比

在「同步」页点一个文件名，左边是上次提交时的样子，右边是现在，改过的地方标了颜色。只能看不能改，<kbd>Esc</kbd> 或「关闭」退出。

<a class="shot" href="../images/git-diff.webp" target="_blank"><img src="../images/git-diff.webp" alt="并排对比" loading="lazy" decoding="async"></a>

### 第一次提交时问名字和邮箱

Git 的每个提交都要写上是谁做的。电脑上的 git 还没设置过名字和邮箱时，「同步」页里会让你填，填好点「保存并继续」接着提交。这个设置只写进这个仓库，不影响别的仓库。

### 有没勾的改动时拉取

拉取前，Marlin 会问「还有没提交的改动。先把它们暂存起来，拉取完再放回去吗？」。点「暂存后拉取」，你没提交的改动先放到一边，拉取完原样放回来。

### 出错了

出错时，「同步」页先用一句中文说明原因，下面是 git 的原话。常见的有：连不上远端（断网、地址不对）、远端拒绝登录、远端有新的提交要先拉取、没有可提交的改动。你的提交都还在本地，处理好原因再点一次就行。

## 冲突

你和同事改了同一个文件的同一处，拉取时 Git 不知道该留谁的，这就是冲突。Marlin 不会替你选，也不会丢掉任何一边：遇到冲突就停下来，「同步」页换成冲突列表。

<a class="shot" href="../images/git-conflict.webp" target="_blank"><img src="../images/git-conflict.webp" alt="拉取遇到冲突" loading="lazy" decoding="async"></a>

1. 说明：哪些文件两边都改了
2. 每个文件选一种处理办法
   - **保留我的**：用你的版本
   - **使用远端**：用同事的版本。你的版本先备份到仓库里的 `.git/marlin-backup` 文件夹，想找回时，「⋯」→「冲突时备份的文件…」
   - **手动改**：在编辑器里打开，自己决定怎么合
3. 全部处理完点「继续」，Marlin 完成拉取并推送。不想处理了点「中止」，一切回到拉取之前

处理冲突期间，分支名的位置暂时显示一串编号，处理完就恢复。

### 手动改

在编辑器里，两边不一样的地方标成一块：上面是远端的，下面是你的。

<a class="shot" href="../images/git-conflict-edit.webp" target="_blank"><img src="../images/git-conflict-edit.webp" alt="编辑器里的冲突块" loading="lazy" decoding="async"></a>

点块上方的「用远端的」「用我的」或「两个都要」。想把两边的内容揉在一起，先点「两个都要」，再动手改。改完回到「同步」页点「改好了」；文件里还有没处理的冲突块时不让过。

## 放弃改动

改乱了，想回到上次提交的样子：

- 文件树里右键有改动的文件或文件夹 →「放弃改动」
- 「同步」页里右键文件 →「放弃改动」
- 「同步」页的「⋯」→「放弃全部改动」

Marlin 会先列出要放弃哪些文件、会怎么处理，确认后：

- 改过、删掉的文件恢复成上次提交的样子
- 新文件（包括新文件夹）移到回收站
- 放弃之前，现在的内容先备份到仓库里的 `.git/marlin-backup` 文件夹，放弃错了还能找回来
- 开着的文档有没保存的修改，也一起放弃（同样先备份）

有冲突还没处理完时不能放弃改动。

## 克隆仓库

同事给了你一个仓库地址，把它下载到自己电脑上：起始页的「克隆仓库」，或 ☰ →「克隆仓库…」。

<a class="shot" href="../images/git-clone.webp" target="_blank"><img src="../images/git-clone.webp" alt="克隆仓库" loading="lazy" decoding="async"></a>

填好仓库地址，选放在哪个文件夹下（下次会记住），下面会写出最终的位置。点「克隆」，完成后直接打开这个文件夹。目标文件夹已经存在并且不是空的时，不会克隆。

## Marlin 不做的

切换和合并分支、查看完整的提交历史、暂存区管理这些，请用别的 Git 工具（比如 GitHub Desktop、VS Code、命令行）。在那边做完，Marlin 会自动跟上。

想看一篇文档自己以前的样子，不需要 Git：Marlin 每次保存都会留一份，见 [文档历史](../14-history/)。
