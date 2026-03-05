"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Music as MusicIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { musicTracks } from '@/src/data/music';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function CollaborateForm() {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get('reference');
  const referenceTrack = referenceId ? musicTracks.find(t => t.id === referenceId) : null;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mbdzrlww", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-2xl py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
          <Send size={40} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Message Received</h1>
        <p className="text-xl text-text-secondary">
          Thank you for reaching out. Our team will review your proposal and get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-accent font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Collaborate</h1>
        <p className="text-xl text-text-secondary font-light">
          We are always looking for researchers, musicians, and thinkers to join the UPNAAD ecosystem.
        </p>
      </header>

      {referenceTrack && (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#111111] rounded-2xl flex items-center gap-4 border border-border-light dark:border-border-dark">
          <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex flex-shrink-0 items-center justify-center">
            <MusicIcon size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Referenced Track</p>
            <p className="text-sm font-bold">{referenceTrack.title}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Hidden field to send reference track if it exists */}
        {referenceTrack && (
          <input type="hidden" name="reference_track" value={referenceTrack.title} />
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">Full Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">Social Handle / Website</label>
            <input
              name="social_handle"
              type="text"
              placeholder="@johndoe or johndoe.com"
              className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">Genre / Style</label>
            <input
              name="genre_style"
              type="text"
              placeholder="e.g., Electronic, Ambient, Jazz"
              className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">Area of Interest</label>
          <select
            name="interest"
            className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all appearance-none cursor-pointer"
            defaultValue={referenceTrack ? "Music" : "New Releases"}
          >
            <option value="New Releases">Suggest Research Topic</option>
            <option value="Study">Collaborate on Study</option>
            <option value="Music">Music Collaboration</option>
            <option value="Podcast">Podcast Guest Request</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">Your Message</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell us about your background and what you have in mind..."
            className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 focus:border-accent outline-none transition-all resize-none placeholder:text-gray-300 dark:placeholder:text-gray-700"
          />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again or email us directly.</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-text-light dark:bg-text-dark text-white dark:text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:opacity-90 transition-all disabled:opacity-50 group"
        >
          {status === "submitting" ? "Sending..." : "Send Proposal"}
          <Send size={18} className={cn("transition-transform", status !== "submitting" && "group-hover:translate-x-1 group-hover:-translate-y-1")} />
        </button>
      </form>
    </div>
  );
}

export default function CollaboratePage() {
  return (
    <Suspense fallback={<div className="animate-pulse w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-3xl"></div>}>
      <CollaborateForm />
    </Suspense>
  );
}
