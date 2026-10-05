// 功能导览视频的章节（秒）。起点取自 promo-video/tour.html 渲染模式下的 window.__chap，
// 名称取自同一文件里的 CHAPTERS；导览改了时间轴要同步改这里
export interface Chapter {
  start: number
  label: string
}

export const TOUR_DURATION = 187.3

export const TOUR_CHAPTERS: Chapter[] = [
  { start: 0, label: '开场' },
  { start: 16.9, label: '秒开' },
  { start: 32.9, label: '按 E 编辑' },
  { start: 47.8, label: '实时预览' },
  { start: 93.8, label: '表格' },
  { start: 125.9, label: '/ 插入' },
  { start: 137.8, label: '属性与导出' },
  { start: 148.7, label: '工作区' },
  { start: 161.2, label: '主题' },
  { start: 169.7, label: '数据与路线图' }
]
