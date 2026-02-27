import { interpolate, Easing } from "remotion";

const easing = Easing.bezier(0.4, 0.0, 0.2, 1);

// 10 seconds per slide at 30fps
export const SLIDE_FRAMES = 300;

export function fadeIn(
  frame: number,
  delay: number = 0,
  duration: number = 18
): number {
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

export function slideUp(
  frame: number,
  delay: number = 0,
  duration: number = 18,
  distance: number = 16
): number {
  return interpolate(frame, [delay, delay + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

export function fadeSlideIn(
  frame: number,
  delay: number = 0,
  duration: number = 18,
  distance: number = 16
): { opacity: number; transform: string } {
  return {
    opacity: fadeIn(frame, delay, duration),
    transform: `translateY(${slideUp(frame, delay, duration, distance)}px)`,
  };
}

export function staggeredFadeIn(
  frame: number,
  index: number,
  baseDelay: number = 20,
  stagger: number = 12,
  duration: number = 18
): { opacity: number; transform: string } {
  const delay = baseDelay + index * stagger;
  return fadeSlideIn(frame, delay, duration);
}
