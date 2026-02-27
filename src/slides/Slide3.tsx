import React from "react"
import { AbsoluteFill, interpolate, Easing } from "remotion"
import { Colors, Font } from "../styles"
import { fadeSlideIn } from "../motion"
import { Logo } from "../components/Logo"

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

const QUERY = "Render a high-tech control room dashboard"
const CHARS_PER_FRAME = 0.7

// Sequence: zoom first → pause → type → cursor → click
// Camera zoom — after bullets settle, before any typing
// Focus point: input center ≈ (1490, 610) → brought to screen center (960, 540)
// translate: (960 - 1490, 540 - 610) = (-530, -70) — constant regardless of scale
const ZOOM_START = 165 // 75 + 90 (3s extra bullet hold)
const ZOOM_END = ZOOM_START + 44 // 209

// Short natural pause after zoom lands, then typing begins
const TYPING_START = ZOOM_END + 15 // 134
const TYPING_DONE = TYPING_START + Math.ceil(QUERY.length / CHARS_PER_FRAME) // ~193

const CURSOR_APPEAR = TYPING_DONE + 8 // ~201
const CURSOR_MOVE_DONE = CURSOR_APPEAR + 32 // ~233
const CLICK_START = CURSOR_MOVE_DONE + 4 // ~237
const CLICK_DONE = CLICK_START + 14 // ~251

// Screen-space positions AFTER zoom transform (scale 1.35, translate -530,-70, origin 960,540)
// Pre-zoom button ≈ (1756, 611) → post-zoom ≈ (1319, 541)
// Pre-zoom text area ≈ (1400, 611) → post-zoom ≈ (839, 541)
const CURSOR_X_START = 839
const CURSOR_Y_START = 541
const BUTTON_X = 1319
const BUTTON_Y = 541

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const
}
const easing = Easing.bezier(0.4, 0.0, 0.2, 1)

const PointerCursor: React.FC = () => (
  <svg width='26' height='32' viewBox='0 0 26 32'>
    <path
      d='M3 3 L3 26 L9 20 L13 31 L16.5 29.5 L12.5 18.5 L20 18.5 Z'
      fill='white'
      stroke='rgba(0,0,0,0.75)'
      strokeWidth='1.8'
      strokeLinejoin='round'
    />
  </svg>
)

const SendArrow: React.FC = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
    <path
      d='M3 9 H15 M10 4 L15 9 L10 14'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export const Slide3: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], clamp)

  // Bullets — all three show in quick succession
  const bullet0Anim = fadeSlideIn(frame, 45, 20, 14)
  const bullet1Anim = fadeSlideIn(frame, 55, 20, 14)
  const bullet2Anim = fadeSlideIn(frame, 65, 20, 14)

  // Right panel
  const rightPanelOpacity = interpolate(frame, [38, 56], [0, 1], clamp)

  // Typing
  const charsVisible = Math.min(
    QUERY.length,
    Math.floor(Math.max(0, frame - TYPING_START) * CHARS_PER_FRAME)
  )
  const isDone = charsVisible >= QUERY.length
  const cursorBlinkOn = Math.floor(frame / 15) % 2 === 0
  // Blink during pre-typing pause (zoom done, awaiting input) and while typing
  const showInputCursor =
    frame >= ZOOM_END && frame < CURSOR_APPEAR && (!isDone || cursorBlinkOn)

  // Input border brightens when typing is done
  const inputBorderAlpha = interpolate(
    frame,
    [TYPING_DONE, TYPING_DONE + 10],
    [0.18, 0.42],
    clamp
  )
  const inputGlow = interpolate(
    frame,
    [TYPING_DONE, TYPING_DONE + 10, TYPING_DONE + 28],
    [0, 0.16, 0],
    clamp
  )

  // Send button — fades in and turns solid when typing done
  const buttonBgAlpha = interpolate(
    frame,
    [TYPING_DONE, TYPING_DONE + 10],
    [0.25, 0.95],
    clamp
  )

  // Camera zoom
  const zoomScale = interpolate(frame, [ZOOM_START, ZOOM_END], [1, 1.35], {
    ...clamp,
    easing
  })
  const zoomTx = interpolate(frame, [ZOOM_START, ZOOM_END], [0, -530], {
    ...clamp,
    easing
  })
  const zoomTy = interpolate(frame, [ZOOM_START, ZOOM_END], [0, -70], {
    ...clamp,
    easing
  })

  // Mouse cursor — fades in, stays through click, fades out after
  const cursorOpacity = interpolate(
    frame,
    [CURSOR_APPEAR, CURSOR_APPEAR + 8, CLICK_DONE, CLICK_DONE + 10],
    [0, 1, 1, 0],
    clamp
  )
  const cursorX = interpolate(
    frame,
    [CURSOR_APPEAR, CURSOR_MOVE_DONE],
    [CURSOR_X_START, BUTTON_X],
    { ...clamp, easing }
  )
  const cursorY = interpolate(
    frame,
    [CURSOR_APPEAR, CURSOR_MOVE_DONE],
    [CURSOR_Y_START, BUTTON_Y],
    { ...clamp, easing }
  )

  // Button click animation
  const buttonScale = interpolate(
    frame,
    [CLICK_START, CLICK_START + 6, CLICK_DONE],
    [1, 0.84, 1],
    clamp
  )
  const buttonClickGlow = interpolate(
    frame,
    [CLICK_START + 4, CLICK_DONE],
    [0.55, 0],
    clamp
  )

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      {/* ── ZOOM WRAPPER — camera move focuses on input field ───── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoomScale}) translate(${zoomTx}px, ${zoomTy}px)`,
          transformOrigin: "50% 50%"
        }}
      >
        <GridBackground />

        {/* ── LEFT PANEL ─────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 0,
            bottom: 0,
            width: 720,
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
            03 - The Vision
          </div>

          {/* Title */}
          <div style={{ marginBottom: 16, ...titleAnim }}>
            <div
              style={{
                fontFamily: Font.family,
                fontSize: Font.size.title,
                fontWeight: Font.weight.semibold,
                color: Colors.text.primary,
                letterSpacing: "-0.02em",
                lineHeight: 1.12
              }}
            >
              From Complexity
            </div>
            <div
              style={{
                fontFamily: Font.family,
                fontSize: Font.size.title,
                fontWeight: Font.weight.semibold,
                letterSpacing: "-0.02em",
                lineHeight: 1.12
              }}
            >
              <span style={{ color: Colors.text.primary }}>to </span>
              <span style={{ color: Colors.accent.blue }}>Clarity</span>
            </div>
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

          {/* Bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Growth stat block */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, ...bullet0Anim }}>
              {/* Today row — dot inline with text */}
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: Colors.accent.blue,
                    flexShrink: 0
                  }}
                />
                <div
                  style={{
                    fontFamily: Font.family,
                    fontSize: Font.size.bullet,
                    fontWeight: Font.weight.regular,
                    color: Colors.text.secondary,
                    lineHeight: 1.5
                  }}
                >
                  <span style={{ color: Colors.text.primary, fontWeight: Font.weight.semibold }}>
                    Today
                  </span>
                  {"  -  "}
                  <span>17 x402 services connected</span>
                </div>
              </div>

              {/* Forecast row — indented to align with text above */}
              <div style={{ paddingLeft: 25 }}>
                <div
                  style={{
                    fontFamily: Font.family,
                    fontSize: Font.size.bullet,
                    fontWeight: Font.weight.regular,
                    color: Colors.text.secondary,
                    lineHeight: 1.5
                  }}
                >
                  <span style={{ color: Colors.accent.blue, fontWeight: Font.weight.semibold }}>
                    2027 forecast
                  </span>
                  {"  -  "}
                  <span>200+ services</span>
                </div>
              </div>
            </div>

            {/* Bullet 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontFamily: Font.family,
                fontSize: Font.size.bullet,
                fontWeight: Font.weight.regular,
                color: Colors.text.secondary,
                lineHeight: 1.5,
                ...bullet1Anim
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: Colors.accent.blue,
                  flexShrink: 0
                }}
              />
              Ask in plain English - no coding needed
            </div>

            {/* Bullet 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontFamily: Font.family,
                fontSize: Font.size.bullet,
                fontWeight: Font.weight.regular,
                color: Colors.text.secondary,
                lineHeight: 1.5,
                ...bullet2Anim
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: Colors.accent.blue,
                  flexShrink: 0
                }}
              />
              Automatic setup and payment
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — product UI mockup ────────────────────── */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 700,
            opacity: rightPanelOpacity,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: 48,
            display: "flex",
            flexDirection: "column",
            gap: 28
          }}
        >
          {/* Logo */}
          <Logo height={56} color="#FFFFFF" />

          {/* Product tagline */}
          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.label,
              fontWeight: Font.weight.regular,
              color: Colors.text.secondary,
              letterSpacing: "0.01em"
            }}
          >
            Natural language → any x402 service
          </div>

          {/* Input field */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid rgba(59,130,246,${inputBorderAlpha})`,
              borderRadius: 50,
              padding: "16px 16px 16px 24px",
              gap: 12,
              boxShadow:
                inputGlow > 0.01
                  ? `0 0 24px rgba(59,130,246,${inputGlow})`
                  : "none"
            }}
          >
            {/* Typed text */}
            <span
              style={{
                flex: 1,
                fontFamily: Font.mono,
                fontSize: 18,
                fontWeight: Font.weight.regular,
                color: Colors.text.primary,
                lineHeight: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                letterSpacing: "0.01em"
              }}
            >
              {QUERY.slice(0, charsVisible)}
              {showInputCursor && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 18,
                    background: Colors.text.primary,
                    verticalAlign: "text-bottom",
                    marginLeft: 2,
                    opacity: 0.85
                  }}
                />
              )}
            </span>

            {/* Send button */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: `rgba(59,130,246,${buttonBgAlpha})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: `scale(${buttonScale})`,
                boxShadow:
                  buttonClickGlow > 0.01
                    ? `0 0 20px rgba(59,130,246,${buttonClickGlow})`
                    : "none"
              }}
            >
              <SendArrow />
            </div>
          </div>
        </div>
      </div>
      {/* end zoom wrapper */}

      {/* ── MOUSE CURSOR — outside zoom, stays in screen space ─── */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          pointerEvents: "none"
        }}
      >
        <PointerCursor />
      </div>
    </AbsoluteFill>
  )
}
