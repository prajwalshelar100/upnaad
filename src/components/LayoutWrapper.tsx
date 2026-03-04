"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import ContextPanel from './ContextPanel';
import ThemeToggle from './ThemeToggle';
import ReadingModeToggle from './ReadingModeToggle';
import { useTheme } from './ThemeProvider';
import GlobalMusicPlayer from './GlobalMusicPlayer';
import MobileFooter from './MobileFooter';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isReadingMode, isSidebarCollapsed, isContextPanelCollapsed } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0D0D] text-text-light dark:text-text-dark font-sans selection:bg-accent/20 overflow-x-hidden">
      {/* Mobile Nav */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-[60] bg-white/90 dark:bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="UPNAAD Logo" width={24} height={24} className="rounded-sm object-cover" />
          <span className="font-bold text-xl tracking-tighter">UPNAAD</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-white dark:bg-[#0D0D0D] md:hidden"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="UPNAAD Logo" width={32} height={32} className="rounded-sm object-cover" />
                  <span className="font-bold text-2xl tracking-tighter">UPNAAD</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X size={32} />
                </button>
              </div>
              <nav className="flex flex-col gap-8 text-3xl font-bold tracking-tight">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/research" onClick={() => setIsMobileMenuOpen(false)}>Research</Link>
                <Link href="/podcast" onClick={() => setIsMobileMenuOpen(false)}>Podcast</Link>
                <Link href="/music" onClick={() => setIsMobileMenuOpen(false)}>Music</Link>
                <Link href="/archive" onClick={() => setIsMobileMenuOpen(false)}>Archive</Link>
                <Link href="/collaborate" onClick={() => setIsMobileMenuOpen(false)}>Collaborate</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </nav>
              <div className="mt-auto pt-12 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                <ReadingModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex pt-[73px] md:pt-0">
        <Sidebar />

        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out min-h-screen flex flex-col pb-[80px]",
            !isReadingMode && !isSidebarCollapsed && "md:ml-[260px]",
            !isReadingMode && isSidebarCollapsed && "md:ml-[72px]",
            !isReadingMode && !isContextPanelCollapsed && "lg:mr-[300px]",
            !isReadingMode && isContextPanelCollapsed && "lg:mr-[56px]",
            isReadingMode && "mx-auto w-full"
          )}
        >
          <div
            className={cn(
              "mx-auto px-4 sm:px-6 py-8 md:py-16 transition-all duration-500",
              isReadingMode ? "max-w-none 2xl:max-w-[1400px]" : "max-w-5xl xl:max-w-6xl"
            )}
          >
            <div className="flex justify-end mb-8 md:mb-12 items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <ReadingModeToggle />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>

          <MobileFooter />
        </main>

        <ContextPanel />
      </div>

      <GlobalMusicPlayer />
    </div>
  );
}
