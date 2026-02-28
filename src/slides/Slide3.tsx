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

// Perfect circle centered on the slide
const CX = 960
const CY = 548
const R = 300

const ORBIT_ITEMS = [
  { label: "Web & Research", angle: 0, color: "#3B82F6" },
  { label: "Crypto & Finance", angle: 60, color: "#14B8A6" },
  { label: "AI & Media", angle: 120, color: "#8B5CF6" },
  { label: "Security & Risk", angle: 180, color: "#F59E0B" },
  { label: "Storage", angle: 240, color: "#10B981" },
  { label: "Monitoring & Insights", angle: 300, color: "#F43F5E" }
]

// angle=0 → top, clockwise
function orbitPos(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: CX + Math.cos(rad) * R,
    y: CY + Math.sin(rad) * R
  }
}

export const Slide3: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)
  const centerAnim = fadeSlideIn(frame, 32, 26, 18)
  const subtitleAnim = fadeSlideIn(frame, 90, 22, 14)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], clamp)
  const orbitOpacity = interpolate(frame, [38, 58], [0, 1], clamp)

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

      {/* ── SVG orbit circle + connecting lines ─────────────────── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: orbitOpacity
        }}
        width='1920'
        height='1080'
        viewBox='0 0 1920 1080'
      >
        {/* Faint orbit track — perfect circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill='none'
          stroke='rgba(255,255,255,0.12)'
          strokeWidth='1.5'
        />
        {/* Lines from center to each pill */}
        {ORBIT_ITEMS.map((item, i) => {
          const { x, y } = orbitPos(item.angle)
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke={item.color}
              strokeWidth='2'
              strokeOpacity='0.35'
            />
          )
        })}
      </svg>

      {/* ── Top header ──────────────────────────────────────────── */}
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
          03 - The Engine Behind Alma
        </div>

        <div style={{ ...titleAnim }}>
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
            Powered by x402 microservices
          </div>
        </div>

        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: Colors.accent.blue,
            marginTop: 14,
            opacity: 0.6
          }}
        />
      </div>

      {/* ── Center — logo only ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: CX,
          top: CY,
          transform: "translate(-50%, -50%)"
        }}
      >
        <div style={{ ...centerAnim }}>
          <Logo height={72} color='#FFFFFF' />
        </div>
      </div>

      {/* ── Orbit category pills ────────────────────────────────── */}
      {ORBIT_ITEMS.map((item, i) => {
        const { x, y } = orbitPos(item.angle)
        const pillAnim = fadeSlideIn(frame, 50 + i * 10, 18, 10)
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div style={{ ...pillAnim }}>
              <div
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: `1px solid ${item.color}55`,
                  borderRadius: 999,
                  padding: "10px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  whiteSpace: "nowrap",
                  boxShadow: `0 0 18px 2px ${item.color}22`
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0
                  }}
                />
                <span
                  style={{
                    fontFamily: Font.family,
                    fontSize: Font.size.label,
                    fontWeight: Font.weight.medium,
                    color: Colors.text.primary,
                    letterSpacing: "0.02em"
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        )
      })}

      {/* ── Bottom subtitle ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: Font.family,
          fontSize: Font.size.label,
          fontWeight: Font.weight.light,
          color: Colors.text.secondary,
          letterSpacing: "0.04em",
          ...subtitleAnim
        }}
      >
        Get things done without thinking about tools.
      </div>
    </AbsoluteFill>
  )
}
