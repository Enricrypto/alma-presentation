import React from "react"
import { AbsoluteFill } from "remotion"
import { Colors, Font } from "../styles"
import { fadeSlideIn } from "../motion"

interface SlideProps {
  localFrame: number
}

const GridBackground: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px"
    }}
  />
)

const PAIRS = [
  {
    stop: "Stop managing tools",
    start: "Start getting results"
  },
  {
    stop: "Stop running workflows",
    start: "Start finishing outcomes"
  },
  {
    stop: "Stop paying for multiple SaaS",
    start: "Start using one intelligent layer"
  }
]

export const Slide2: React.FC<SlideProps> = ({ localFrame: frame }) => {
  // Zone 1 — title
  const labelAnim = fadeSlideIn(frame, 8, 18, 10)
  const titleAnim = fadeSlideIn(frame, 18, 26, 14)

  // Zone 2 — transformation pairs (stop fades in first, start follows)
  const stopAnims = [
    fadeSlideIn(frame, 52, 20, 10),
    fadeSlideIn(frame, 88, 20, 10),
    fadeSlideIn(frame, 124, 20, 10)
  ]
  const startAnims = [
    fadeSlideIn(frame, 68, 24, 12),
    fadeSlideIn(frame, 104, 24, 12),
    fadeSlideIn(frame, 140, 24, 12)
  ]

  // Zone 3 — hero statement
  const hero1Anim = fadeSlideIn(frame, 178, 30, 16)
  const hero2Anim = fadeSlideIn(frame, 194, 30, 16)

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* ── ZONE 1: Title ──────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 168,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18
        }}
      >
        <div
          style={{
            fontFamily: Font.family,
            fontSize: Font.size.micro,
            fontWeight: Font.weight.light,
            color: Colors.accent.blue,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            ...labelAnim
          }}
        >
          02 - What is Alma?
        </div>

        <div
          style={{
            fontFamily: Font.family,
            fontSize: 52,
            fontWeight: Font.weight.semibold,
            color: Colors.text.primary,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            textAlign: "center",
            ...titleAnim
          }}
        >
          An intelligent system that delivers precise answers to complex
          questions
        </div>
      </div>

      {/* ── ZONE 2: Transformation pairs ───────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 340,
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 52
        }}
      >
        {PAIRS.map((pair, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8
            }}
          >
            {/* Stop — muted, smaller */}
            <div style={{ ...stopAnims[i] }}>
              <div
                style={{
                  fontFamily: Font.family,
                  fontSize: 24,
                  fontWeight: Font.weight.light,
                  color: Colors.text.secondary,
                  opacity: 0.45,
                  letterSpacing: "-0.01em",
                  textAlign: "center"
                }}
              >
                {pair.stop}
              </div>
            </div>

            {/* Start — bright, larger */}
            <div
              style={{
                fontFamily: Font.family,
                fontSize: 36,
                fontWeight: Font.weight.semibold,
                color: Colors.text.primary,
                letterSpacing: "-0.02em",
                textAlign: "center",
                ...startAnims[i]
              }}
            >
              {pair.start}
            </div>
          </div>
        ))}
      </div>

      {/* ── ZONE 3: Hero statement ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 96,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10
        }}
      >
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 28,
            fontWeight: Font.weight.regular,
            color: Colors.text.secondary,
            letterSpacing: "-0.01em",
            textAlign: "center",
            ...hero1Anim
          }}
        >
          You decide what needs to happen.
        </div>

        <div
          style={{
            fontFamily: Font.family,
            fontSize: 34,
            fontWeight: Font.weight.semibold,
            color: Colors.accent.blue,
            letterSpacing: "-0.02em",
            textAlign: "center",
            ...hero2Anim
          }}
        >
          Alma makes it happen.
        </div>
      </div>
    </AbsoluteFill>
  )
}
