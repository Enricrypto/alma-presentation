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

const SECTION1_COLOR = "#10B981"
const SECTION2_COLOR = "#3B82F6"

const SECTION1_STEPS = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up with email, phone, or social login"
  },
  {
    num: "02",
    title: "Wallet Created Automatically",
    desc: "A secure wallet is created for you using Openfort — no crypto setup needed"
  },
  {
    num: "03",
    title: "Add Funds",
    desc: "Deposit using Stripe · MoonPay · Ramp"
  },
  {
    num: "04",
    title: "Receive USDC",
    desc: "Your balance is ready - no manual setup"
  }
]

const SECTION2_STEPS = [
  {
    num: "05",
    title: "Ask in Plain English",
    desc: "Type what you need - no coding required"
  },
  {
    num: "06",
    title: "Alma Breaks It Into Actions",
    desc: "Your request becomes a clear sequence of steps"
  },
  {
    num: "07",
    title: "See the Price Before Anything Runs",
    desc: "Full cost upfront - no hidden charges, no surprises"
  },
  {
    num: "08",
    title: "Confirm",
    desc: "Approve the execution with one click"
  },
  {
    num: "09",
    title: "Alma Executes Securely",
    desc: "Each step runs in order, each service paid automatically"
  },
  {
    num: "10",
    title: "Receive the Final Result",
    desc: "One complete answer plus a clear cost breakdown"
  }
]

interface StepRowProps {
  num: string
  title: string
  desc: string
  color: string
  frame: number
  delay: number
}

const StepRow: React.FC<StepRowProps> = ({
  num,
  title,
  desc,
  color,
  frame,
  delay
}) => {
  const anim = fadeSlideIn(frame, delay, 18, 12)
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        ...anim
      }}
    >
      {/* Large faded number */}
      <div
        style={{
          fontFamily: Font.family,
          fontSize: 56,
          fontWeight: Font.weight.bold,
          color,
          opacity: 0.16,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          minWidth: 76,
          flexShrink: 0,
          marginTop: -4
        }}
      >
        {num}
      </div>

      {/* Title + description */}
      <div style={{ paddingTop: 4 }}>
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 21,
            fontWeight: Font.weight.semibold,
            color: Colors.text.primary,
            lineHeight: 1.3
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: Font.family,
            fontSize: 18,
            fontWeight: Font.weight.light,
            color: Colors.text.secondary,
            lineHeight: 1.45,
            marginTop: 4
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  )
}

export const Slide4: React.FC<SlideProps> = ({ localFrame: frame }) => {
  const labelAnim = fadeSlideIn(frame, 8, 18, 12)
  const titleAnim = fadeSlideIn(frame, 14, 28, 16)

  const dividerWidth = interpolate(frame, [36, 62], [0, 72], clamp)

  const sec1HeaderAnim = fadeSlideIn(frame, 44, 18, 12)
  const sec2HeaderAnim = fadeSlideIn(frame, 110, 18, 12)

  return (
    <AbsoluteFill style={{ background: Colors.bg.primary, overflow: "hidden" }}>
      <GridBackground />

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
          04 - How It Works
        </div>

        <div style={{ ...titleAnim, marginBottom: 14 }}>
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
            From Sign-Up to Final Answer
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
      </div>

      {/* ── Two-column timeline ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 228,
          bottom: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60
        }}
      >
        {/* Left — Getting Ready */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: Font.family,
              fontSize: 12,
              fontWeight: Font.weight.semibold,
              color: SECTION1_COLOR,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 28,
              ...sec1HeaderAnim
            }}
          >
            Getting Ready
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {SECTION1_STEPS.map((step, i) => (
              <StepRow
                key={step.num}
                {...step}
                color={SECTION1_COLOR}
                frame={frame}
                delay={54 + i * 14}
              />
            ))}
          </div>
        </div>

        {/* Right — Using Alma */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: Font.family,
              fontSize: 12,
              fontWeight: Font.weight.semibold,
              color: SECTION2_COLOR,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 28,
              ...sec2HeaderAnim
            }}
          >
            Using Alma
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {SECTION2_STEPS.map((step, i) => (
              <StepRow
                key={step.num}
                {...step}
                color={SECTION2_COLOR}
                frame={frame}
                delay={124 + i * 14}
              />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
