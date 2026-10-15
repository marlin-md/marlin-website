// 功能导览视频的章节（秒）。起点取自 promo-video/tour.html 渲染模式下的 window.__chap，
// 名称取自同一文件里的 CHAPTERS；导览改了时间轴要同步改这里
export interface Chapter {
  start: number
  label: string
}

export const TOUR_DURATION = 251.8

export const TOUR_CHAPTERS: Chapter[] = [
  { start: 0, label: '开场' },
  { start: 16.9, label: '秒开' },
  { start: 32.9, label: '按 E 编辑' },
  { start: 47.8, label: '实时预览' },
  { start: 86.4, label: '表格' },
  { start: 118.5, label: '画板' },
  { start: 163, label: '/ 插入' },
  { start: 174.9, label: '属性与导出' },
  { start: 185.8, label: '工作区' },
  { start: 198.3, label: 'Git 同步' },
  { start: 216, label: '放映' },
  { start: 231.1, label: '主题' },
  { start: 239.6, label: '实测数据' }
]
