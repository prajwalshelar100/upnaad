"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Only show if they haven't made a choice yet
    const hasConsent = localStorage.getItem('upnaad-cookie-consent');
    if (!hasConsent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('upnaad-cookie-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('upnaad-cookie-consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible && !showExplanation) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl mx-auto"
        >
          <div className="bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6">
              
              {!showExplanation ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full hidden sm:block">
                      <Cookie size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight mb-1 text-text-light dark:text-text-dark flex items-center gap-2">
                        We use cookies! 🍪
                        <button 
                          onClick={() => setShowExplanation(true)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full text-text-secondary transition-colors"
                          title="Why do we use cookies?"
                        >
                          <Info size={14} />
                        </button>
                      </h4>
                      <p className="text-xs text-text-secondary pr-4">
                        We use essential local storage to remember your theme and audio preferences. None of this data leaves your browser.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={handleDecline}
                      className="px-4 py-2 text-xs font-semibold rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={handleAccept}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-2 border-b border-border-light dark:border-border-dark pb-3">
                    <h4 className="text-sm font-bold flex items-center gap-2"><Info size={16} className="text-accent"/> Why do we use cookies?</h4>
                    <button onClick={() => setShowExplanation(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                      <X size={16} />
                    </button>
                  </div>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc pl-4">
                    <li><strong className="text-text-light dark:text-text-dark">Theme Preference:</strong> We remember if you prefer Light or Dark mode.</li>
                    <li><strong className="text-text-light dark:text-text-dark">Music State:</strong> Keeps your audio playing and remembers volume exactly as you left it.</li>
                    <li><strong className="text-text-light dark:text-text-dark">Tutorials:</strong> Makes sure we never bother you with the welcome tutorial once you've seen it!</li>
                  </ul>
                  <p className="text-[10px] text-text-secondary mt-4 font-mono">
                    We do NOT use external tracking cookies, analytics cookies, or marketing trackers. Your data stays completely on your device.
                  </p>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
