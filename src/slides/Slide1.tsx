import React from "react"
import { AbsoluteFill, interpolate } from "remotion"
import { Colors, Font } from "../styles"
import { fadeSlideIn, staggeredFadeIn } from "../motion"

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

interface Bullet {
  text: string
  sup?: string
}

interface DataBlock {
  number: string
  title: string
  bullets: Bullet[]
  arrow: string
  sourceNote: string
  color: string
}

const DATA_BLOCKS: DataBlock[] = [
  {
    number: "01",
    title: "Too Many Tools",
    bullets: [
      {
        text: "Average company runs +100 SaaS apps depending on size",
        sup: "¹"
      },
      { text: "44% of SaaS licenses are wasted or underutilized" }
    ],
    arrow: "Measurable budget loss - not just inefficiency",
    sourceNote:
      "¹ Okta Businesses at Work 2024 · Zylo SaaS Management Index 2023",
    color: "#3B82F6"
  },
  {
    number: "02",
    title: "Constant Context Switching",
    bullets: [
      {
        text: "1,200+ app switches per day - up to 40% of productivity lost",
        sup: "²"
      },
      { text: "23+ minutes to regain focus after a single interruption" }
    ],
    arrow: "Nearly a full workday lost every week",
    sourceNote: "² HBR app-switching research · UC Irvine / Gloria Mark",
    color: "#14B8A6"
  },
  {
    number: "03",
    title: "Fragmentation Has a Price",
    bullets: [
      { text: "Software complexity drains ~7% of annual revenue", sup: "³" },
      { text: "20% of software budgets lost to failed implementations" }
    ],
    arrow: "Hidden inefficiencies that compound into millions",
    sourceNote: "³ Freshworks 2025 Cost of Complexity Report",
    color: "#F59E0B"
  }
]

export const Slide1: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)
  const subtitleAnim = fadeSlideIn(frame, 28, 22, 12)
  const closingAnim = fadeSlideIn(frame, 110, 22, 14)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], clamp)

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* Header section */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 72,
          right: 120
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
            marginBottom: 24,
            ...labelAnim
          }}
        >
          01 - The Problem
        </div>

        {/* Title */}
        <div style={{ marginBottom: 14, ...titleAnim }}>
          {[
            "Software complexity is quietly",
            "draining millions every year."
          ].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: Font.family,
                fontSize: Font.size.subtitle,
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
            opacity: 0.6
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: Font.family,
            fontSize: Font.size.label,
            fontWeight: Font.weight.light,
            color: Colors.text.secondary,
            marginTop: 18,
            maxWidth: 860,
            lineHeight: 1.55,
            ...subtitleAnim
          }}
        >
          Not one big problem - thousands of small frictions, quietly
          compounding.
        </div>
      </div>

      {/* 3 Data blocks */}
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 348,
          bottom: 110,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20
        }}
      >
        {DATA_BLOCKS.map((block, i) => {
          const anim = staggeredFadeIn(frame, i, 60, 14)
          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.022)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderLeft: `3px solid ${block.color}`,
                borderRadius: 8,
                padding: "26px 28px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                ...anim
              }}
            >
              {/* Background number */}
              <div
                style={{
                  fontFamily: Font.family,
                  fontSize: 52,
                  fontWeight: Font.weight.bold,
                  color: block.color,
                  opacity: 0.18,
                  lineHeight: 1,
                  letterSpacing: "-0.04em"
                }}
              >
                {block.number}
              </div>

              {/* Block title */}
              <div
                style={{
                  fontFamily: Font.family,
                  fontSize: Font.size.label,
                  fontWeight: Font.weight.semibold,
                  color: Colors.text.primary,
                  letterSpacing: "0.01em"
                }}
              >
                {block.title}
              </div>

              {/* Short rule */}
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: block.color,
                  opacity: 0.4
                }}
              />

              {/* Bullet list */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {block.bullets.map((b, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start"
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: block.color,
                        flexShrink: 0,
                        marginTop: 10
                      }}
                    />
                    <div
                      style={{
                        fontFamily: Font.family,
                        fontSize: 21,
                        fontWeight: Font.weight.regular,
                        color: Colors.text.secondary,
                        lineHeight: 1.55
                      }}
                    >
                      {b.text}
                      {b.sup && (
                        <sup
                          style={{
                            fontFamily: Font.family,
                            fontSize: 14,
                            fontWeight: Font.weight.light,
                            color: block.color,
                            opacity: 0.7,
                            marginLeft: 2,
                            verticalAlign: "super",
                            lineHeight: 0
                          }}
                        >
                          {b.sup}
                        </sup>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow conclusion */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: 14,
                  fontFamily: Font.family,
                  fontSize: 19,
                  fontWeight: Font.weight.medium,
                  color: block.color,
                  lineHeight: 1.4,
                  marginTop: "auto"
                }}
              >
                → {block.arrow}
              </div>

              {/* Source note */}
              <div
                style={{
                  fontFamily: Font.family,
                  fontSize: 14,
                  fontWeight: Font.weight.light,
                  color: Colors.text.secondary,
                  opacity: 0.6,
                  lineHeight: 1.4
                }}
              >
                {block.sourceNote}
              </div>
            </div>
          )
        })}
      </div>

      {/* Closing line */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 120,
          right: 120,
          fontFamily: Font.family,
          fontSize: Font.size.label,
          fontWeight: Font.weight.light,
          color: Colors.text.secondary,
          ...closingAnim
        }}
      >
        Modern companies are{" "}
        <span
          style={{ color: Colors.text.primary, fontWeight: Font.weight.medium }}
        >
          not short on tools
        </span>
        . They are{" "}
        <span
          style={{
            color: Colors.accent.blue,
            fontWeight: Font.weight.semibold
          }}
        >
          drowning in them
        </span>
        .
      </div>
    </AbsoluteFill>
  )
}
