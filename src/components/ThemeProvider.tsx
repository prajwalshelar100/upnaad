"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isReadingMode: boolean;
  toggleReadingMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isContextPanelCollapsed: boolean;
  toggleContextPanel: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isContextPanelCollapsed, setIsContextPanelCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = (typeof window !== 'undefined'
      ? (localStorage.getItem('theme') as Theme | null)
      : null) as Theme | null;

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      return;
    }

    // Fallback to system preference on first load
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = prefersDark ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleReadingMode = () => setIsReadingMode(!isReadingMode);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleContextPanel = () => setIsContextPanelCollapsed(!isContextPanelCollapsed);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isReadingMode, 
      toggleReadingMode,
      isSidebarCollapsed,
      toggleSidebar,
      isContextPanelCollapsed,
      toggleContextPanel
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
