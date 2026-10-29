// 使用指南的 Markdown 在拷进网站时加工一遍（scripts/sync.mjs 调用），网站的 Markdown 处理不用改：
//   相对链接   12-folders.md#x → ../12-folders/#x（首页是 ./）；图 → <img src="../images/a.webp">
//   提示框     > [!NOTE] → 引用块第一行写「注意」，样式见 src/layouts/Guide.astro
//   Mermaid    ```mermaid 代码块 → <pre class="mermaid">，页面上再画出来
//   按键       行内代码是按键的（`Ctrl+S`）→ <kbd>
// 不碰代码块里面的内容。

const ALERTS = { NOTE: '注意', TIP: '提示', IMPORTANT: '重要', WARNING: '警告', CAUTION: '小心' }

/** 一段行内代码是不是按键：Ctrl+S、Alt+↑、F5、Esc、单个字母…… */
const KEY = /^(((Ctrl|Alt|Shift)\+)*(F\d{1,2}|Esc|Enter|Tab|Backspace|Delete|Home|End|PageUp|PageDown|空格|中键|方向键|[↑↓←→]|[A-Za-z0-9]|[,./\\[\]=+-])|(Ctrl|Alt|Shift)[+ ]\S+)$/

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** 一行正文（不在代码块里）的加工；`up` 是到指南目录的相对前缀（'../' 或 './'）。 */
function line(text, up) {
  // 行内代码先拿出来，换完链接再放回去
  const codes = []
  let t = text.replace(/(`+)([^`]|[^`].*?[^`])\1(?!`)/g, (m, _ticks, body) => {
    const key = body.trim()
    codes.push(KEY.test(key) ? `<kbd>${escapeHtml(key).replace(/\\/g, '&#92;')}</kbd>` : m)
    return `\u0000${codes.length - 1}\u0000`
  })
  // 图写成 <img>：Markdown 的图 Astro 会当成要打包的文件去找，图在 public/guide/images 里；点图在新标签看原图
  t = t.replace(/!\[([^\]]*)\]\((images\/[^)\s]+)\)/g, (_m, alt, src) => `<a class="shot" href="${up}${src}" target="_blank"><img src="${up}${src}" alt="${escapeHtml(alt).replace(/"/g, '&quot;')}" loading="lazy" decoding="async"></a>`)
  t = t.replace(/(!?\[[^\]]*\]\()([^)\s]+)(\))/g, (m, open, href, close) => {
    if (/^([a-z]+:|#|\/)/i.test(href)) return m
    const [file, hash] = href.split('#')
    let to = href
    if (/\.md$/i.test(file)) {
      const name = file.replace(/\.md$/i, '')
      to = `${up}${name === 'README' ? '' : `${name}/`}${hash ? `#${hash}` : ''}`
    } else if (file.startsWith('images/')) to = up + file
    return open + to + close
  })
  t = t.replace(/^(\s*>\s*)\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/, (_m, quote, kind) => `${quote}<strong class="alert-title" data-kind="${kind.toLowerCase()}">${ALERTS[kind]}</strong>`)
  return t.replace(/\u0000(\d+)\u0000/g, (_m, i) => codes[Number(i)])
}

/** 一页指南；`index` 为 true 时是首页（网址 /guide/），否则是一章（/guide/xx/）。 */
export function guidePage(text, index) {
  const up = index ? './' : '../'
  const out = []
  let fence = null
  let mermaid = null
  for (const l of text.split(/\r?\n/)) {
    const f = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(l)
    if (fence) {
      if (f && f[2].startsWith(fence)) {
        if (mermaid) out.push(`<pre class="mermaid">${escapeHtml(mermaid.join('\n'))}</pre>`)
        else out.push(l)
        fence = null
        mermaid = null
      } else if (mermaid) mermaid.push(l)
      else out.push(l)
      continue
    }
    if (f) {
      fence = f[2]
      if (f[3].trim() === 'mermaid') mermaid = []
      else out.push(l)
      continue
    }
    out.push(line(l, up))
  }
  return out.join('\n')
}
