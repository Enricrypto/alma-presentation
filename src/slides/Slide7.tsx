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

const PHASES = [
  {
    n: "01",
    title: "Smart Helpers",
    bullets: [
      "Prebuilt agents embedded directly in Alma",
      "Users can add their own custom agents",
      "First services go live on x402"
    ],
    color: "#3B82F6"
  },
  {
    n: "02",
    title: "All Results in One Place",
    bullets: [
      "Unified interface for all task outcomes",
      "Execute tasks in real time",
      "Pay per completed task - no subscriptions"
    ],
    color: "#14B8A6"
  },
  {
    n: "03",
    title: "Marketplace Layer",
    bullets: [
      "External microservices added by developers and providers",
      "Users get richer, more specialized outcomes",
      "Open ecosystem anyone can contribute to"
    ],
    color: "#8B5CF6"
  },
  {
    n: "04",
    title: "Agents in Control",
    bullets: [
      "Agents orchestrate full workflows end-to-end",
      "Combine multiple services and microservices seamlessly",
      "Complex enterprise deployments go live"
    ],
    color: "#F59E0B"
  },
  {
    n: "05",
    title: "Beyond Software",
    bullets: [
      "Alma executes goals beyond digital tasks",
      "Health, education, logistics, real-world outcomes",
      "Any goal. Any scale. Fully automated."
    ],
    color: "#10B981"
  }
]

const leftPhases = PHASES.slice(0, 3)
const rightPhases = PHASES.slice(3, 5)

export const Slide7: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)
  const subtitleAnim = fadeSlideIn(frame, 30, 22, 12)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], clamp)

  const phaseAnims = PHASES.map((_, i) =>
    fadeSlideIn(frame, 54 + i * 20, 22, 12)
  )

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* ── Header ──────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 72,
          right: 120
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
            marginBottom: 22,
            ...labelAnim
          }}
        >
          07 - Roadmap
        </div>

        <div style={{ marginBottom: 14, ...titleAnim }}>
          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.subtitle,
              fontWeight: Font.weight.semibold,
              color: Colors.text.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.12
            }}
          >
            Alma Roadmap: How We Deliver Results
          </div>
        </div>

        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: Colors.accent.blue,
            opacity: 0.6
          }}
        />

        <div
          style={{
            fontFamily: Font.family,
            fontSize: Font.size.label,
            fontWeight: Font.weight.light,
            color: Colors.text.secondary,
            marginTop: 18,
            lineHeight: 1.5,
            ...subtitleAnim
          }}
        >
          Five phases. One direction: execution without limits.
        </div>
      </div>

      {/* ── Phase cards — 2-column ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 340,
          bottom: 44,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px 48px",
          alignContent: "start"
        }}
      >
        {/* Left column: Phases 1–3 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {leftPhases.map((phase, i) => (
            <div key={phase.n} style={{ ...phaseAnims[i] }}>
              <PhaseCard phase={phase} />
            </div>
          ))}
        </div>

        {/* Right column: Phases 4–5 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {rightPhases.map((phase, i) => (
            <div key={phase.n} style={{ ...phaseAnims[i + 3] }}>
              <PhaseCard phase={phase} />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}

interface Phase {
  n: string
  title: string
  bullets: string[]
  color: string
}

const PhaseCard: React.FC<{ phase: Phase }> = ({ phase }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.022)",
      border: `1px solid ${phase.color}33`,
      borderLeft: `3px solid ${phase.color}`,
      borderRadius: 10,
      padding: "20px 24px"
    }}
  >
    {/* Phase header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 14
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: `${phase.color}18`,
          border: `1px solid ${phase.color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: Font.family,
          fontSize: 12,
          fontWeight: Font.weight.semibold,
          color: phase.color,
          letterSpacing: "0.04em"
        }}
      >
        {phase.n}
      </div>

      <div
        style={{
          fontFamily: Font.family,
          fontSize: 21,
          fontWeight: Font.weight.semibold,
          color: Colors.text.primary,
          letterSpacing: "-0.01em",
          lineHeight: 1.2
        }}
      >
        {phase.title}
      </div>
    </div>

    {/* Divider */}
    <div
      style={{
        height: 1,
        background: `${phase.color}22`,
        marginBottom: 14
      }}
    />

    {/* Bullets */}
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {phase.bullets.map((b) => (
        <div
          key={b}
          style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: phase.color,
              opacity: 0.6,
              flexShrink: 0,
              marginTop: 9
            }}
          />
          <div
            style={{
              fontFamily: Font.family,
              fontSize: 18,
              fontWeight: Font.weight.light,
              color: Colors.text.secondary,
              lineHeight: 1.55
            }}
          >
            {b}
          </div>
        </div>
      ))}
    </div>
  </div>
)
