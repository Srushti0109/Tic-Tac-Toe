export const themes = [
  { id: 'minimal', name: 'Classic Minimal' },
  { id: 'cyberpunk', name: 'Neon Cyberpunk' },
  { id: 'space', name: 'Space Theme' },
  { id: 'retro', name: 'Retro Arcade' },
  { id: 'glass', name: 'Gradient Glass' }
];

// Helper to set theme on document body
export const applyTheme = (themeId) => {
  if (themeId === 'minimal') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', themeId);
  }
};
