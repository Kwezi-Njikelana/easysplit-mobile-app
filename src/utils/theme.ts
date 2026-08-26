export const THEME = {
  background: {
    base: "#020807",
    upper: ["#020807", "#063f3b", "#0d8178"] as const,
    lower: ["#04100f", "#020807", "#020807"] as const,
    button: ["#22e2d2", "#19bcd5"] as const,
    card: ["rgba(9, 45, 42, 0.96)", "rgba(6, 28, 27, 0.94)"] as const,
    mutedCard: "#081312",
    panel: "#050c0b",
    chip: "rgba(255,255,255,0.08)",
  },
  text: {
    primary: "#f5fffd",
    secondary: "rgba(245,255,253,0.68)",
    muted: "rgba(245,255,253,0.42)",
    dark: "#03110f",
  },
  border: {
    subtle: "rgba(255,255,255,0.08)",
    glow: "rgba(34,226,210,0.28)",
  },
  accent: {
    cyan: "#22e2d2",
    cyanDeep: "#19bcd5",
    teal: "#0d8178",
    danger: "#ff4085",
    success: "#22e2d2",
  },
};
