<script setup lang="ts">
// Mermaid 报错演示：复现 Marlin 的行为——语法写错时保留上一次画好的图并压暗（不透明度 0.35），
// 上方显示「Mermaid 语法错误（第 N 行）」报错条，可跳到源码那一行。图为静态 SVG 示意。
import { computed, ref } from 'vue'

const GOOD = [
  'flowchart LR',
  '  A[用户下单] --> B{库存充足?}',
  '  B -->|是| C[锁定库存]',
  '  B -->|否| D[提示缺货]',
  '  C --> E[创建订单]'
]
const BAD_LINE = 3 // 从 0 数，即第 4 行
const broken = ref(false)
const flash = ref(false)

const lines = computed(() => {
  if (!broken.value) return GOOD
  const l = [...GOOD]
  l[BAD_LINE] = '  B -->|否 D[提示缺货]'
  return l
})

function toggle() {
  broken.value = !broken.value
  flash.value = false
}

function jump() {
  flash.value = false
  requestAnimationFrame(() => (flash.value = true))
}
</script>

<template>
  <div class="mdemo">
    <div class="panes">
      <div class="source" aria-label="Mermaid 源码">
        <p class="fence">```mermaid</p>
        <ol>
          <li
            v-for="(l, i) in lines"
            :key="i"
            :class="{ bad: broken && i === BAD_LINE, flash: flash && i === BAD_LINE }"
          >
            <code>{{ l }}</code>
          </li>
        </ol>
        <p class="fence">```</p>
      </div>
      <div class="preview" :class="{ stale: broken }">
        <div v-if="broken" class="err" role="status">
          <span class="msg">Mermaid 语法错误（第 4 行）：Parse error on line 4</span>
          <button type="button" @click="jump">跳到源码</button>
        </div>
        <svg class="diagram" viewBox="0 0 580 180" role="img" aria-label="流程图：用户下单，判断库存是否充足，充足则锁定库存并创建订单，否则提示缺货">
          <defs>
            <marker id="mdemo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" class="head" />
            </marker>
          </defs>
          <g class="edges" marker-end="url(#mdemo-arrow)">
            <path d="M106 98H138" />
            <path d="M240 98C270 98 270 58 298 58" />
            <path d="M240 98C270 98 270 138 298 138" />
            <path d="M396 58H458" />
          </g>
          <g class="labels">
            <text x="262" y="66">是</text>
            <text x="262" y="142">否</text>
          </g>
          <g class="nodes">
            <rect x="10" y="80" width="96" height="36" rx="3" />
            <path d="M190 58 240 98 190 138 140 98z" />
            <rect x="300" y="40" width="96" height="36" rx="3" />
            <rect x="300" y="120" width="96" height="36" rx="3" />
            <rect x="460" y="40" width="96" height="36" rx="3" />
          </g>
          <g class="text">
            <text x="58" y="103">用户下单</text>
            <text x="190" y="103">库存充足?</text>
            <text x="348" y="63">锁定库存</text>
            <text x="348" y="143">提示缺货</text>
            <text x="508" y="63">创建订单</text>
          </g>
        </svg>
      </div>
    </div>
    <div class="bar">
      <button type="button" class="btn btn-quiet toggle" :aria-pressed="broken" @click="toggle">
        {{ broken ? '把第 4 行改回来' : '把第 4 行改错' }}
      </button>
      <span class="note">{{ broken ? '图还在，只是压暗了；改回来就恢复。' : '点一下会删掉第 4 行里的一个 |。' }}</span>
    </div>
  </div>
</template>

<style scoped>
.panes {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  border: 1px solid var(--md-border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--md-bg);
  box-shadow: var(--shadow);
}
.source {
  padding: 18px 0;
  border-right: 1px solid var(--md-border);
  font: 13px/1.9 var(--font-mono);
  overflow-x: auto;
}
.fence {
  padding-left: 52px;
  color: var(--fg-muted);
}
.source ol {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: ln;
}
.source li {
  counter-increment: ln;
  display: flex;
  white-space: pre;
  padding-right: 16px;
}
.source li::before {
  content: counter(ln);
  flex: none;
  width: 36px;
  margin-right: 16px;
  text-align: right;
  color: var(--fg-muted);
  opacity: 0.7;
}
.source code {
  font: inherit;
  color: var(--md-fg);
}
.source li.bad {
  background: var(--danger-soft);
}
.source li.bad code {
  color: var(--danger);
}
.source li.flash {
  animation: flash 1.2s ease-out;
}
@keyframes flash {
  0%,
  40% {
    box-shadow: inset 3px 0 0 var(--danger);
  }
  100% {
    box-shadow: inset 3px 0 0 transparent;
  }
}
.preview {
  position: relative;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 236px;
}
.err {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  background: var(--danger-soft);
  color: var(--danger);
  font: 12.5px/1.5 var(--font-mono);
}
.err .msg {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
.err button {
  flex: none;
  height: 24px;
  padding: 0 8px;
  border: 1px solid currentColor;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font: 12px var(--font-sans);
  cursor: pointer;
}
.diagram {
  width: 100%;
  height: auto;
  transition: opacity 0.2s;
}
.stale .diagram {
  opacity: 0.35;
}
.edges path {
  fill: none;
  stroke: var(--md-link);
  stroke-width: 1.5;
}
.head {
  fill: var(--md-link);
}
.nodes rect,
.nodes path {
  fill: var(--md-code-bg);
  stroke: color-mix(in srgb, var(--md-fg) 30%, transparent);
  stroke-width: 1;
}
.text text,
.labels text {
  font: 13px var(--font-sans);
  fill: var(--md-fg);
  text-anchor: middle;
}
.labels text {
  font-size: 12px;
  fill: var(--md-fg-muted);
}
.bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 16px;
}
.toggle {
  font-size: 15px;
  padding: 8px 16px;
}
.note {
  font-size: 14px;
  color: var(--fg-muted);
}
@media (max-width: 760px) {
  .panes {
    grid-template-columns: minmax(0, 1fr);
  }
  .source {
    border-right: 0;
    border-bottom: 1px solid var(--md-border);
  }
  .preview {
    min-height: 0;
    padding: 16px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .source li.flash {
    animation: none;
    box-shadow: inset 3px 0 0 var(--danger);
  }
}
</style>
