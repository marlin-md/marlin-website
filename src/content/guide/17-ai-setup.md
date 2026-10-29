<!-- 由 scripts/sync.mjs 从主仓库 guide/ 生成，不要手改 -->

# 接上一个模型

Marlin 的 AI 功能（润色、翻译、续写、画图、摘要……）要用一个大模型来做。Marlin 自己不带模型，也不替你付费：你接上一个自己的，可以是 DeepSeek、通义千问这类云端服务，也可以是装在自己电脑上的 Ollama、LM Studio，或者已经在用的 Claude Code。

没接模型时，AI 功能用不了，Marlin 也不会发送任何内容。

## 添加模型

**在哪里**：设置（<kbd>Ctrl+,</kbd>）→「AI」→「＋ 添加模型」

<a class="shot" href="../images/ai-settings.webp" target="_blank"><img src="../images/ai-settings.webp" alt="设置 → AI" loading="lazy" decoding="async"></a>

1. 已经添加的模型：名称、模型名和接口地址；右边是密钥（只显示开头和最后几位）
2. 「测试」发一句很短的话，看能不能连上；「编辑」「删除」
3. 添加模型
4. 默认用哪个模型
5. 只用本地模型：打开后，不在这台电脑上的模型都不能用，文档内容不会离开本机

添加时先选「类型」，接口地址和常用的模型名会自动填好，一般只要贴上密钥：

<a class="shot" href="../images/ai-add.webp" target="_blank"><img src="../images/ai-add.webp" alt="添加模型" loading="lazy" decoding="async"></a>

| 项 | 填什么 |
|---|---|
| 类型 | 选服务商；列表里没有的选「自定义」 |
| 名称 | 在 Marlin 里显示的名字，随便起 |
| 接口地址 | 服务商给的「OpenAI 兼容」地址，选了类型就自动填好 |
| 模型名 | 用哪个模型，比如 `deepseek-chat`，可以改成服务商的其他模型 |
| 密钥 | 服务商给的 API Key，一般以 `sk-` 开头。本机模型不用填 |
| 上下文长度 | 模型一次能读多长。只用来截取长文档，不确定就用 32K |

填好点「保存」，再点这个模型的「测试」，显示「连接正常（用时 0.8 秒）」就可以用了。

## 去哪里拿密钥

密钥要到服务商的网站上注册、充值（多数有免费额度）后创建：

| 服务商 | 去哪里创建密钥 |
|---|---|
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com/) →「API keys」 |
| 通义千问 | [阿里云百炼](https://bailian.console.aliyun.com/) →「API-KEY」 |
| 智谱 | [bigmodel.cn](https://bigmodel.cn/) → 控制台 →「API Keys」 |
| Kimi | [platform.moonshot.cn](https://platform.moonshot.cn/) →「API Key 管理」 |
| 豆包 | [火山方舟](https://console.volcengine.com/ark) →「API Key 管理」。模型名要填方舟控制台里的模型 ID 或接入点 ID |
| OpenAI | [platform.openai.com](https://platform.openai.com/api-keys) →「API keys」 |

其他兼容 OpenAI 接口的服务（比如公司内部部署的），选「自定义」，按对方给的接口地址、模型名、密钥填。

> <strong class="alert-title" data-kind="note">注意</strong>
> 密钥存在 Windows 凭据管理器里，不写进 Marlin 的设置文件，设置页上也看不到完整的密钥。便携版也一样，所以换一台电脑要重新填。

## 用自己电脑上的模型

不想让文档离开电脑，可以在本机跑一个模型：

- **Ollama**：到 [ollama.com](https://ollama.com/) 下载安装，在命令行里运行 `ollama pull qwen2.5` 下载一个模型。Marlin 里类型选「Ollama（本机）」，模型名填 `qwen2.5`
- **LM Studio**：在 LM Studio 里下载并加载一个模型，打开它的本地服务（Local Server）。Marlin 里类型选「LM Studio（本机）」，模型名填 LM Studio 里显示的名字

本机模型不需要密钥，第一次使用时也不会提示「要发送到哪里」。速度和效果取决于电脑的配置。

## 用本机的 Claude Code

已经在用 Claude Code（Anthropic 的命令行助手）并登录了订阅，可以直接把它当模型用，不用另外申请密钥：类型选「Claude Code（用你的订阅）」。

<a class="shot" href="../images/ai-claude.webp" target="_blank"><img src="../images/ai-claude.webp" alt="添加 Claude Code" loading="lazy" decoding="async"></a>

- 找不到 Claude Code 时这一项不能选：先安装，并在终端运行 `claude` 登录一次
- 模型可选默认、Haiku（快）、Sonnet、Opus
- 每次都要先启动 Claude Code，比直接用接口慢几秒
- Claude Code 只拿到要处理的那段文字，不能读你的文件，也不能运行命令

## 设置里的其他几项

| 项 | 说明 |
|---|---|
| 默认模型 | 添加了几个模型时，AI 命令默认用哪个；在命令面板底部可以临时换 |
| 只用本地模型 | 打开后，云端模型和 Claude Code 都不能用 |
| 选中文字时显示 ✦ AI 按钮 | 选中一段文字停一下，旁边出现「✦ AI」，见 [用 AI 写](../18-ai-writing/) |
| 命令 →「打开命令文件夹」 | 自己写的命令放这里，见 [摘要与自定义命令](../20-ai-summary-commands/) |
| MCP | 让 Claude Code 这类助手连接 Marlin，见 [让外部 AI 助手连接 Marlin](../21-mcp/) |

## 连不上时

「测试」或使用时出错，Marlin 会说明原因：

| 提示 | 怎么办 |
|---|---|
| 连不上 api.xxx.com，检查网络或接口地址 | 检查网络；公司网络可能需要代理；接口地址是否抄错 |
| 密钥无效或没有权限 | 重新复制密钥，「编辑」里贴上；看服务商那边密钥是否被停用 |
| 找不到模型「xxx」，或接口地址不对 | 模型名是否拼错；豆包要填接入点 ID |
| 请求太频繁或额度用完了，稍后再试 | 到服务商网站看余额 |
| 模型 60 秒没有响应 | 服务商繁忙或本机模型太慢，稍后再试，或换一个小一点的模型 |

更多问题见 [常见问题](../26-faq/)。
