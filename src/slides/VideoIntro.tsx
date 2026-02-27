import React from "react"
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion"

interface VideoIntroProps {
  localFrame: number
}

export const VideoIntro: React.FC<VideoIntroProps> = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <OffthreadVideo
        src={staticFile("u55.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        muted
      />
    </AbsoluteFill>
  )
}
