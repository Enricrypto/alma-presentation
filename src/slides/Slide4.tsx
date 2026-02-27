import React from "react"
import { AbsoluteFill, interpolate, Easing } from "remotion"
import { PipelineStep } from "../components/PipelineStep"
import { Colors, Font } from "../styles"
import { fadeSlideIn } from "../motion"

interface SlideProps {
  localFrame: number
}

const easing = Easing.bezier(0.4, 0.0, 0.2, 1)

// BOX_HALF_HEIGHT must match the constant in PipelineStep.tsx
const BOX_HALF_HEIGHT = 47

const STEPS = [
  {
    label: "Understand the Request",
    sublabel: "Break it into clear actions",
    activateAt: 38,
    isPulse: false,
    detail: "Your question is translated into specific tasks",
    detailActivateAt: 56
  },
  {
    label: "Show the Cost Upfront",
    sublabel: "Know the price before starting",
    activateAt: 68,
    isPulse: false,
    detail: "The full cost is calculated in advance",
    detailActivateAt: 86
  },
  {
    label: "Pay and Run Each Step",
    sublabel: "Each action is completed in order",
    activateAt: 98,
    isPulse: true,
    detail: "Every step is confirmed before moving forward",
    detailActivateAt: 116
  },
  {
    label: "Deliver the Final Result",
    sublabel: "Everything returned in one response",
    activateAt: 128,
    isPulse: false,
    detail: "You receive a complete, unified answer",
    detailActivateAt: 158
  }
]

export const Slide4: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  const streakX = interpolate(frame, [38, 150], [-60, 1120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  })
  const streakOpacity = interpolate(frame, [38, 50, 138, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  const pipelineOpacity = interpolate(frame, [20, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  })

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 160,
          right: 160,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        {/* Chapter label */}
        <div
          style={{
            fontFamily: Font.family,
            fontSize: Font.size.micro,
            fontWeight: Font.weight.light,
            color: Colors.accent.blue,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 32,
            ...labelAnim
          }}
        >
          04 - Execution Model
        </div>

        {/* Title */}
        <div style={{ marginBottom: 16, ...titleAnim }}>
          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.title,
              fontWeight: Font.weight.semibold,
              color: Colors.text.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.12
            }}
          >
            From Question to Answer - Instantly
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: Colors.accent.blue,
            marginBottom: 72,
            opacity: 0.6
          }}
        />

        {/* Pipeline row — top-aligned so detail labels hang below each box */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            opacity: pipelineOpacity
          }}
        >
          {/* Background track — positioned at box center, not row center */}
          <div
            style={{
              position: "absolute",
              top: BOX_HALF_HEIGHT,
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(59, 130, 246, 0.08)",
              pointerEvents: "none"
            }}
          />

          {/* Light streak — travels at same height as background track */}
          <div
            style={{
              position: "absolute",
              top: BOX_HALF_HEIGHT - 30,
              left: streakX,
              width: 60,
              height: 60,
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%)",
              opacity: streakOpacity,
              pointerEvents: "none"
            }}
          />

          {STEPS.map((step, i) => (
            <PipelineStep
              key={i}
              frame={frame}
              label={step.label}
              sublabel={step.sublabel}
              activateAt={step.activateAt}
              isLast={i === STEPS.length - 1}
              isPulse={step.isPulse}
              detail={step.detail}
              detailActivateAt={step.detailActivateAt}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}
