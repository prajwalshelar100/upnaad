"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  Music2,
  BookOpen,
  GraduationCap,
  Users,
  Info,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Briefcase
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

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Everything in one place',
  },
  {
    name: 'Sound',
    href: '/music',
    icon: Music2,
    description: 'Music, drops & podcasts',
    // Sub-links shown when hovered/expanded
    sub: [
      { name: 'Music & Drops', href: '/music' },
      { name: 'Behind the Song', href: '/releases' },
      { name: 'Podcast', href: '/podcast' },
    ],
  },
  {
    name: 'Stories',
    href: '/stories',
    icon: BookOpen,
    description: 'Narratives & reflections',
  },
  {
    name: 'Learn',
    href: '/blog',
    icon: GraduationCap,
    description: 'Sound, science & society',
    sub: [
      { name: 'Articles', href: '/blog' },
      { name: 'Meaning Hub', href: '/releases' },
      { name: 'Archive', href: '/archive' },
    ],
  },
  {
    name: 'Community',
    href: '/topics',
    icon: Users,
    description: 'Voices, ideas & topics',
    sub: [
      { name: 'Explore Topics', href: '/topics' },
      { name: 'Submit a Topic', href: '/submit-topic' },
      { name: 'Share a Story', href: '/stories/submit' },
      { name: 'Collaborate', href: '/collaborate' },
    ],
  },
  {
    name: 'About',
    href: '/about',
    icon: Info,
    description: 'Mission & work with us',
    sub: [
      { name: 'About UPNAAD', href: '/about' },
      { name: 'Services', href: '/services' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, isReadingMode } = useTheme();
  const [openSubs, setOpenSubs] = useState<Set<string>>(new Set());
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  const toggleSub = (name: string) => {
    setOpenSubs(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  if (isReadingMode) return null;

  const isActive = (item: typeof navItems[0]) => {
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href) ||
      (item.sub?.some(s => pathname.startsWith(s.href)) ?? false);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out z-50",
        isSidebarCollapsed ? "w-[72px]" : "w-[240px]",
        "hidden md:block"
      )}
    >
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-sky-500/3 pointer-events-none" />

      <div className="relative flex flex-col h-[calc(100%-80px)] overflow-hidden">
        {/* Logo + Collapse Toggle */}
        <div className={cn("flex flex-shrink-0 items-center transition-all duration-300 h-[68px] border-b border-slate-200 dark:border-slate-800",
          isSidebarCollapsed ? "px-4 justify-center" : "px-4 justify-between")}>
          {!isSidebarCollapsed && (
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="UPNAAD" width={26} height={26} className="rounded-sm object-cover flex-shrink-0" />
              <span className="font-bold text-lg tracking-tight text-text-light dark:text-text-dark">UPNAAD</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors flex-shrink-0 text-text-secondary hover:text-accent"
            aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-4 px-2 pb-[88px]">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const hasSub = item.sub && item.sub.length > 0 && !isSidebarCollapsed;
              const subOpen = openSubs.has(item.name);

              return (
                <div key={item.name}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group",
                      active
                        ? "bg-accent text-white shadow-sm shadow-accent/30"
                        : "text-text-secondary hover:bg-accent/8 dark:hover:bg-accent/10 hover:text-accent"
                    )}
                    onClick={() => {
                      if (hasSub) {
                        toggleSub(item.name);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 flex-1 min-w-0"
                      onClick={(e) => hasSub && e.preventDefault()}
                      title={isSidebarCollapsed ? item.name : ""}
                    >
                      <item.icon
                        size={20}
                        className={cn("shrink-0 transition-transform group-hover:scale-110",
                          active ? "text-white" : "")}
                      />
                      {!isSidebarCollapsed && (
                        <span className="text-sm font-semibold tracking-tight truncate">{item.name}</span>
                      )}
                    </Link>
                    {hasSub && !isSidebarCollapsed && (
                      <ChevronDown
                        size={14}
                        className={cn("shrink-0 transition-transform duration-300 opacity-60",
                          subOpen && "rotate-180")}
                      />
                    )}
                  </div>

                  {/* Sub-links */}
                  <AnimatePresence initial={false}>
                    {hasSub && subOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 mt-1 mb-1 space-y-0.5 border-l-2 border-accent/20 pl-3">
                          {item.sub!.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={cn(
                                "block py-1.5 px-2 text-xs font-medium rounded-lg transition-colors",
                                pathname.startsWith(sub.href) && sub.href !== '/'
                                  ? "text-accent font-bold"
                                  : "text-text-secondary hover:text-accent"
                              )}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Theme + Socials */}
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 p-3 space-y-2">
          {!isSidebarCollapsed ? (
            <>
              <div className="flex items-center justify-between px-2 text-text-secondary">
                <span className="text-xs font-medium">Theme</span>
                <ThemeToggle />
              </div>
              <div className="w-full h-px bg-border-light dark:bg-border-dark" />
              <button
                onClick={() => setIsSocialsOpen(!isSocialsOpen)}
                className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-text-secondary hover:bg-accent/5 transition-colors text-xs font-semibold"
              >
                <span>Follow UPNAAD</span>
                <ChevronDown size={13} className={cn("transition-transform", isSocialsOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isSocialsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 px-2 py-1">
                      {/* TODO: Replace hrefs with real social profile URLs */}
                      <a href="https://twitter.com/upnaad" target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors" title="Twitter / X">
                        <Twitter size={15} />
                      </a>
                      <a href="https://instagram.com/upnaad" target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors" title="Instagram">
                        <Instagram size={15} />
                      </a>
                      <a href="https://www.youtube.com/channel/UCSOQzKtkWP3Wues4CA_m3Gw" target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors" title="YouTube">
                        <Youtube size={15} />
                      </a>
                      <a href="mailto:hello@upnaad.com"
                        className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors" title="Email">
                        <Mail size={15} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex flex-col gap-4 items-center text-text-secondary">
              <ThemeToggle />
              <div className="w-8 h-px bg-accent/10" />
              <a href="https://twitter.com/upnaad" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors" title="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com/upnaad" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors" title="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/channel/UCSOQzKtkWP3Wues4CA_m3Gw" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors" title="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
