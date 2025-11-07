import { createContext, useContext, useMemo, useState } from 'react';
import { darkTheme, lightTheme } from '../../components/Misc/Themes.js';

//#1
const ThemeContext = createContext();

//#2
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const theme = useMemo(() => {
    return themeMode === 'dark' ? darkTheme : lightTheme;
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
