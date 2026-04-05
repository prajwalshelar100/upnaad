"use client";

import Link from 'next/link';
import { Home, BookOpen, Mic2, Music, Archive, Users, Info, ExternalLink } from 'lucide-react';

export default function MobileFooter() {
    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Behind the Song', href: '/releases', icon: BookOpen },
        { name: 'Podcast', href: '/podcast', icon: Mic2 },
        { name: 'Music', href: '/music', icon: Music },
        { name: 'Archive', href: '/archive', icon: Archive },
        { name: 'Collaborate', href: '/collaborate', icon: Users },
        { name: 'About', href: '/about', icon: Info },
    ];

    return (
        <footer className="md:hidden border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-12 px-6 mt-16 w-full">
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
                    <div className="flex flex-col gap-3">
                        <a 
                            href="https://open.spotify.com/user/31lle7khoqvlaqco6dsujppwadky?si=61326e719cec4eae" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-4 rounded-2xl bg-[#1DB954]/5 dark:bg-[#1DB954]/10 border border-[#1DB954]/20 transition-all font-bold group"
                        >
                            <span className="text-xs text-[#1DB954]">Spotify Playlist</span>
                            <ExternalLink size={14} className="text-[#1DB954] opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a 
                            href="https://www.youtube.com/channel/UCSOQzKtkWP3Wues4CA_m3Gw" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-4 rounded-2xl bg-[#FF0000]/5 dark:bg-[#FF0000]/10 border border-[#FF0000]/20 transition-all font-bold group"
                        >
                            <span className="text-xs text-[#FF0000]">YouTube Channel</span>
                            <ExternalLink size={14} className="text-[#FF0000] opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <Link 
                            href="/archive" 
                            className="flex items-center justify-between p-4 rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 transition-all font-bold group"
                        >
                            <span className="text-xs text-accent">Research Archive</span>
                            <ExternalLink size={14} className="text-accent opacity-70 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                </div>

                <div className="pt-10 flex flex-col items-center justify-center gap-3 text-center">
                    <span className="font-bold text-2xl tracking-tighter text-text-light dark:text-text-dark">UPNAAD</span>
                    <p className="text-xs font-mono text-text-secondary">© {new Date().getFullYear()} UPNAAD.</p>
                    <p className="text-xs font-mono text-text-secondary">All rights reserved.</p>
                    <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest pt-2">
                        Built by <a href="https://prajwalshelar.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline transition-all">Prajwal Shelar</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
