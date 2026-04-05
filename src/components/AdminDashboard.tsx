"use client";

import { useState, useTransition } from 'react';
import { Music, Mic2, FileText, Sparkles, Send, LayoutDashboard, Lock, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import PageHeader from './PageHeader';
import { createMusic, createPodcast, createBlog, createRelease, createService } from '@/app/actions/admin';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { motion, AnimatePresence } from 'motion/react';

type Tab = 'music' | 'podcast' | 'blog' | 'release' | 'service';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('music');
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.length > 3) {
      setIsAuthenticated(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, action: any) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    formData.append('passcode', passcode);

    startTransition(async () => {
      const result = await action(formData);
      if (result.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to save content");
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-premium space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
            <p className="text-text-secondary text-sm">Enter your administrative passcode to continue.</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="relative">
              <input
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b-2 border-border-light dark:border-border-dark py-4 px-2 focus:border-accent outline-none transition-all text-2xl tracking-[0.5em] text-center"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors"
              >
                {showPasscode ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-text-light dark:bg-text-dark text-white dark:text-black py-4 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              disabled={!passcode}
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'music', label: 'Music', icon: Music },
    { id: 'podcast', label: 'Podcast', icon: Mic2 },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'release', label: 'Release', icon: Sparkles },
    { id: 'service', label: 'Service', icon: Briefcase },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <PageHeader 
          title="Admin Dashboard" 
          description="Manage platform content synchronization across Sanity and the web."
          className="mb-0"
        />
        <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-full border border-border-light dark:border-border-dark shadow-sm overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStatus("idle"); }}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-text-light text-white dark:bg-text-dark dark:text-black shadow-lg shadow-accent/10" 
                  : "text-text-secondary hover:bg-accent/5 dark:hover:bg-white/5"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl">
        {status === "success" && (
          <div className="mb-12 p-6 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4 text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 size={24} />
            <div className="flex-1">
              <p className="font-bold">Content Saved Successfully!</p>
              <p className="text-sm opacity-90 text-text-secondary">Changes will reflect across the platform shortly.</p>
            </div>
            <button onClick={() => setStatus("idle")} className="text-xs font-bold uppercase tracking-widest hover:underline">Dismiss</button>
          </div>
        )}

        {status === "error" && (
          <div className="mb-12 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-4">
            <EyeOff size={24} />
            <div className="flex-1">
              <p className="font-bold">Error Occurred</p>
              <p className="text-sm opacity-90 uppercase tracking-widest font-black">{errorMessage}</p>
            </div>
            <button onClick={() => setStatus("idle")} className="text-xs font-bold uppercase tracking-widest hover:underline">Try Again</button>
          </div>
        )}

        <div className={cn("transition-all duration-500", isPending && "opacity-50 pointer-events-none")}>
          {activeTab === 'music' && (
            <AdminForm title="Add Music Track" onSubmit={(e) => handleSubmit(e, createMusic)} isPending={isPending}>
              <FormGrid>
                <FormField label="Title" name="title" required placeholder="e.g. Echoes of the Void" />
                <FormField label="Genre" name="genre" required placeholder="e.g. Ambient Sanskrit" />
                <FormField label="Category" name="category" required placeholder="e.g. Meditation" />
                <FormField label="Date" name="date" type="date" />
              </FormGrid>
              <FormGrid>
                <FormField label="Spotify URL" name="spotifyUrl" required placeholder="https://open.spotify.com/..." />
                <FormField label="YouTube URL" name="youtubeUrl" required placeholder="https://youtube.com/..." />
              </FormGrid>
              <FormField label="Audio URL (Direct)" name="audioUrl" placeholder="https://..." />
              <FormField label="Description" name="description" type="textarea" required />
              <FormGrid>
                <FormField label="Awareness Theme" name="theme" placeholder="e.g. Mental Resilience" />
                <FormField label="Short Meaning" name="meaning" type="textarea" placeholder="How common sound patterns affect logic..." />
              </FormGrid>
              <FormField label="Artwork Image" name="artwork" type="file" accept="image/*" />
            </AdminForm>
          )}

          {activeTab === 'podcast' && (
            <AdminForm title="Add Podcast Episode" onSubmit={(e) => handleSubmit(e, createPodcast)} isPending={isPending}>
              <FormGrid>
                <FormField label="Title" name="title" required placeholder="e.g. Episode 12: Sound & Society" />
                <FormField label="Date" name="date" type="date" />
              </FormGrid>
              <FormField label="YouTube URL" name="youtubeUrl" required placeholder="https://youtube.com/..." />
              <FormField label="Description" name="description" type="textarea" required />
              <FormField label="Thumbnail Image" name="thumbnail" type="file" accept="image/*" />
            </AdminForm>
          )}

          {activeTab === 'blog' && (
            <AdminForm title="Add Research Article" onSubmit={(e) => handleSubmit(e, createBlog)} isPending={isPending}>
              <FormGrid>
                <FormField label="Title" name="title" required placeholder="e.g. The Neurophysics of Om" />
                <FormField label="Date" name="date" type="date" />
              </FormGrid>
              <FormField label="Categories" name="categories" placeholder="e.g. Brain, Sound, Sanskrit (comma separated)" />
              <FormField label="Excerpt" name="excerpt" type="textarea" placeholder="Short SEO summary..." />
              <FormField label="Content (Markdown)" name="content" type="textarea" required rows={10} placeholder="# Intro... ## Section 1..." />
              <FormField label="Cover Image" name="coverImage" type="file" accept="image/*" />
            </AdminForm>
          )}

          {activeTab === 'release' && (
            <AdminForm title="Add Research Release" onSubmit={(e) => handleSubmit(e, createRelease)} isPending={isPending}>
              <FormGrid>
                <FormField label="Title" name="title" required placeholder="e.g. Nirvana (Sanskrit Meaning)" />
                <FormField label="Date" name="date" type="date" />
              </FormGrid>
              <FormField label="Topics" name="topics" placeholder="Sanskrit, Meaning, Depth (comma separated)" />
              <FormField label="Thesis" name="thesis" type="textarea" required placeholder="The central argument of this research..." />
              <FormField label="Scientific Explanation" name="philosophicalExplanation" type="textarea" placeholder="Detailed analysis..." />
              <FormGrid>
                <FormField label="Sanskrit Text" name="sanskritText" type="textarea" placeholder="ॐ..." />
                <FormField label="Transliteration" name="transliteration" type="textarea" placeholder="Om..." />
              </FormGrid>
              <FormField label="Deep Interpretation" name="deepInterpretation" type="textarea" />
              <FormField label="Why it Matters" name="whyItMatters" type="textarea" />
              <FormField label="Markdown Content" name="content" type="textarea" rows={6} placeholder="Detailed research body..." />
              <FormField label="Cover Image" name="coverImage" type="file" accept="image/*" />
            </AdminForm>
          )}

          {activeTab === 'service' && (
            <AdminForm title="Add Service Offering" onSubmit={(e) => handleSubmit(e, createService)} isPending={isPending}>
              <FormGrid>
                <FormField label="Service Title" name="title" required placeholder="e.g. Sonic Branding" />
                <FormField label="Pricing Range" name="priceRange" placeholder="e.g. $500 - $2,000 or Custom" />
              </FormGrid>
              <FormField label="Icon Name (Lucide)" name="icon" placeholder="e.g. AudioLines, Brain, Sparkles" />
              <FormField label="Features" name="features" type="textarea" placeholder="Feature 1, Feature 2, Feature 3 (comma separated)" />
              <FormField label="Description" name="description" type="textarea" required />
            </AdminForm>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminForm({ title, children, onSubmit, isPending }: { title: string; children: React.ReactNode; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; isPending: boolean }) {
  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-premium space-y-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2 text-text-secondary text-[10px] uppercase font-bold tracking-widest">
          <Sparkles size={14} className="text-accent" /> Draft Sync Active
        </div>
      </div>
      
      <div className="space-y-8">
        {children}
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="bg-text-light dark:bg-text-dark text-white dark:text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 group"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving to Sanity...
            </>
          ) : (
            <>
              Publish Content
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {children}
    </div>
  );
}

function FormField({ label, name, type = 'text', required = false, placeholder, rows = 4, accept }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; rows?: number; accept?: string }) {
  const inputClasses = "w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all placeholder:text-text-secondary/30 text-sm";
  
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary group-focus-within:text-accent transition-colors">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={cn(inputClasses, "resize-none")}
        />
      ) : type === 'file' ? (
        <input
          name={name}
          type={type}
          required={required}
          accept={accept}
          className="w-full text-xs text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-accent/10 file:text-accent hover:file:bg-accent/20 cursor-pointer"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}
