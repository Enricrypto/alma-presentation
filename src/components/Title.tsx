import React from "react";
import { fadeSlideIn } from "../motion";
import { Colors, Font } from "../styles";

interface TitleProps {
  frame: number;
  lines: string[];
  delay?: number;
  accentLine?: number;
}

export const Title: React.FC<TitleProps> = ({
  frame,
  lines,
  delay = 8,
  accentLine,
}) => {
  const anim = fadeSlideIn(frame, delay, 20, 20);

  return (
    <div style={{ ...anim }}>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: Font.family,
            fontSize: Font.size.title,
            fontWeight: Font.weight.semibold,
            color: accentLine === i ? Colors.accent.blue : Colors.text.primary,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};
