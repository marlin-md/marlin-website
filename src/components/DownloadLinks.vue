<script setup lang="ts">
// 下载入口：先用构建时的版本拼链接，页面打开后再问 GitHub 有没有更新的正式版。
// 点了下载就在原地给出「接下来」的安装步骤；不是 Windows 的访客先告诉他目前只有 Windows 版。
// data-event 留给以后接入的统计脚本（Umami / Plausible 都认这种写法）。
import { onMounted, ref } from 'vue'
import { downloadsFor, fetchLatest, formatDate, formatSize } from '../lib/release'

const props = defineProps<{
  version: string
  date?: string
  /** hero：主按钮加便携版；page：安装版与便携版并列 */
  variant?: 'hero' | 'page'
}>()

const dl = ref(downloadsFor(props.version, props.date))
const started = ref<'setup' | 'portable' | null>(null)
const notWindows = ref(false)

onMounted(async () => {
  notWindows.value = !/Windows/i.test(navigator.userAgent)
  const latest = await fetchLatest()
  if (latest) dl.value = latest
})
</script>

<template>
  <div class="dl" :class="variant === 'page' ? 'is-page' : 'is-hero'">
    <p v-if="notWindows" class="os-note">
      Marlin 目前只有 Windows 版，macOS 排在 3.0。可以把这个页面发到 Windows 电脑上再下载。
    </p>

    <div v-if="variant !== 'page'" class="actions">
      <a class="btn btn-primary" :href="dl.setup.url" data-event="download-setup" @click="started = 'setup'">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        下载 Windows 版
      </a>
      <a class="btn btn-quiet" :href="dl.portable.url" data-event="download-portable" @click="started = 'portable'">便携版 zip</a>
    </div>
    <p v-if="variant !== 'page' && !started" class="meta">
      v{{ dl.version }}<template v-if="dl.date">，{{ formatDate(dl.date) }}更新</template>。安装包 {{ formatSize(dl.setup.size) || '5.5 MB' }}，适用于 Windows 10 / 11（x64）。
      <a class="more-link" href="/download">其他下载方式</a>
    </p>

    <div v-if="variant === 'page'" class="options">
      <section class="opt">
        <h2>安装版</h2>
        <p>装到当前用户目录，不需要管理员权限。会注册 <code>.md</code> 文件关联，资源管理器里右键文件夹有「用 Marlin 打开」。</p>
        <a class="btn btn-primary" :href="dl.setup.url" data-event="download-setup" @click="started = 'setup'">下载安装版</a>
        <p class="file">{{ dl.setup.name }}<span v-if="dl.setup.size">，{{ formatSize(dl.setup.size) }}</span></p>
      </section>
      <section class="opt">
        <h2>便携版</h2>
        <p>解压即用。设置和缓存都放在程序旁的 <code>data\</code> 里，不写用户目录，适合放 U 盘或不能装软件的电脑。</p>
        <a class="btn btn-quiet" :href="dl.portable.url" data-event="download-portable" @click="started = 'portable'">下载便携版</a>
        <p class="file">{{ dl.portable.name }}<span v-if="dl.portable.size">，{{ formatSize(dl.portable.size) }}</span></p>
      </section>
    </div>

    <div v-if="started" class="next" role="status">
      <p class="next-title">下载开始了，接下来：</p>
      <ol v-if="started === 'setup'">
        <li>
          运行 <code>{{ dl.setup.name }}</code>。如果弹出「Windows 已保护你的电脑」，点「更多信息」，再点「仍要运行」。Marlin 还没有代码签名证书，所以会有这一步。
        </li>
        <li>第一次打开 <code>.md</code> 时，Marlin 会问要不要设为默认打开方式，点一次即可。</li>
        <li>以后在资源管理器里双击任何 <code>.md</code>，都直接是排好版的页面。</li>
      </ol>
      <ol v-else>
        <li>把 zip 解压到任意文件夹，比如 U 盘里。</li>
        <li>运行里面的 <code>marlin.exe</code>。如果弹出「Windows 已保护你的电脑」，点「更多信息」，再点「仍要运行」。</li>
        <li>把 <code>.md</code> 拖进窗口就能看；设置都存在程序旁的 <code>data\</code> 里。</li>
      </ol>
      <button type="button" class="close" @click="started = null">知道了</button>
    </div>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.meta {
  margin-top: 14px;
  font-size: 14px;
  color: var(--fg-muted);
  max-width: 36em;
}
.more-link {
  white-space: nowrap;
}
.os-note {
  margin-bottom: 14px;
  padding: 8px 12px;
  font-size: 14px;
  background: var(--accent-soft);
  border-radius: 6px;
  max-width: 36em;
}
code {
  font: 0.9em var(--font-mono);
}
.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.opt {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 28px 28px 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.opt h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
.opt p:first-of-type {
  flex: 1;
  margin-bottom: 22px;
  color: var(--fg-muted);
}
.file {
  margin-top: 12px;
  font: 13px var(--font-mono);
  color: var(--fg-muted);
  word-break: break-all;
}
.next {
  margin-top: 18px;
  padding: 16px 20px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  font-size: 14.5px;
  max-width: 40em;
}
.next-title {
  font-weight: 600;
  margin-bottom: 6px;
}
.next ol {
  margin: 0;
  padding-left: 1.3em;
}
.next li {
  margin: 4px 0;
}
.next li::marker {
  color: var(--accent);
  font-weight: 600;
}
.next code {
  word-break: break-all;
}
.close {
  margin-top: 10px;
  padding: 0;
  font: inherit;
  font-size: 14px;
  color: var(--accent);
  background: none;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
@media (max-width: 720px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
