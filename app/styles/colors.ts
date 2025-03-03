// app/styles/colors.ts
export const colors = {
  // Primary colors
  primary: {
    dark: '#0B1033', // Dark blue background
    main: '#2E3192', // Primary blue
    light: '#6366f1', // Light blue for buttons and highlights
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF', // White text
    secondary: '#A9B1FC', // Light blue text
    muted: '#6B7AEB', // Muted blue text
  },
  
  // UI Element colors
  ui: {
    card: '#1A2152', // Darker blue for cards
    cardHighlight: '#202766', // Slightly lighter blue for card highlights
    border: '#374296', // Border color
    divider: '#2A3175', // Divider color
  },
  
  // Functional colors
  functional: {
    success: '#4ADE80', // Green for success indicators
    warning: '#FACC15', // Yellow for warnings
    error: '#EF4444', // Red for errors
    info: '#60A5FA', // Blue for information
  },
  
  // Chart colors
  chart: {
    awake: '#60A5FA', // Blue for awake state
    rem: '#9061FA', // Purple for REM sleep
    light: '#6B7AEB', // Light blue for light sleep
    deep: '#2E3192', // Dark blue for deep sleep
    line: '#6366f1', // Line color for charts
  },
};

// Navigation tab colors
export const tabColors = {
  active: colors.primary.light,
  inactive: colors.text.muted,
  background: colors.primary.dark,
};

// Sleep mode colors
export const sleepModeColors = {
  restorative: '#6366f1',
  deep: '#3730A3',
  lucid: '#9061FA',
  light: '#60A5FA',
};

// Volume level colors
export const volumeLevels = {
  high: '#FF4D6D',
  medium: '#FBB454',
  low: '#60A5FA',
  mute: '#9CA3AF',
};