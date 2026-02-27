import React from "react"
import { AbsoluteFill, interpolate, Easing } from "remotion"
import { CLIWindow } from "../components/CLIWindow"
import type { CLILine } from "../components/CLIWindow"
import { Colors, Font } from "../styles"
import { fadeSlideIn } from "../motion"

interface SlideProps {
  localFrame: number
}

const easing = Easing.bezier(0.4, 0.0, 0.2, 1)

// Ghost pipeline — faint echo from Slide4
const GHOST_STEPS = [
  "Understand the Request",
  "Show the Cost",
  "Pay and Run",
  "Deliver the Result"
]
const GhostPipeline: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: 160,
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      opacity: 0.13,
      pointerEvents: "none"
    }}
  >
    {/* Background track */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 1,
        background: "rgba(59,130,246,0.4)",
        transform: "translateY(-50%)"
      }}
    />
    {GHOST_STEPS.map((label, i) => (
      <React.Fragment key={i}>
        <div
          style={{
            border: "1px solid rgba(59,130,246,0.5)",
            borderRadius: 4,
            padding: "18px 36px",
            minWidth: 210,
            textAlign: "center",
            background: "rgba(59,130,246,0.06)"
          }}
        >
          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.label,
              fontWeight: 500,
              color: "rgba(249,250,251,0.9)",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            {label}
          </div>
        </div>
        {i < GHOST_STEPS.length - 1 && (
          <div
            style={{
              width: 56,
              height: 1,
              background: "rgba(59,130,246,0.4)"
            }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
)

// Hardcoded CLI script — static demo flow
const CLI_LINES: CLILine[] = [
  {
    text: 'Alma Bot run "Find the best ETH yield across major platforms"',
    type: "command",
    startFrame: 30
  },
  { text: "Understanding your request...", type: "output", startFrame: 75 },
  { text: "Breaking it into clear steps...", type: "output", startFrame: 92 },
  { text: "Calculating total cost...", type: "output", startFrame: 108 },
  { text: "Estimated cost: $0.42", type: "system", startFrame: 122 },
  { text: "Waiting for your approval...", type: "system", startFrame: 140 },
  { text: "Approved ✓", type: "success", startFrame: 164 },
  { text: "Running each step securely...", type: "system", startFrame: 174 },
  { text: "  Step 1 complete ✓", type: "success", startFrame: 188 },
  { text: "  Step 2 complete ✓", type: "success", startFrame: 202 },
  { text: "  Step 3 complete ✓", type: "success", startFrame: 216 },
  { text: "Putting everything together...", type: "output", startFrame: 230 },
  { text: "Best option: 8.2% APY", type: "system", startFrame: 244 },
  { text: "Final cost: $0.39", type: "output", startFrame: 252 },
  { text: "Done ✓", type: "success", startFrame: 264 }
]

export const Slide5: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)

  // Terminal fades in and slides up slightly
  const terminalOpacity = interpolate(frame, [10, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  })
  const terminalY = interpolate(frame, [10, 32], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  })

  // Fade to black at end — slide is 450 frames, hold until 390 then fade (2s black at end)
  const fadeOut = interpolate(frame, [390, 410], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  })

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      {/* Ghost pipeline — faint echo from Slide4 */}
      <GhostPipeline />

      {/* Dark overlay to ensure ghost doesn't compete with terminal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(11,15,20,0.72)",
          pointerEvents: "none"
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          left: 160,
          right: 160,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0
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
            marginBottom: 36,
            ...labelAnim
          }}
        >
          05 - Live Demo
        </div>

        {/* Terminal */}
        <div
          style={{
            opacity: terminalOpacity,
            transform: `translateY(${terminalY}px)`
          }}
        >
          <CLIWindow frame={frame} lines={CLI_LINES} showCursor={frame < 390} />
        </div>
      </div>

      {/* Fade-to-black overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          opacity: fadeOut,
          pointerEvents: "none"
        }}
      />
    </AbsoluteFill>
  )
}
