<script setup lang="ts">
// 表格演示：点列头排序，中文按拼音、数字按数值（与 Marlin src/table/model.ts 同一个比较规则），
// 下方实时显示写回文档的 Markdown
import { computed, ref } from 'vue'

const head = ['负责人', '模块', '工时']
const body = [
  ['周敏', '订单', '12'],
  ['艾伦', '支付', '8'],
  ['陈晓', '库存', '30'],
  ['李想', '通知', '4'],
  ['白杨', '搜索', '16']
]

const collator = new Intl.Collator('zh-CN', { numeric: true, sensitivity: 'base' })
const sortCol = ref<number | null>(null)
const desc = ref(false)

const rows = computed(() => {
  const c = sortCol.value
  if (c === null) return body
  const sorted = [...body].sort((a, b) => collator.compare(a[c], b[c]))
  return desc.value ? sorted.reverse() : sorted
})

function sortBy(c: number) {
  if (sortCol.value === c) desc.value = !desc.value
  else {
    sortCol.value = c
    desc.value = false
  }
}

function ariaSort(c: number) {
  if (sortCol.value !== c) return 'none'
  return desc.value ? 'descending' : 'ascending'
}

// 工时列右对齐，写回时对齐标记是 ---:
const markdown = computed(() =>
  [`| ${head.join(' | ')} |`, '|---|---|---:|', ...rows.value.map((r) => `| ${r.join(' | ')} |`)].join('\n')
)
</script>

<template>
  <div class="tdemo">
    <div class="grid-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th v-for="(h, c) in head" :key="h" :aria-sort="ariaSort(c)" :class="{ num: c === 2 }">
              <button type="button" @click="sortBy(c)">
                {{ h }}
                <span class="arrow" aria-hidden="true">{{ sortCol === c ? (desc ? '▼' : '▲') : '↕' }}</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r[0]">
            <td v-for="(v, c) in r" :key="c" :class="{ num: c === 2 }">{{ v }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="hint">点列头排序。负责人按拼音排：艾、白、陈、李、周；工时按数值排：4、8、12，不会排成 12、16、30、4、8。</p>
    <p class="src-label">写回文档的 Markdown</p>
    <pre class="src" aria-live="polite"><code>{{ markdown }}</code></pre>
  </div>
</template>

<style scoped>
.grid-wrap {
  overflow-x: auto;
}
.grid {
  width: 100%;
  border-collapse: collapse;
  background: var(--md-bg);
  font-size: 15px;
  border: 1px solid var(--border);
  border-radius: 8px;
}
.grid th,
.grid td {
  border: 1px solid var(--border);
  padding: 0;
  text-align: left;
}
.grid td {
  padding: 8px 14px;
}
.grid th {
  background: var(--md-code-bg);
  font-weight: 600;
}
.grid th button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 8px 14px;
  font: inherit;
  color: var(--fg);
  background: none;
  border: 0;
  cursor: pointer;
}
.grid th button:hover {
  background: var(--hover);
}
.grid th.num button {
  flex-direction: row-reverse;
}
.grid .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.arrow {
  font-size: 11px;
  color: var(--fg-muted);
}
th[aria-sort='ascending'] .arrow,
th[aria-sort='descending'] .arrow {
  color: var(--accent);
}
.hint {
  margin-top: 12px;
  font-size: 14px;
  color: var(--fg-muted);
}
.src-label {
  margin: 20px 0 6px;
  font-size: 13px;
  color: var(--fg-muted);
}
.src {
  margin: 0;
  padding: 12px 16px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 8px;
  font: 13px/1.7 var(--font-mono);
  overflow-x: auto;
}
</style>
