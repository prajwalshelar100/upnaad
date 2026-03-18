"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Mic2, Music, PanelRightOpen, PanelLeft, X } from 'lucide-react';

export default function WelcomeTutorial() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user is completely new to the site
    const hasSeenTutorial = localStorage.getItem('upnaad-welcome-tutorial');
    if (!hasSeenTutorial) {
      // Small delay on first load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissTutorial = () => {
    localStorage.setItem('upnaad-welcome-tutorial', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={dismissTutorial}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#111111] border border-border-light dark:border-border-dark rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={dismissTutorial}
                className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close tutorial"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>
            
            <div className="p-8 sm:p-12 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 block">
                Welcome to
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-text-light dark:text-text-dark">
                UPNAAD
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-10 max-w-xl">
                Research in Motion. Sound with Substance. We are dedicated to exploring the intersection of sonic environments and sociology.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
                
                <div className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 dark:bg-[#161616] p-5 rounded-2xl border border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg"><PanelLeft size={18} className="text-blue-500" /></div>
                    <div className="p-2 bg-purple-500/10 rounded-lg"><BookOpen size={18} className="text-purple-500" /></div>
                  </div>
                  <h4 className="text-sm font-bold mb-1">Explore Studies</h4>
                  <p className="text-xs text-text-secondary">Use the left navigation sidebar to dive deep into our research articles and thesis drops.</p>
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 dark:bg-[#161616] p-5 rounded-2xl border border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg"><PanelRightOpen size={18} className="text-accent" /></div>
                    <div className="p-2 bg-green-500/10 rounded-lg"><Mic2 size={18} className="text-green-500" /></div>
                  </div>
                  <h4 className="text-sm font-bold mb-1">Context Panel</h4>
                  <p className="text-xs text-text-secondary">The right sidebar dynamically updates with podcasts and music tracks incredibly relevant to what you are currently reading.</p>
                </div>
                
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-3 bg-red-500/10 rounded-full animate-pulse">
                    <Music size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Global Playback</h4>
                    <p className="text-xs text-text-secondary">Your music never stops when you navigate.</p>
                  </div>
                </div>
                
                <button
                  onClick={dismissTutorial}
                  className="w-full sm:w-auto px-8 py-3 bg-text-light dark:bg-text-dark text-white dark:text-[#0D0D0D] text-sm font-bold tracking-wide rounded-xl hover:opacity-90 transition-opacity"
                >
                  Enter Experience
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
