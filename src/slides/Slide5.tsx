import React from "react"
import { AbsoluteFill, interpolate } from "remotion"
import { Colors, Font } from "../styles"
import { fadeSlideIn } from "../motion"
import { Logo } from "../components/Logo"

interface SlideProps {
  localFrame: number
}

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const
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

export const Slide5: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const headlineAnim = fadeSlideIn(frame, 18, 28, 20)
  const subAnim = fadeSlideIn(frame, 46, 22, 14)

  const glowOpacity = interpolate(
    frame,
    [18, 60, 240, 280],
    [0, 0.28, 0.22, 0],
    clamp
  )

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 300,
          background: `radial-gradient(ellipse, rgba(59,130,246,${glowOpacity}) 0%, transparent 70%)`,
          pointerEvents: "none"
        }}
      />

      {/* Chapter label — top left */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 72,
          fontFamily: Font.family,
          fontSize: Font.size.micro,
          fontWeight: Font.weight.light,
          color: Colors.accent.blue,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          ...labelAnim
        }}
      >
        05 - Live Demo
      </div>

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32
        }}
      >
        <div style={{ ...headlineAnim }}>
          <Logo height={80} color='#FFFFFF' />
        </div>

        <div
          style={{
            fontFamily: Font.family,
            fontSize: Font.size.title,
            fontWeight: Font.weight.semibold,
            color: Colors.text.primary,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            textAlign: "center",
            ...headlineAnim
          }}
        >
          Live Demo
        </div>
      </div>
    </AbsoluteFill>
  )
}
