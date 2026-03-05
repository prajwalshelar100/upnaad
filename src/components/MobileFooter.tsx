"use client";

import Link from 'next/link';
import { Home, BookOpen, Mic2, Music, Archive, Users, Info, ExternalLink } from 'lucide-react';

export default function MobileFooter() {
    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'New Releases', href: '/new-releases', icon: BookOpen },
        { name: 'Podcast', href: '/podcast', icon: Mic2 },
        { name: 'Music', href: '/music', icon: Music },
        { name: 'Archive', href: '/archive', icon: Archive },
        { name: 'Collaborate', href: '/collaborate', icon: Users },
        { name: 'About', href: '/about', icon: Info },
    ];

    return (
        <footer className="md:hidden border-t border-border-light dark:border-border-dark bg-white dark:bg-[#0D0D0D] py-12 px-6 mt-16 w-full">
            <div className="max-w-md mx-auto space-y-10">
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-5">Page Navigation</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 text-sm font-medium text-text-secondary hover:text-accent transition-colors py-1"
                            >
                                <item.icon size={16} />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-border-light dark:border-border-dark">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-5">Resources</h3>
                    <div className="space-y-4">
                        <a href="#" className="flex items-center justify-between text-sm font-medium text-text-secondary hover:text-accent transition-colors group p-1">
                            Spotify Playlist <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="#" className="flex items-center justify-between text-sm font-medium text-text-secondary hover:text-accent transition-colors group p-1">
                            YouTube Channel <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="#" className="flex items-center justify-between text-sm font-medium text-text-secondary hover:text-accent transition-colors group p-1">
                            New Releases Archive <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>

                <div className="pt-10 flex flex-col items-center justify-center gap-3 text-center">
                    <span className="font-bold text-2xl tracking-tighter text-text-light dark:text-text-dark">UPNAAD</span>
                    <p className="text-xs font-mono text-text-secondary">© {new Date().getFullYear()} UPNAAD.</p>
                    <p className="text-xs font-mono text-text-secondary">All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
