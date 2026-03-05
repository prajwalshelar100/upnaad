"use client";

import { Maximize2, Minimize2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ReadingModeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { isReadingMode, toggleReadingMode } = useTheme();

  return (
    <button
      onClick={toggleReadingMode}
      className={
        showLabel
          ? "flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark hover:border-accent dark:hover:border-accent rounded-full transition-colors text-sm font-bold text-text-secondary hover:text-text-light dark:hover:text-text-dark"
          : "p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      }
      aria-label="Toggle Full Screen Mode"
    >
      {isReadingMode ? <Minimize2 size={showLabel ? 16 : 20} /> : <Maximize2 size={showLabel ? 16 : 20} />}
      {showLabel && (
        <span className="hidden sm:inline">{isReadingMode ? "Exit Full Screen" : "Full Screen"}</span>
      )}
    </button>
  );
}
