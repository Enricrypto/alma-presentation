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

const VALUE_ITEMS = [
  {
    n: "01",
    title: "Orchestration Margin",
    desc: "Earns margin by efficiently combining multiple microservices into one seamless workflow.",
    color: "#3B82F6"
  },
  {
    n: "02",
    title: "Smart Routing",
    desc: "Optimizes execution paths to reduce cost, improve speed, and increase performance.",
    color: "#14B8A6"
  },
  {
    n: "03",
    title: "Microservice Markup",
    desc: "Takes a commission on each service executed within the system.",
    color: "#8B5CF6"
  },
  {
    n: "04",
    title: "Enterprise Plans",
    desc: "Premium tiers include control, compliance, auditing, and SLA guarantees.",
    color: "#F59E0B"
  },
  {
    n: "05",
    title: "Agent-Native Volume",
    desc: "Autonomous agents execute thousands of actions - generating recurring, scalable volume.",
    color: "#10B981"
  },
  {
    n: "06",
    title: "Outcome-as-a-Service",
    desc: "Customers pay for delivered results, not tools or software access.",
    color: "#F43F5E"
  }
]

export const Slide6: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)
  const subtitleAnim = fadeSlideIn(frame, 30, 22, 12)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], clamp)

  // Left column: items 0,1,2 — Right column: items 3,4,5
  const itemAnims = VALUE_ITEMS.map((_, i) =>
    fadeSlideIn(frame, 58 + i * 18, 22, 12)
  )

  const leftItems = VALUE_ITEMS.slice(0, 3)
  const rightItems = VALUE_ITEMS.slice(3, 6)

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
          06 - Business Model
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
            How Alma Captures Value
          </div>
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
            in the Outcome Economy
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
          Alma monetizes results - not software usage.
        </div>
      </div>

      {/* ── 2-column grid of value items ────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 360,
          bottom: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px 60px",
          alignContent: "start"
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {leftItems.map((item, i) => (
            <div key={item.n} style={{ ...itemAnims[i] }}>
              <ValueCard item={item} />
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {rightItems.map((item, i) => (
            <div key={item.n} style={{ ...itemAnims[i + 3] }}>
              <ValueCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}

const ValueCard: React.FC<{ item: (typeof VALUE_ITEMS)[number] }> = ({
  item
}) => (
  <div
    style={{
      display: "flex",
      gap: 20,
      alignItems: "flex-start",
      borderLeft: `2px solid ${item.color}55`,
      paddingLeft: 18
    }}
  >
    {/* Number badge */}
    <div
      style={{
        fontFamily: Font.family,
        fontSize: 13,
        fontWeight: Font.weight.semibold,
        color: item.color,
        letterSpacing: "0.06em",
        minWidth: 28,
        paddingTop: 3,
        opacity: 0.85,
        flexShrink: 0
      }}
    >
      {item.n}
    </div>

    {/* Content */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          fontFamily: Font.family,
          fontSize: 22,
          fontWeight: Font.weight.semibold,
          color: Colors.text.primary,
          letterSpacing: "-0.01em",
          lineHeight: 1.2
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          fontFamily: Font.family,
          fontSize: 19,
          fontWeight: Font.weight.light,
          color: Colors.text.secondary,
          lineHeight: 1.55
        }}
      >
        {item.desc}
      </div>
    </div>
  </div>
)
