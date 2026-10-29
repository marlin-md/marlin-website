<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 安装与更新

## 系统要求

- Windows 10 1809 及以上，或 Windows 11，64 位（x64）
- WebView2 运行时：Windows 11 和多数 Windows 10 已经自带；缺少时安装器会引导安装

## 安装版和便携版

下载页（[marlin-md.cn/download](https://marlin-md.cn/download)）有两种：

| | 安装版 `Marlin_x.y.z_x64-setup.exe` | 便携版 `Marlin_x.y.z_x64-portable.zip` |
|---|---|---|
| 怎么装 | 运行安装包，装到当前用户目录，不需要管理员权限 | 解压到任意文件夹，直接运行 `marlin.exe` |
| 设置和数据存在 | `%APPDATA%\dev.marlin-md.marlin` | 程序旁边的 `data\` 文件夹 |
| 设为默认打开方式、右键「用 Marlin 打开」 | 有 | 没有 |
| 自动更新 | 下载、安装一步完成 | 只提示有新版本，打开下载页自己换 |

一般用安装版。便携版适合放在 U 盘里、或者不想往系统里写东西的电脑。

> <strong class="alert-title" data-kind="note">注意</strong>
> 便携版是不是「便携」，看程序旁边有没有一个叫 `portable` 的文件。删掉它，这一份就变成普通模式，设置改存到用户目录。

## 第一次运行时的安全提示

Windows 可能弹出「Windows 已保护你的电脑」。点「更多信息」，再点「仍要运行」即可。下载前可以在 [Releases](https://github.com/marlin-md/marlin-releases/releases) 页面核对文件的 SHA-256 摘要。

## 设为默认打开方式

装好后第一次打开 `.md` 文件，窗口顶上出现一行提示：

> 把 Marlin 设为 `.md` 文件的默认打开方式，双击即可阅读　［去设置］［不再提示］

点「去设置」，Windows 会打开「默认应用」设置，在 `.md` 一项里选 Marlin。之后在资源管理器里双击 `.md`，就用 Marlin 打开。

点了「不再提示」又想设置：在资源管理器里右键一个 `.md` 文件 →「打开方式」→「选择其他应用」，选 Marlin 并勾上「始终使用此应用」。

## 在资源管理器里「用 Marlin 打开」文件夹

安装版在资源管理器里右键一个文件夹（或者文件夹里的空白处），有「用 Marlin 打开」，Marlin 会打开这个文件夹，左边是它的文件树。

Windows 11 的右键菜单里先点「显示更多选项」，才看得到这一项。

## 自动更新

Marlin 启动几秒后，会在后台看一眼有没有新版本，一天最多一次。只问「最新版本是多少」，不发送你的任何文档内容。

有新版本时，状态栏右边出现「新版本 x.y.z」。点它，看这一版的更新说明，选：

- **下载并安装**：下载后先核对签名，对不上就不装；有没保存的文档先全部保存；装好后 Marlin 自动重新打开原来的窗口
- **跳过这个版本**：这个版本不再提示，等下一个版本
- **以后再说**：先关掉，状态栏的提示还在

<a class="shot" href="../images/install-update.webp" target="_blank"><img src="../images/install-update.webp" alt="状态栏的新版本提示和更新说明" loading="lazy" decoding="async"></a>

1. 状态栏的「新版本」，点它打开更新说明
2. 下载并安装、跳过这个版本、以后再说

不想自动检查：设置（<kbd>Ctrl+,</kbd>）→「关于」，取消「自动检查更新」。同一页的「检查更新」按钮可以随时手动检查。

> <strong class="alert-title" data-kind="note">注意</strong>
> 便携版只提示有新版本，「下载并安装」换成打开下载页：下载新的便携版解压，把旧的 `data\` 文件夹拷过去，设置就都在。

## 卸载

在 Windows「设置」→「应用」→「已安装的应用」里找到 Marlin，点「卸载」。卸载不会动你的文档，`.md` 的文件关联也会一起清掉。

Marlin 自己的设置、文档历史、AI 命令等存在 `%APPDATA%\dev.marlin-md.marlin`。卸载时可以勾选一起删除；没删的话，以后重装还能接着用。

> <strong class="alert-title" data-kind="note">注意</strong>
> 卸载再安装后，要重新设一次默认打开方式。
