<script setup lang="ts">
// 视频播放器：视频无声，滚到视口里自动静音播放、滚出去暂停；
// 「减少动态效果」或省流量时不自动播，只给封面和播放键。手机与省流量用 720p。
// 下方章节条按片段时长等比分段，同时是进度条，点一段跳到那里。
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Chapter } from '../lib/tour'

const props = defineProps<{
  src: string
  srcSmall: string
  poster: string
  /** 章节起点（秒），第一章从 0 开始 */
  chapters: Chapter[]
  duration: number
  label: string
}>()

const CHAPTERS = props.chapters.map((c, i) => ({
  ...c,
  end: props.chapters[i + 1]?.start ?? props.duration
}))

// 秒 → m:ss
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const video = ref<HTMLVideoElement>()
const playing = ref(false)
const time = ref(0)
const autoplay = ref(true)
// 「想不想播」只由访客的操作改变；滚出视口的暂停不算
const wantPlay = ref(true)
let visible = false
let io: IntersectionObserver | undefined
let raf = 0

const current = computed(() => {
  const i = CHAPTERS.findIndex((c) => time.value < c.end)
  return i < 0 ? CHAPTERS.length - 1 : i
})

function fill(c: (typeof CHAPTERS)[number]) {
  return Math.min(1, Math.max(0, (time.value - c.start) / (c.end - c.start)))
}

function tick() {
  if (video.value) time.value = video.value.currentTime
  raf = requestAnimationFrame(tick)
}

function onPlay() {
  playing.value = true
  cancelAnimationFrame(raf)
  tick()
}

function onPause() {
  playing.value = false
  cancelAnimationFrame(raf)
  if (video.value) time.value = video.value.currentTime
}

function play() {
  video.value?.play().catch(() => {
    // 浏览器拒绝自动播放时退回到点播
    wantPlay.value = false
  })
}

function toggle() {
  const v = video.value
  if (!v) return
  if (v.paused) {
    wantPlay.value = true
    play()
  } else {
    wantPlay.value = false
    v.pause()
  }
}

function seek(c: (typeof CHAPTERS)[number]) {
  const v = video.value
  if (!v) return
  v.currentTime = c.start
  time.value = c.start
  wantPlay.value = true
  play()
}

function fullscreen() {
  const v = video.value as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | undefined
  if (!v) return
  if (v.requestFullscreen) v.requestFullscreen().catch(() => {})
  else v.webkitEnterFullscreen?.()
}

onMounted(() => {
  const v = video.value
  if (!v) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
  autoplay.value = !reduce && !saveData
  wantPlay.value = autoplay.value
  // preload=none，此时还没下载任何内容，换源不浪费流量
  if (saveData || matchMedia('(max-width: 760px)').matches) v.src = props.srcSmall

  io = new IntersectionObserver(
    ([en]) => {
      visible = en.isIntersecting && en.intersectionRatio >= 0.5
      if (visible && wantPlay.value && v.paused) play()
      else if (!visible && !v.paused) v.pause()
    },
    { threshold: [0, 0.5] }
  )
  io.observe(v)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="player">
    <div class="frame">
      <video
        ref="video"
        :src="src"
        :poster="poster"
        width="1920"
        height="1080"
        preload="none"
        muted
        playsinline
        :loop="autoplay"
        :aria-label="label"
        @play="onPlay"
        @pause="onPause"
        @click="toggle"
      ></video>
      <button v-if="!playing" type="button" class="big-play" aria-label="播放视频" @click="toggle">
        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
      </button>
    </div>

    <div class="controls">
      <button type="button" class="ctl" :aria-label="playing ? '暂停' : '播放'" @click="toggle">
        <svg v-if="playing" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
      </button>
      <div class="chapters" role="group" aria-label="视频章节">
        <button
          v-for="(c, i) in CHAPTERS"
          :key="c.label"
          type="button"
          class="chap"
          :class="{ on: i === current && time > 0 }"
          :style="{ flexGrow: c.end - c.start }"
          :title="c.label"
          :aria-label="`跳到「${c.label}」，${clock(c.start)}`"
          :aria-current="i === current && time > 0 ? 'step' : undefined"
          @click="seek(c)"
        >
          <span class="track"><span class="fill" :style="{ transform: `scaleX(${fill(c)})` }"></span></span>
          <span class="name">{{ c.label }}</span>
        </button>
      </div>
      <span class="clock" aria-hidden="true">{{ clock(time) }} / {{ clock(duration) }}</span>
      <button type="button" class="ctl" aria-label="全屏播放" @click="fullscreen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <p class="now" aria-hidden="true">{{ CHAPTERS[current].label }}</p>
  </div>
</template>

<style scoped>
.player {
  --ink: #eceae4;
  --muted: #8e949d;
  --hi: #6cbfe0;
}
.frame {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 8%);
  box-shadow: 0 30px 80px -20px rgb(0 0 0 / 60%);
  background: #0d1014;
}
video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}
.big-play {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 76px;
  height: 76px;
  margin: -38px 0 0 -38px;
  display: grid;
  place-items: center;
  padding-left: 4px;
  color: #0d1014;
  background: rgb(236 234 228 / 92%);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgb(0 0 0 / 40%);
  cursor: pointer;
  transition: transform 0.15s;
}
.big-play:hover {
  transform: scale(1.06);
}
.controls {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 18px;
}
.ctl {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-top: -12px;
  color: var(--ink);
  background: rgb(255 255 255 / 6%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 8px;
  cursor: pointer;
}
.ctl:hover {
  background: rgb(255 255 255 / 12%);
}
.chapters {
  flex: 1;
  min-width: 0;
  display: flex;
  gap: 4px;
}
.chap {
  flex-basis: 0;
  min-width: 0;
  padding: 0;
  text-align: left;
  color: var(--muted);
  background: none;
  border: 0;
  cursor: pointer;
  font: 13px/1.3 var(--font-sans);
}
.track {
  display: block;
  height: 4px;
  border-radius: 2px;
  background: rgb(255 255 255 / 14%);
  overflow: hidden;
}
.fill {
  display: block;
  height: 100%;
  background: var(--hi);
  transform-origin: 0 50%;
}
.name {
  display: block;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chap:hover .name,
.chap.on .name {
  color: var(--ink);
}
.chap:hover .track {
  background: rgb(255 255 255 / 24%);
}
.clock {
  flex: none;
  margin-top: -6px;
  font: 13px var(--font-sans);
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.now {
  display: none;
}
@media (max-width: 760px) {
  .controls {
    align-items: center;
  }
  .ctl,
  .clock {
    margin-top: 0;
  }
  .chapters {
    gap: 3px;
  }
  .name {
    display: none;
  }
  .now {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: var(--muted);
    text-align: center;
  }
}
@media (prefers-reduced-motion: reduce) {
  .big-play {
    transition: none;
  }
}
</style>
