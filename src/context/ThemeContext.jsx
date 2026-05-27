import React, { createContext, useContext, useEffect } from 'react';
import { useGameStorage } from '../hooks/useGameStorage';
import { applyTheme, themes } from '../themes/themeEngine';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useGameStorage('tic-tac-toe-theme', 'cyberpunk');
  const [soundEnabled, setSoundEnabled] = useGameStorage('tic-tac-toe-sound', true);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, soundEnabled, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
