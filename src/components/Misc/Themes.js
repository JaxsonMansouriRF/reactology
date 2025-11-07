// theme.js
export const darkTheme = {
  MODE: 'dark',
  PRIMARY_COLOR: '#0F172A', // Deep slate background (header/footer)
  SECONDARY_COLOR: '#1E293B', // Slightly lighter panel/background
  ACCENT_COLOR: '#6366F1', // Indigo accent
  BACKGROUND_COLOR: '#111827', // Main page background
  PAPER_COLOR: '#1E293B', // For cards or content containers
  TEXT_COLOR: '#F9FAFB', // Bright readable text
  SUBTEXT_COLOR: '#94A3B8', // Muted text for descriptions
  BORDER_COLOR: '#334155', // Divider lines
  HOVER_BUTTON: 'rgba(99,102,241,0.2)', // Soft hover for buttons
  SHADOW: '0 2px 8px rgba(0, 0, 0, 0.5)',

  FONT: {
    FAMILY: '"Inter", "Roboto", sans-serif',
    BASE_SIZE: '0.95rem',
  },
};

export const lightTheme = {
  MODE: 'light',
  PRIMARY_COLOR: '#FFFFFF', // Header/Footer background
  SECONDARY_COLOR: '#F3F4F6', // Panels / Paper backgrounds
  ACCENT_COLOR: '#6366F1', // Indigo accent (matches dark theme)
  BACKGROUND_COLOR: '#F9FAFB', // Page background
  PAPER_COLOR: '#FFFFFF', // Card and container color
  TEXT_COLOR: '#111827', // Dark text for contrast
  SUBTEXT_COLOR: '#4B5563', // Muted text for descriptions
  BORDER_COLOR: '#E5E7EB', // Light dividers and borders
  HOVER_BUTTON: 'rgba(99,102,241,0.08)', // Soft indigo hover
  SHADOW: '0 1px 4px rgba(0, 0, 0, 0.1)',

  FONT: {
    FAMILY: '"Inter", "Roboto", sans-serif',
    BASE_SIZE: '0.95rem',
  },
};
