<script setup lang="ts">
// 主题演示：六套内置主题的 --md-* 取值与主仓库 themes/<id>/theme.css 一致
import { computed, ref } from 'vue'

interface Theme {
  id: string
  name: string
  appearance: 'light' | 'dark'
  vars: Record<string, string>
}

const SYSTEM = '-apple-system, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif'
const SERIF = '"Source Serif 4 Variable", "Noto Serif SC", "Songti SC", SimSun, Georgia, serif'

const themes: Theme[] = [
  {
    id: 'marlin-light',
    name: 'Marlin Light',
    appearance: 'light',
    vars: { bg: '#FCFBF8', fg: '#24262B', 'fg-muted': '#6B6F78', link: '#1F6F8B', border: '#E6E3DC', 'code-bg': '#F2F0EB', 'quote-border': '#1F6F8B' }
  },
  {
    id: 'marlin-dark',
    name: 'Marlin Dark',
    appearance: 'dark',
    vars: { bg: '#1B1E23', fg: '#E3E1DB', 'fg-muted': '#9A9EA6', link: '#6CBFE0', border: '#2E3238', 'code-bg': '#22262C', 'quote-border': '#5EB2D6' }
  },
  {
    id: 'github-light',
    name: 'GitHub Light',
    appearance: 'light',
    vars: { bg: '#FFFFFF', fg: '#1F2328', 'fg-muted': '#59636E', link: '#0969DA', border: '#D1D9E0', 'code-bg': '#F6F8FA', 'quote-border': '#D1D9E0' }
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    appearance: 'dark',
    vars: { bg: '#0D1117', fg: '#E6EDF3', 'fg-muted': '#8D96A0', link: '#4493F8', border: '#3D444D', 'code-bg': '#161B22', 'quote-border': '#3D444D' }
  },
  {
    id: 'academic',
    name: '学术',
    appearance: 'light',
    vars: { bg: '#FBF8F1', fg: '#2B2A27', 'fg-muted': '#6F6B63', link: '#7A2E1D', border: '#E4DDCF', 'code-bg': '#F3EEE3', 'quote-border': '#B08B57' }
  },
  {
    id: 'eye-care',
    name: '护眼绿',
    appearance: 'light',
    vars: { bg: '#CCE8CF', fg: '#1F2B22', 'fg-muted': '#5C6E60', link: '#1F5F7A', border: '#B3D2B6', 'code-bg': '#C0DDC3', 'quote-border': '#5F9068' }
  }
]

// 正文 / 标题字体：GitHub 两套用系统字体，学术全用衬线，其余同 Marlin
const fonts: Record<string, [string, string]> = {
  'github-light': [SYSTEM, SYSTEM],
  'github-dark': [SYSTEM, SYSTEM],
  academic: [SERIF, SERIF]
}

const current = ref(themes[0])

const style = computed(() => {
  const t = current.value
  const s: Record<string, string> = { colorScheme: t.appearance }
  for (const [k, v] of Object.entries(t.vars)) s[`--md-${k}`] = v
  s['--md-code-fg'] = t.vars.fg
  const f = fonts[t.id]
  if (f) {
    s['--md-font-body'] = f[0]
    s['--md-font-heading'] = f[1]
  }
  return s
})

const css = computed(() => {
  const t = current.value
  const lines = Object.entries(t.vars).map(([k, v]) => `  --md-${k}: ${v};`)
  return `:root {\n${lines.join('\n')}\n}`
})
</script>

<template>
  <div class="show">
    <div class="side">
      <div class="pick" role="radiogroup" aria-label="内置主题">
        <button
          v-for="t in themes"
          :key="t.id"
          type="button"
          role="radio"
          :aria-checked="current.id === t.id"
          @click="current = t"
        >
          <span class="sw" :style="{ background: t.vars.bg, borderColor: t.vars.border }">
            <i :style="{ background: t.vars.link }"></i>
          </span>
          {{ t.name }}
        </button>
      </div>
      <p class="file">themes/{{ current.id }}/theme.css</p>
      <pre class="code" aria-live="polite"><code>{{ css }}</code></pre>
    </div>
    <article class="md doc" :style="style">
      <h2>部署说明</h2>
      <p>测试环境每次合并到 <code>main</code> 自动部署；生产环境每周二、周四晚上发布，详见<a href="#themes">发布日历</a>。</p>
      <blockquote>数据库迁移必须向前兼容：新版本上线前，旧版本要能在新表结构上正常运行。</blockquote>
      <ol>
        <li>合并 PR 后，流水线自动构建镜像</li>
        <li>镜像推送完成后滚动更新，约 3 分钟</li>
      </ol>
      <pre><code>kubectl rollout status deploy/order</code></pre>
    </article>
  </div>
</template>

<style scoped>
.show {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 32px;
  align-items: start;
}
.pick {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.pick button {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 500 15px/1.3 var(--font-sans);
  color: var(--fg);
  text-align: left;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
}
.pick button:hover {
  background: var(--hover);
}
.pick button[aria-checked='true'] {
  background: var(--bg-elev);
  border-color: var(--border);
}
.sw {
  position: relative;
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid;
}
.sw i {
  position: absolute;
  inset: 6px;
  border-radius: 50%;
}
.file {
  margin: 24px 0 8px;
  font: 13px var(--font-mono);
  color: var(--fg-muted);
}
.code {
  margin: 0;
  padding: 14px 16px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 8px;
  font: 13px/1.7 var(--font-mono);
  overflow-x: auto;
}
.doc {
  padding: 32px 40px;
  border: 1px solid var(--md-border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  font-size: 15px;
  transition: background-color 0.25s, color 0.25s;
}
.doc h2 {
  margin-top: 0;
}
.doc > :last-child {
  margin-bottom: 0;
}
@media (max-width: 860px) {
  .show {
    grid-template-columns: 1fr;
  }
  .doc {
    padding: 22px 20px;
  }
}
</style>
