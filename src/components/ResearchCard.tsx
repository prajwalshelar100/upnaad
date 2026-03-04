import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ResearchDrop } from '@/src/data/research';

export default function ResearchCard({ drop }: { drop: ResearchDrop }) {
  return (
    <Link 
      href={`/research/${drop.slug}`}
      className="group block bg-white dark:bg-[#111111] border border-border-light dark:border-border-dark rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={drop.coverImage}
          alt={drop.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            Read Full Study <ArrowRight size={14} />
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {drop.topics.slice(0, 2).map(topic => (
              <span key={topic} className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2 py-1 rounded border border-accent/10">
                {topic}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-mono text-text-secondary">{drop.date}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
          {drop.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 font-light">
          {drop.thesis}
        </p>
      </div>
    </Link>
  );
}
