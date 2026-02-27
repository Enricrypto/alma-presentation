export const Colors = {
  bg: {
    primary: "#0B0F14",
    secondary: "#111827",
  },
  accent: {
    blue: "#3B82F6",
    teal: "#14B8A6",
    gray: "#6B7280",
    blueGlow: "rgba(59, 130, 246, 0.15)",
    blueFaint: "rgba(59, 130, 246, 0.08)",
  },
  text: {
    primary: "#F9FAFB",
    secondary: "#9CA3AF",
    accent: "#3B82F6",
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.06)",
    accent: "rgba(59, 130, 246, 0.4)",
  },
} as const;

export const Font = {
  family:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", "Courier New", monospace',
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  size: {
    title: 76,
    subtitle: 48,
    bullet: 38,
    label: 23,
    micro: 18,
    cli: 25,
  },
} as const;
