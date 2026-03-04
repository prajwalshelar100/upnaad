"use client";

import { Maximize2, Minimize2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ReadingModeToggle() {
  const { isReadingMode, toggleReadingMode } = useTheme();

  return (
    <button
      onClick={toggleReadingMode}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      aria-label="Toggle Reading Mode"
    >
      {isReadingMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
    </button>
  );
}
