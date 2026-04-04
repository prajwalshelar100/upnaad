"use client";

import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, Music, BookOpen, PlusCircle, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function GuidedAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const ACTIONS = [
    { 
      label: "Explore Music", 
      icon: Music, 
      href: "/music", 
      description: "Stream our sonic translations." 
    },
    { 
      label: "Understand Meaning", 
      icon: BookOpen, 
      href: "/releases", 
      description: "Dive into the research behind songs." 
    },
    { 
      label: "Submit a Topic", 
      icon: PlusCircle, 
      href: "/submit-topic", 
      description: "Influence our next creative drop." 
    },
    { 
      label: "Work With Us", 
      icon: Users, 
      href: "/collaborate", 
      description: "Partner on research or production." 
    }
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] bg-text-light dark:bg-text-dark text-white dark:text-black p-4 rounded-2xl shadow-2xl flex items-center gap-3 group"
      >
        <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
        {!isOpen && <span className="text-xs font-bold uppercase tracking-widest pr-2 hidden md:block">How to use UPNAAD?</span>}
      </motion.button>

      {/* Modal / Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-24 right-8 w-[calc(100vw-4rem)] md:w-[400px] bg-white dark:bg-gray-900 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-2xl z-[80] overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">UPNAAD Navigator</h3>
                    <p className="text-xs text-text-secondary font-medium uppercase tracking-[0.2em] mt-1">Research in Motion</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-text-secondary font-light">What would you like to do today?</p>
                  <div className="grid gap-3">
                    {ACTIONS.map((action, i) => (
                      <Link
                        key={i}
                        href={action.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between p-5 bg-gray-50 dark:bg-black rounded-2xl border border-transparent hover:border-accent transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg group-hover:text-accent transition-colors">
                            <action.icon size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold tracking-tight">{action.label}</p>
                            <p className="text-[10px] text-text-secondary">{action.description}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-light/50 dark:border-border-dark/50">
                   <p className="text-[10px] text-text-secondary leading-relaxed font-light italic">
                    "Sound is the most powerful vehicle for collective awareness." — UPNAAD Motto
                   </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
