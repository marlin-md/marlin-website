<script setup lang="ts">
// 首页的可操作演示：仿 Marlin 窗口，阅读态 ⇄ 分栏编辑，源码改动实时渲染
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { url } from '../lib/url'

const SAMPLE = [
  '# 快速上手',
  '',
  '这份手册介绍订单服务的本地开发流程，从拉代码到跑通第一个请求，大约需要 15 分钟。',
  '',
  '> 第一次搭环境时，先看完「准备工作」再动手，能少走不少弯路。',
  '',
  '## 准备工作',
  '',
  '- 安装 Node 20+ 与 pnpm',
  '- 克隆仓库，复制一份 `.env.example` 为 `.env`',
  '',
  '| 依赖 | 版本 | 用途 |',
  '|---|---|---|',
  '| Node | 20 LTS | 运行服务 |',
  '| Redis | 7 | 会话与限流 |',
  '',
  '## 启动服务',
  '',
  '```bash',
  'pnpm install',
  'pnpm dev    # 默认监听 3000 端口',
  '```',
  ''
].join('\n')

const md = new MarkdownIt({ html: false, linkify: true })
const source = ref(SAMPLE)
const saved = ref(SAMPLE)
const mode = ref<'read' | 'edit'>('read')
const html = computed(() => md.render(source.value))
const dirty = computed(() => source.value !== saved.value)

const root = ref<HTMLElement>()
const editor = ref<HTMLTextAreaElement>()
const view = ref<HTMLElement>()
let visible = false
let io: IntersectionObserver | undefined

async function enterEdit() {
  mode.value = 'edit'
  await nextTick()
  editor.value?.focus({ preventScroll: true })
}

function enterRead() {
  mode.value = 'read'
}

function isTyping(el: EventTarget | null) {
  return el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
}

// 窗口在视口里时才接管 E / Esc，免得在页面别处按键被抢
function onKey(e: KeyboardEvent) {
  if (!visible) return
  const k = e.key.toLowerCase()
  if (mode.value === 'read' && k === 'e' && !e.altKey && !e.metaKey && !e.shiftKey && !isTyping(e.target)) {
    e.preventDefault()
    enterEdit()
  } else if (mode.value === 'edit' && e.key === 'Escape') {
    e.preventDefault()
    enterRead()
  }
}

// 和 Marlin 一样：Ctrl+S 存盘并留在编辑态
function onEditorKey(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault()
    saved.value = source.value
  }
}

// 按比例同步滚动：源码滚到哪，预览跟到哪
function syncScroll() {
  const src = editor.value
  const dst = view.value
  if (!src || !dst) return
  const max = src.scrollHeight - src.clientHeight
  dst.scrollTop = max > 0 ? (src.scrollTop / max) * (dst.scrollHeight - dst.clientHeight) : 0
}

function reset() {
  source.value = SAMPLE
  saved.value = SAMPLE
}

onMounted(() => {
  io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.3 })
  if (root.value) io.observe(root.value)
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <figure ref="root" class="demo" :data-mode="mode">
    <div class="win" role="group" aria-label="Marlin 窗口演示">
      <div class="title">
        <img :src="url('/brand/mark.png')" alt="" width="16" height="14" />
        <span>快速上手.md - 产品手册 - Marlin</span>
        <span class="ctl" aria-hidden="true">
          <i class="min"></i><i class="max"></i><i class="close"></i>
        </span>
      </div>
      <div class="tools">
        <span class="tab">快速上手.md<b v-if="dirty" title="未保存"> •</b></span>
        <span class="seg" role="radiogroup" aria-label="模式">
          <button type="button" role="radio" :aria-checked="mode === 'read'" @click="enterRead">阅读</button>
          <button type="button" role="radio" :aria-checked="mode === 'edit'" @click="enterEdit">编辑</button>
        </span>
      </div>
      <div class="body">
        <textarea
          v-if="mode === 'edit'"
          ref="editor"
          v-model="source"
          class="src"
          spellcheck="false"
          aria-label="Markdown 源码"
          @keydown="onEditorKey"
          @scroll="syncScroll"
          @input="nextTick(syncScroll)"
        ></textarea>
        <article ref="view" class="md view" v-html="html"></article>
      </div>
      <div class="status">
        <span class="state"><i></i>{{ mode === 'read' ? '阅读态' : '编辑态' }}</span>
        <template v-if="mode === 'read'"><kbd>E</kbd> 编辑</template>
        <template v-else><kbd>Ctrl+S</kbd> 保存 <kbd>Esc</kbd> 退出</template>
        <span class="right">UTF-8 <span>Marlin Light</span></span>
      </div>
    </div>
    <figcaption>
      <template v-if="mode === 'read'">这个窗口可以操作：按 <kbd>E</kbd> 或点「编辑」，改左边的源码，右边跟着变。</template>
      <template v-else>
        <kbd>Esc</kbd> 回到阅读。
        <button v-if="source !== SAMPLE" type="button" class="reset" @click="reset">恢复示例文字</button>
      </template>
    </figcaption>
  </figure>
</template>

<style scoped>
.demo {
  margin: 0;
}
.win {
  /* 窗口固定用 Marlin Light 的壳，深色页面上也像一扇真窗户 */
  --w-bg: #f4f3ef;
  --w-border: #e2e0da;
  --w-fg: #24262b;
  --w-muted: #6b6f78;
  --w-elev: #ffffff;
  --md-bg: #fcfbf8;
  --md-fg: #24262b;
  --md-fg-muted: #6b6f78;
  --md-link: #1f6f8b;
  --md-border: #e6e3dc;
  --md-code-bg: #f2f0eb;
  --md-code-fg: #2c2e33;
  --md-quote-border: #1f6f8b;
  color: var(--w-fg);
  background: var(--w-bg);
  border: 1px solid var(--w-border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  overflow: hidden;
  font-size: 13px;
  color-scheme: light;
}
.title {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding-left: 12px;
  font-size: 12.5px;
}
.title span:first-of-type {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ctl {
  display: flex;
  align-self: stretch;
}
.ctl i {
  width: 44px;
  position: relative;
}
.ctl i::before,
.ctl i::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  border-color: var(--w-fg);
}
.min::before {
  width: 10px;
  border-top: 1px solid;
  transform: translate(-50%, 0);
}
.max::before {
  width: 9px;
  height: 9px;
  border: 1px solid;
  transform: translate(-50%, -50%);
}
.close::before,
.close::after {
  width: 12px;
  border-top: 1px solid;
  transform: translate(-50%, 0) rotate(45deg);
}
.close::after {
  transform: translate(-50%, 0) rotate(-45deg);
}
.tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 0 10px;
  border-bottom: 1px solid var(--w-border);
}
.tab {
  background: var(--w-elev);
  border-radius: 6px;
  padding: 3px 12px;
  box-shadow: 0 0 0 1px var(--w-border);
}
.tab b {
  color: #1f6f8b;
}
.seg {
  display: flex;
  background: #eae8e2;
  border-radius: 7px;
  padding: 2px;
}
.seg button {
  font: inherit;
  color: var(--w-muted);
  background: none;
  border: 0;
  border-radius: 5px;
  padding: 2px 14px;
  cursor: pointer;
}
.seg button[aria-checked='true'] {
  color: var(--w-fg);
  background: var(--w-elev);
  box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
}
.body {
  display: grid;
  grid-template-columns: 1fr;
  height: 440px;
  background: var(--md-bg);
}
[data-mode='edit'] .body {
  grid-template-columns: 1fr 1fr;
}
.view {
  overflow: auto;
  padding: 28px 40px;
  font-size: 14px;
}
[data-mode='read'] .view {
  padding: 32px max(40px, calc(50% - 300px));
}
.src {
  resize: none;
  border: 0;
  border-right: 1px solid var(--w-border);
  padding: 24px 20px;
  font: 13px/1.75 var(--font-mono);
  color: var(--w-fg);
  background: #fefdfb;
  outline: none;
  tab-size: 2;
}
.src:focus-visible {
  box-shadow: inset 0 0 0 2px #1f6f8b55;
}
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 12px;
  border-top: 1px solid var(--w-border);
  color: var(--w-muted);
  font-size: 11.5px;
  white-space: nowrap;
  overflow: hidden;
}
.status kbd {
  font-size: 10.5px;
  color: var(--w-fg);
  background: var(--w-elev);
  border-color: var(--w-border);
}
.state {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 6px;
}
.state i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1f6f8b;
}
.right {
  margin-left: auto;
  display: flex;
  gap: 14px;
}
figcaption {
  margin-top: 14px;
  font-size: 14px;
  color: var(--fg-muted);
  min-height: 1.7em;
}
.reset {
  font: inherit;
  color: var(--accent);
  background: none;
  border: 0;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
@media (max-width: 720px) {
  .body {
    height: 400px;
  }
  [data-mode='edit'] .body {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .src {
    border-right: 0;
    border-bottom: 1px solid var(--w-border);
    padding: 14px 16px;
  }
  .view,
  [data-mode='read'] .view {
    padding: 20px 18px;
  }
  .ctl,
  .right {
    display: none;
  }
}
</style>
