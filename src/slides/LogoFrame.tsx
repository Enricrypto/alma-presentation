import React from "react";
import { AbsoluteFill, interpolate, Easing } from "remotion";
import { Logo } from "../components/Logo";
import { Colors, Font } from "../styles";

interface LogoFrameProps {
  localFrame: number;
  /** "open" fades in and holds. "close" fades in then fades to black. */
  variant: "open" | "close";
}

const easing = Easing.bezier(0.4, 0.0, 0.2, 1);
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/**
 * Opening frame:  black → logo fades in → "Alma BOT" fades in → hold
 * Closing frame:  same → hold → fade to black
 *
 * Duration: 150 frames (5 seconds at 30fps)
 *   Logo:  frames  6 – 26
 *   Text:  frames 36 – 54  (fade + slide up)
 *   Hold:  frames 54 – 130
 *   Fade:  frames 130 – 150 (close variant only)
 */
export const LogoFrame: React.FC<LogoFrameProps> = ({
  localFrame: frame,
  variant,
}) => {
  // ── Logo fade-in ──────────────────────────────────────────
  const logoOpacity = interpolate(frame, [6, 26], [0, 1], {
    ...clamp,
    easing,
  });

  // ── "Alma BOT" text — appears after logo is fully in ──────
  const TEXT_APPEAR = 36;
  const textOpacity = interpolate(
    frame,
    [TEXT_APPEAR, TEXT_APPEAR + 18],
    [0, 1],
    { ...clamp, easing }
  );
  const textY = interpolate(
    frame,
    [TEXT_APPEAR, TEXT_APPEAR + 18],
    [28, 0],
    { ...clamp, easing }
  );

  // ── Logo white glow — builds in as text appears ──────────
  const logoGlow = interpolate(
    frame,
    [TEXT_APPEAR, TEXT_APPEAR + 18],
    [0, 1],
    { ...clamp, easing }
  );

  // ── Close variant: fade to black at the end ───────────────
  const fadeOut =
    variant === "close"
      ? interpolate(frame, [130, 150], [0, 1], { ...clamp, easing })
      : 0;

  return (
    <AbsoluteFill
      style={{
        background: Colors.bg.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Logo icon */}
      <div
        style={{
          opacity: logoOpacity,
          filter: logoGlow > 0.01
            ? `drop-shadow(0 0 10px rgba(255,255,255,${0.65 * logoGlow})) drop-shadow(0 0 30px rgba(255,255,255,${0.25 * logoGlow}))`
            : "none",
        }}
      >
        <Logo height={400} color="#FFFFFF" />
      </div>

      {/* "Alma BOT" text group */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          marginTop: 52,
        }}
      >
        {/* "Alma" — geometric sans, bold */}
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 72,
            fontWeight: Font.weight.bold,
            color: Colors.text.primary,
            letterSpacing: "0.14em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Alma
        </div>

        {/* "BOT" — white badge with monospaced text */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 5,
            padding: "9px 28px 10px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: Font.mono,
              fontSize: 18,
              fontWeight: Font.weight.medium,
              color: Colors.bg.primary,
              letterSpacing: "0.38em",
              lineHeight: 1,
            }}
          >
            BOT
          </span>
        </div>
      </div>

      {/* Fade-to-black overlay (close variant only) */}
      {variant === "close" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000000",
            opacity: fadeOut,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
