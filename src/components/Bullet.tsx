import React from "react";
import { staggeredFadeIn } from "../motion";
import { Colors, Font } from "../styles";

interface BulletProps {
  frame: number;
  items: string[];
  delay?: number;
  stagger?: number;
}

export const Bullet: React.FC<BulletProps> = ({
  frame,
  items,
  delay = 30,
  stagger = 9,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {items.map((item, i) => {
        const anim = staggeredFadeIn(frame, i, delay, stagger, 20);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontFamily: Font.family,
              fontSize: Font.size.bullet,
              fontWeight: Font.weight.regular,
              color: Colors.text.secondary,
              lineHeight: 1.5,
              ...anim,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: Colors.accent.blue,
                flexShrink: 0,
              }}
            />
            {item}
          </div>
        );
      })}
    </div>
  );
};
