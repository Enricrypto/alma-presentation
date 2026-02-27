import React from "react"
import { interpolate } from "remotion"
import { Colors, Font } from "../styles"

type LineType = "command" | "output" | "success" | "system"

export interface CLILine {
  text: string
  type: LineType
  startFrame: number
}

interface CLIWindowProps {
  frame: number
  lines: CLILine[]
  showCursor?: boolean
}

const TypedText: React.FC<{
  frame: number
  text: string
  startFrame: number
}> = ({ frame, text, startFrame }) => {
  const charsVisible = Math.floor(Math.max(0, frame - startFrame) * 1.6)
  return <>{text.slice(0, charsVisible)}</>
}

export const CLIWindow: React.FC<CLIWindowProps> = ({
  frame,
  lines,
  showCursor = true
}) => {
  const cursorOn = Math.floor(frame / 15) % 2 === 0

  const lineColor = (type: LineType): string => {
    switch (type) {
      case "command":
        return Colors.text.primary
      case "success":
        return Colors.accent.teal
      case "system":
        return Colors.accent.blue
      default:
        return Colors.text.secondary
    }
  }

  const linePrefix = (type: LineType): string => {
    switch (type) {
      case "command":
        return "$ "
      case "success":
        return "✔ "
      default:
        return "  "
    }
  }

  return (
    <div
      style={{
        background: "#0D1117",
        border: "1px solid rgba(59, 130, 246, 0.18)",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow:
          "0 0 40px rgba(59, 130, 246, 0.07), 0 24px 64px rgba(0, 0, 0, 0.55)"
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          background: "#161B22",
          padding: "11px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "rgba(255, 95, 87, 0.7)"
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "rgba(255, 189, 46, 0.7)"
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "rgba(40, 200, 64, 0.7)"
          }}
        />
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: Font.mono,
            fontSize: 13,
            color: "rgba(156, 163, 175, 0.5)",
            letterSpacing: "0.06em"
          }}
        >
          almabot — terminal
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 26px", minHeight: 320 }}>
        {lines.map((line, i) => {
          const opacity = interpolate(
            frame,
            [line.startFrame, line.startFrame + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )

          return (
            <div
              key={i}
              style={{
                fontFamily: Font.mono,
                fontSize: Font.size.cli,
                color: lineColor(line.type),
                opacity,
                lineHeight: 1.85,
                letterSpacing: "0.015em",
                whiteSpace: "pre"
              }}
            >
              <span style={{ color: Colors.accent.gray }}>
                {linePrefix(line.type)}
              </span>
              {line.type === "command" ? (
                <TypedText
                  frame={frame}
                  text={line.text}
                  startFrame={line.startFrame}
                />
              ) : (
                line.text
              )}
            </div>
          )
        })}

        {showCursor && (
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: Font.size.cli,
              background: Colors.accent.blue,
              opacity: cursorOn ? 0.9 : 0,
              verticalAlign: "text-bottom",
              marginLeft: 2
            }}
          />
        )}
      </div>
    </div>
  )
}
