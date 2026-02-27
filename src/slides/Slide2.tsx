import React from "react"
import { AbsoluteFill, interpolate } from "remotion"
import { Bullet } from "../components/Bullet"
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

export const Slide2: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const bullets = [
    "Modern teams rely on dozens of SaaS tools",
    "Users need outcomes - not API integrations",
    "Manual workflows waste capital at every step"
  ]

  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* Content column — left-aligned, generous negative space */}
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 0,
          bottom: 0,
          width: 780,
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
          02 - The Problem
        </div>

        {/* Title block */}
        <div style={{ marginBottom: 16, ...titleAnim }}>
          {["Too Many Tools,", "Too Little Time"].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: Font.family,
                fontSize: Font.size.title,
                fontWeight: Font.weight.semibold,
                color: Colors.text.primary,
                letterSpacing: "-0.02em",
                lineHeight: 1.12
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: Colors.accent.blue,
            marginBottom: 56,
            opacity: 0.6
          }}
        />

        <Bullet frame={frame} items={bullets} delay={52} stagger={9} />
      </div>
    </AbsoluteFill>
  )
}
