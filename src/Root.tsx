import React from "react";
import { Composition } from "remotion";
import { LedgerlingPresentation, TOTAL_FRAMES } from "./Composition";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="LedgerlingPresentation"
        component={LedgerlingPresentation}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
