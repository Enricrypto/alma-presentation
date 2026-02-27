import React from "react"
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion"
import { Slide1 } from "./slides/Slide1"
import { Slide2 } from "./slides/Slide2"
import { Slide3 } from "./slides/Slide3"
import { Slide4 } from "./slides/Slide4"
import { Slide5 } from "./slides/Slide5"
import { LogoFrame } from "./slides/LogoFrame"
import { VideoIntro } from "./slides/VideoIntro"
import { Logo } from "./components/Logo"
import { SLIDE_FRAMES } from "./motion"
import { Colors } from "./styles"

const VIDEO_FRAMES = 156 // ~5.2s at 30fps
export const LOGO_FRAMES = 150 // 5 seconds (logo + Alma BOT text + hold)
const SLIDE3_FRAMES = SLIDE_FRAMES + 90 // +3s — The Vision (bullet hold before zoom)
const SLIDE5_FRAMES = SLIDE_FRAMES + 90 // +4.5s — CLI demo
const TRANSITION = 12 // overlap between adjacent slides for true crossfade

// Each segment starts TRANSITION frames before the previous one ends so both
// are rendered simultaneously and the crossfade opacity animation overlaps.
const LOGO_OPEN_START = VIDEO_FRAMES - TRANSITION // 144
const S1_START = LOGO_OPEN_START + LOGO_FRAMES - TRANSITION // 282
const S2_START = S1_START + SLIDE_FRAMES - TRANSITION // 570
const S3_START = S2_START + SLIDE_FRAMES - TRANSITION // 858
const S4_START = S3_START + SLIDE3_FRAMES - TRANSITION // 1236
const S5_START = S4_START + SLIDE_FRAMES - TRANSITION // 1524
const LOGO_CLOSE_START = S5_START + SLIDE5_FRAMES - TRANSITION // 1962

export const TOTAL_FRAMES = LOGO_CLOSE_START + LOGO_FRAMES // 2112

const easing = Easing.bezier(0.4, 0.0, 0.2, 1)

const SEQUENCE: Array<{
  start: number
  duration: number
  render: (localFrame: number) => React.ReactNode
}> = [
  {
    start: 0,
    duration: VIDEO_FRAMES,
    render: (f) => <VideoIntro localFrame={f} />
  },
  {
    start: LOGO_OPEN_START,
    duration: LOGO_FRAMES,
    render: (f) => <LogoFrame localFrame={f} variant='open' />
  },
  {
    start: S1_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide1 localFrame={f} /> // Building Blocks
  },
  {
    start: S2_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide2 localFrame={f} /> // The Problem
  },
  {
    start: S3_START,
    duration: SLIDE3_FRAMES,
    render: (f) => <Slide3 localFrame={f} /> // The Vision
  },
  {
    start: S4_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide4 localFrame={f} /> // Execution Model
  },
  {
    start: S5_START,
    duration: SLIDE5_FRAMES,
    render: (f) => <Slide5 localFrame={f} /> // Live Demo
  },
  {
    start: LOGO_CLOSE_START,
    duration: LOGO_FRAMES,
    render: (f) => <LogoFrame localFrame={f} variant='close' />
  }
]

// Corner mark visible during all content slides
const CORNER_MARK_START = S1_START
const CORNER_MARK_END = S5_START + SLIDE5_FRAMES

export const LedgerlingPresentation: React.FC = () => {
  const frame = useCurrentFrame()

  const cornerOpacity = interpolate(
    frame,
    [
      CORNER_MARK_START,
      CORNER_MARK_START + 20,
      CORNER_MARK_END - 20,
      CORNER_MARK_END
    ],
    [0, 0.55, 0.55, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing }
  )

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary }}>
      {SEQUENCE.map((segment, index) => {
        const { start, duration, render } = segment
        const end = start + duration
        const localFrame = frame - start

        if (frame < start || frame >= end) return null

        const opacity = interpolate(
          frame,
          [start, start + TRANSITION, end - TRANSITION, end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing }
        )

        return (
          <AbsoluteFill key={index} style={{ opacity }}>
            {render(localFrame)}
          </AbsoluteFill>
        )
      })}

      {/* Persistent corner mark — bottom-right, all content slides */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          right: 44,
          opacity: cornerOpacity,
          pointerEvents: "none"
        }}
      >
        <Logo height={104} showText={false} color='#FFFFFF' />
      </div>
    </AbsoluteFill>
  )
}
