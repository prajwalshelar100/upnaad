"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Mic2,
  Music,
  Archive,
  Users,
  Info,
  PanelLeftClose,
  PanelLeft,
  Zap,
  ChevronDown,
  Instagram,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, isReadingMode } = useTheme();
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  if (isReadingMode) return null;

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Latest Drop', href: '/releases/the-rhythm-of-identity', icon: Zap },
    { name: 'Behind the Song', href: '/releases', icon: BookOpen },
    { name: 'Podcast', href: '/podcast', icon: Mic2 },
    { name: 'Music', href: '/music', icon: Music },
    { name: 'Archive', href: '/archive', icon: Archive },
    { name: 'Collaborate', href: '/collaborate', icon: Users },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white dark:bg-[#0D0D0D] border-r border-border-light dark:border-border-dark transition-all duration-300 ease-in-out z-50",
        isSidebarCollapsed ? "w-[72px]" : "w-[260px]",
        "hidden md:block"
      )}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className={cn("flex flex-shrink-0 items-center transition-all duration-300", isSidebarCollapsed ? "p-4 justify-center" : "p-6 justify-between")}>
          {!isSidebarCollapsed && (
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap overflow-hidden">
              <Image src="/logo.png" alt="UPNAAD Logo" width={28} height={28} className="rounded-sm object-cover flex-shrink-0" />
              <span className="font-bold text-2xl tracking-tighter text-text-light dark:text-text-dark">
                UPNAAD
              </span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
            aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col justify-between pb-28">
          <nav className="px-3 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={isSidebarCollapsed ? item.name : ""}
                  className={cn(
                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-accent font-semibold"
                      : "text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-text-light dark:hover:text-text-dark"
                  )}
                >
                  <item.icon size={22} className={cn("shrink-0 transition-transform group-hover:scale-110", isActive && "text-accent")} />
                  {!isSidebarCollapsed && (
                    <span className="text-sm tracking-tight whitespace-nowrap overflow-hidden">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border-light dark:border-border-dark flex flex-col gap-4 mt-auto">
            {!isSidebarCollapsed ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-3 text-text-secondary w-full">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="w-full h-px bg-border-light dark:bg-border-dark my-1"></div>
                <button
                  onClick={() => setIsSocialsOpen(!isSocialsOpen)}
                  className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 group-hover:scale-110 transition-transform"><Zap size={20} /></div>
                    <span className="text-sm font-medium">Socials</span>
                  </div>
                  <ChevronDown size={16} className={cn("transition-transform duration-300", isSocialsOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isSocialsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pl-12 pr-3 py-2">
                        <a href="#" className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors"><Twitter size={16} /> Twitter</a>
                        <a href="#" className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors"><Instagram size={16} /> Instagram</a>
                        <a href="#" className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors"><Linkedin size={16} /> LinkedIn</a>
                        <a href="#" className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-accent transition-colors"><Mail size={16} /> Contact</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col gap-6 items-center mb-4 text-text-secondary">
                <ThemeToggle />
                <div className="w-8 h-px bg-border-light dark:bg-border-dark"></div>
                <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-accent transition-colors"><Linkedin size={20} /></a>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
