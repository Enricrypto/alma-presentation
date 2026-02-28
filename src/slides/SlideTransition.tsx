import React from "react"
import { AbsoluteFill, interpolate } from "remotion"
import { Colors, Font } from "../styles"
import { fadeSlideIn } from "../motion"

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

export const SlideTransition: React.FC<SlideProps> = ({
  localFrame: frame
}) => {
  const headlineAnim = fadeSlideIn(frame, 8, 26, 20)
  const supportAnim = fadeSlideIn(frame, 42, 22, 14)
  const bridgeAnim = fadeSlideIn(frame, 74, 26, 18)

  const glowOpacity = interpolate(
    frame,
    [74, 100, 130, 150],
    [0, 0.32, 0.18, 0.14],
    clamp
  )

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* Radial glow — accent behind the Alma mention */}
      <div
        style={{
          position: "absolute",
          top: "64%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 640,
          height: 160,
          background: `radial-gradient(ellipse, rgba(59,130,246,${glowOpacity}) 0%, transparent 70%)`,
          pointerEvents: "none"
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 52,
          padding: "0 220px",
          textAlign: "center"
        }}
      >
        {/* Main headline */}
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 68,
            fontWeight: Font.weight.semibold,
            color: Colors.text.primary,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            ...headlineAnim
          }}
        >
          There's a better way.
        </div>

        {/* Supporting text */}
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 27,
            fontWeight: Font.weight.light,
            color: Colors.text.secondary,
            lineHeight: 1.65,
            maxWidth: 820,
            ...supportAnim
          }}
        >
          Companies are losing millions every year to too many tools, constant
          switching, and fragmented workflows.
        </div>

        {/* Bridge to Alma */}
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 30,
            fontWeight: Font.weight.medium,
            color: Colors.text.primary,
            lineHeight: 1.5,
            maxWidth: 860,
            ...bridgeAnim
          }}
        >
          Meet{" "}
          <span
            style={{
              color: Colors.accent.blue,
              fontWeight: Font.weight.semibold
            }}
          >
            Alma
          </span>{" "}
          - the engine that turns your intent into one guaranteed result,
          without the hassle.
        </div>
      </div>
    </AbsoluteFill>
  )
}
