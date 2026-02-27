import React from "react"

interface LogoProps {
  /** Height in px. Width scales proportionally. */
  height?: number
  /** Ignored — kept for call-site compatibility. */
  showText?: boolean
  /** Overall opacity (0–1). */
  opacity?: number
  /** Color for bars and ring. Default white. */
  color?: string
}

/**
 * Alma Bot icon mark — 5 thin vertical bars, center bar bisected by a ring.
 * Transparent background, no wordmark.
 */
export const Logo: React.FC<LogoProps> = ({
  height = 80,
  opacity = 1,
  color = "#FFFFFF"
}) => {
  const VW = 200
  const VH = 200
  const width = (height / VH) * VW

  // Thin bars, wide spacing
  const barW = 6
  const step = 34 // bar width + gap
  const barTop = 8
  const barBottom = 192

  // Centers symmetric around 100
  const barCenters = [
    100 - 2 * step,
    100 - step,
    100,
    100 + step,
    100 + 2 * step
  ] // [32, 66, 100, 134, 168]

  // Small tight ring
  const ringCX = 100
  const ringCY = 100
  const ringOuterR = 13
  const ringInnerR = 8

  const centerTopEnd = ringCY - ringOuterR // 87
  const centerBotStart = ringCY + ringOuterR // 113

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VW} ${VH}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ opacity, display: "block" }}
    >
      {/* 4 full-height bars */}
      {[barCenters[0], barCenters[1], barCenters[3], barCenters[4]].map(
        (cx, i) => (
          <rect
            key={i}
            x={cx - barW / 2}
            y={barTop}
            width={barW}
            height={barBottom - barTop}
            fill={color}
          />
        )
      )}

      {/* Center bar — top portion */}
      <rect
        x={barCenters[2] - barW / 2}
        y={barTop}
        width={barW}
        height={centerTopEnd - barTop}
        fill={color}
      />

      {/* Center bar — bottom portion */}
      <rect
        x={barCenters[2] - barW / 2}
        y={centerBotStart}
        width={barW}
        height={barBottom - centerBotStart}
        fill={color}
      />

      {/* Ring — stroke-based so it works on any background */}
      <circle
        cx={ringCX}
        cy={ringCY}
        r={(ringOuterR + ringInnerR) / 2}
        fill='none'
        stroke={color}
        strokeWidth={ringOuterR - ringInnerR}
      />
    </svg>
  )
}
