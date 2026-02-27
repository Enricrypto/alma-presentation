import React from "react";
import { interpolate, Easing } from "remotion";
import { Colors, Font } from "../styles";
import { fadeSlideIn } from "../motion";

interface PipelineStepProps {
  frame: number;
  label: string;
  sublabel?: string;
  activateAt: number;
  isLast?: boolean;
  isPulse?: boolean;
  /** Detail caption rendered below the box, centered under it */
  detail?: string;
  detailActivateAt?: number;
}

// Approximate half-height of the step box, used to center connectors vertically
const BOX_HALF_HEIGHT = 47;

export const PipelineStep: React.FC<PipelineStepProps> = ({
  frame,
  label,
  sublabel,
  activateAt,
  isLast = false,
  isPulse = false,
  detail,
  detailActivateAt,
}) => {
  const easing = Easing.bezier(0.4, 0.0, 0.2, 1);

  const activation = interpolate(frame, [activateAt, activateAt + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

  const connectorFill = interpolate(
    frame,
    [activateAt + 8, activateAt + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing }
  );

  const pulseGlow = isPulse
    ? interpolate(
        frame,
        [activateAt + 18, activateAt + 28, activateAt + 46],
        [0, 0.28, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing }
      )
    : 0;

  const borderAlpha = 0.1 + 0.45 * activation;
  const bgAlpha = 0.015 + 0.065 * activation;
  const textAlpha = 0.38 + 0.62 * activation;
  const glowSize = activation * 18 + pulseGlow * 38;
  const glowAlpha = 0.15 * activation + pulseGlow;

  const tickOpacity = interpolate(frame, [activateAt + 22, activateAt + 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

  const detailAnim =
    detail && detailActivateAt != null
      ? fadeSlideIn(frame, detailActivateAt, 15, 10)
      : { opacity: 0, transform: "translateY(0px)" };

  return (
    // Outer row: box-column + connector, top-aligned so detail label hangs below
    <div style={{ display: "flex", alignItems: "flex-start" }}>

      {/* Column: step box + detail label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Step box */}
        <div
          style={{
            position: "relative",
            border: `1px solid rgba(59, 130, 246, ${borderAlpha})`,
            borderRadius: 4,
            background: `rgba(59, 130, 246, ${bgAlpha})`,
            padding: "22px 40px",
            minWidth: 210,
            textAlign: "center",
            boxShadow:
              activation > 0.05 || pulseGlow > 0.01
                ? `0 0 ${glowSize}px rgba(59, 130, 246, ${glowAlpha})`
                : "none",
          }}
        >
          {/* Tick mark */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              fontFamily: Font.mono,
              fontSize: 11,
              color: Colors.accent.teal,
              opacity: tickOpacity,
            }}
          >
            ✓
          </div>

          <div
            style={{
              fontFamily: Font.family,
              fontSize: Font.size.label,
              fontWeight: Font.weight.medium,
              color: `rgba(249, 250, 251, ${textAlpha})`,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
          {sublabel && (
            <div
              style={{
                fontFamily: Font.family,
                fontSize: Font.size.micro,
                fontWeight: Font.weight.light,
                color: `rgba(156, 163, 175, ${textAlpha * 0.7})`,
                marginTop: 7,
                letterSpacing: "0.02em",
              }}
            >
              {sublabel}
            </div>
          )}
        </div>

        {/* Detail caption — always in the DOM so layout is stable */}
        {detail && (
          <div
            style={{
              marginTop: 22,
              textAlign: "center",
              maxWidth: 210,
              fontFamily: Font.family,
              fontSize: 17,
              fontWeight: Font.weight.light,
              color: Colors.text.secondary,
              lineHeight: 1.5,
              ...detailAnim,
            }}
          >
            {detail}
          </div>
        )}
      </div>

      {/* Connector — marginTop centers it on the step box */}
      {!isLast && (
        <div style={{ marginTop: BOX_HALF_HEIGHT, flexShrink: 0 }}>
          <div style={{ position: "relative", width: 56, height: 1 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(59, 130, 246, 0.10)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${connectorFill * 100}%`,
                background: Colors.accent.blue,
                opacity: 0.55,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
