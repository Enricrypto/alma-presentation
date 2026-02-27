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

interface Category {
  label: string
  color: string
  bricks: Array<{ name: string; desc: string }>
}

const CATEGORIES: Category[] = [
  {
    label: "Data & Intelligence",
    color: "#3B82F6",
    bricks: [
      {
        name: "API Endpoints",
        desc: "45+ paid APIs · data · LLM · scraping · images · DeFi"
      }
    ]
  },
  {
    label: "Facilitators & Discovery",
    color: "#14B8A6",
    bricks: [
      { name: "22 Facilitators", desc: "Connect services across chains" },
      { name: "Bazaar", desc: "Discovery layer - finds possibilities" }
    ]
  },
  {
    label: "Trust & Orchestration",
    color: "#8B5CF6",
    bricks: [
      { name: "Rencom", desc: "Reputation scoring" },
      { name: "Agently", desc: "Orchestration for multi-step tasks" }
    ]
  },
  {
    label: "Budget & Workflow",
    color: "#F59E0B",
    bricks: [
      { name: "Locus / ampsend", desc: "Budget management" },
      { name: "x402jobs", desc: "Workflow builder" }
    ]
  },
  {
    label: "Security & Privacy",
    color: "#10B981",
    bricks: [
      { name: "x402-secure / zauth", desc: "Security & risk controls" },
      { name: "x402r", desc: "Refunds" },
      { name: "px402 / zkStash", desc: "Privacy bricks" }
    ]
  },
  {
    label: "Integration & Insights",
    color: "#F43F5E",
    bricks: [
      { name: "Oops!402 / Dexter", desc: "MCP integration" },
      { name: "x402scan / x402station", desc: "Analytics & monitoring" }
    ]
  }
]

export const Slide1: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)
  const subtitleAnim = fadeSlideIn(frame, 28, 22, 12)

  const dividerWidth = interpolate(frame, [38, 62], [0, 72], clamp)

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* ── TITLE SECTION ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 76,
          left: 120,
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
            marginBottom: 22,
            ...labelAnim
          }}
        >
          01 - Building Blocks
        </div>

        {/* Title */}
        <div style={{ marginBottom: 12, ...titleAnim }}>
          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.title,
              fontWeight: Font.weight.semibold,
              color: Colors.text.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.1
            }}
          >
            The Building Blocks
          </div>
          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.title,
              fontWeight: Font.weight.semibold,
              letterSpacing: "-0.02em",
              lineHeight: 1.1
            }}
          >
            <span style={{ color: Colors.text.primary }}>of Our </span>
            <span style={{ color: Colors.accent.blue }}>System</span>
          </div>
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: Colors.accent.blue,
            marginBottom: 0,
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
            letterSpacing: "0.01em",
            lineHeight: 1.6,
            marginTop: 20,
            maxWidth: 860,
            ...subtitleAnim
          }}
        >
          A modular ecosystem of specialized components - each solves a specific
          problem, and together they form a seamless, powerful platform.
        </div>
      </div>

      {/* ── BRICKS GRID ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 120,
          right: 120,
          bottom: 68,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 14
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const anim = staggeredFadeIn(frame, i, 65, 11)
          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.022)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderLeft: `3px solid ${cat.color}`,
                borderRadius: 8,
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                ...anim
              }}
            >
              {/* Category label */}
              <div
                style={{
                  fontFamily: Font.family,
                  fontSize: 12,
                  fontWeight: Font.weight.semibold,
                  color: cat.color,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase"
                }}
              >
                {cat.label}
              </div>

              {/* Separator */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.05)"
                }}
              />

              {/* Brick list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cat.bricks.map((brick, j) => (
                  <div key={j}>
                    <div
                      style={{
                        fontFamily: Font.family,
                        fontSize: 19,
                        fontWeight: Font.weight.semibold,
                        color: Colors.text.primary,
                        lineHeight: 1.3
                      }}
                    >
                      {brick.name}
                    </div>
                    <div
                      style={{
                        fontFamily: Font.family,
                        fontSize: 14,
                        fontWeight: Font.weight.light,
                        color: Colors.text.secondary,
                        lineHeight: 1.5,
                        marginTop: 2
                      }}
                    >
                      {brick.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
