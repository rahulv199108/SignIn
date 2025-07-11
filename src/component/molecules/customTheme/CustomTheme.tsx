// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../../../navigation/stackNavigation/StackNavigation';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [theme, setTheme] = useState(isDark ? darkTheme : lightTheme);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? darkTheme : lightTheme);
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      const newIsDark = colorScheme === 'dark';
      setIsDark(newIsDark);
      setTheme(newIsDark ? darkTheme : lightTheme);
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};







