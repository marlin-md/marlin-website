// 功能导览视频的章节（秒）。起点取自 promo-video/tour.html 渲染模式下的 window.__chap，
// 名称取自同一文件里的 CHAPTERS；导览改了时间轴要同步改这里
export interface Chapter {
  start: number
  label: string
}

export const TOUR_DURATION = 294.4

export const TOUR_CHAPTERS: Chapter[] = [
  { start: 0, label: '开场' },
  { start: 16.9, label: '秒开' },
  { start: 32.9, label: '按 E 编辑' },
  { start: 47.8, label: '实时预览' },
  { start: 86.4, label: '表格' },
  { start: 118.5, label: '画板' },
  { start: 163, label: 'AI 写作' },
  { start: 194.5, label: '/ 插入' },
  { start: 206.4, label: '属性与导出' },
  { start: 217.3, label: '工作区' },
  { start: 229.8, label: 'Git 同步' },
  { start: 247.5, label: '文档历史' },
  { start: 258.6, label: '放映' },
  { start: 273.7, label: '主题' },
  { start: 282.2, label: '实测数据' }
]
