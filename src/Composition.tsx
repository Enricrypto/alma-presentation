import React from "react"
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion"
import { Slide1 } from "./slides/Slide1"
import { Slide2 } from "./slides/Slide2"
import { Slide3 } from "./slides/Slide3"
import { Slide4 } from "./slides/Slide4"
import { Slide5 } from "./slides/Slide5"
import { Slide6 } from "./slides/Slide6"
import { Slide7 } from "./slides/Slide7"
import { SlideTransition } from "./slides/SlideTransition"
import { LogoFrame } from "./slides/LogoFrame"
import { VideoIntro } from "./slides/VideoIntro"
import { Logo } from "./components/Logo"
import { SLIDE_FRAMES } from "./motion"
import { Colors } from "./styles"

const VIDEO_FRAMES = 156 // ~5.2s at 30fps
export const LOGO_FRAMES = 150 // 5 seconds
const SLIDE_TRANSITION_FRAMES = 150 // 5s — "There's a better way"
const TRANSITION = 12 // overlap between adjacent slides for crossfade

// Each segment starts TRANSITION frames before the previous one ends so both
// are rendered simultaneously and the crossfade opacity animation overlaps.
const LOGO_OPEN_START = VIDEO_FRAMES - TRANSITION // 144
const S1_START = LOGO_OPEN_START + LOGO_FRAMES - TRANSITION // 282
const ST_START = S1_START + SLIDE_FRAMES - TRANSITION // 570 — transition slide
const S2_START = ST_START + SLIDE_TRANSITION_FRAMES - TRANSITION // 708
const S3_START = S2_START + SLIDE_FRAMES - TRANSITION // 996
const S4_START = S3_START + SLIDE_FRAMES - TRANSITION // 1284
const S5_START = S4_START + SLIDE_FRAMES - TRANSITION // 1572 — Live Demo
const S6_START = S5_START + SLIDE_FRAMES - TRANSITION // 1860 — Business Model
const S7_START = S6_START + SLIDE_FRAMES - TRANSITION // 2148 — Roadmap
const LOGO_CLOSE_START = S7_START + SLIDE_FRAMES - TRANSITION // 2436

export const TOTAL_FRAMES = LOGO_CLOSE_START + LOGO_FRAMES // 2586

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
    render: (f) => <Slide1 localFrame={f} /> // The Problem
  },
  {
    start: ST_START,
    duration: SLIDE_TRANSITION_FRAMES,
    render: (f) => <SlideTransition localFrame={f} /> // There's a better way
  },
  {
    start: S2_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide2 localFrame={f} /> // Meet Alma
  },
  {
    start: S3_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide3 localFrame={f} /> // The Ecosystem
  },
  {
    start: S4_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide4 localFrame={f} /> // How It Works
  },
  {
    start: S5_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide5 localFrame={f} /> // Live Demo
  },
  {
    start: S6_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide6 localFrame={f} /> // Business Model
  },
  {
    start: S7_START,
    duration: SLIDE_FRAMES,
    render: (f) => <Slide7 localFrame={f} /> // Roadmap
  },
  {
    start: LOGO_CLOSE_START,
    duration: LOGO_FRAMES,
    render: (f) => <LogoFrame localFrame={f} variant='close' />
  }
]

// Corner mark visible during all content slides
const CORNER_MARK_START = S1_START
const CORNER_MARK_END = S7_START + SLIDE_FRAMES // 2448

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
