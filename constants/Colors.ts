const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: "#000",
    background: "#fff",
    primary: "#3498db",
    primaryTint: "#cee5f5",
    primaryHighlight: "#c0ffdd",
    secondary: "#f1c40f",
    secondaryTint: "#f2e7b8",
    secondaryHighlight: "#c0ffdd",
    tertiary: "#2ecc71",
    tertiaryTint: "#c9f2da",
    tertiaryHighlight: "#c0ffdd",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    primary: "#3498db",
    primaryTint: "#cee5f5",
    primaryHighlight: "#c0ffdd",
    secondary: "#f1c40f",
    secondaryTint: "#f2e7b8",
    secondaryHighlight: "#c0ffdd",
    tertiary: "#2ecc71",
    tertiaryTint: "#c9f2da",
    tertiaryHighlight: "#d0ffdd",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
} as const;
