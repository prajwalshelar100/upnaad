import PageHeader from '@/src/components/PageHeader';

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-24">
      <PageHeader 
        title="About UPNAAD" 
        description="UPNAAD is a research-driven media platform that explores the profound connection between sound, society, and the human experience."
      />

      <section className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-xl">1</div>
          <h3 className="font-bold text-xl tracking-tight">Research</h3>
          <p className="text-text-secondary text-sm leading-relaxed">We conduct original research into the neurological and sociological impacts of sound.</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-xl">2</div>
          <h3 className="font-bold text-xl tracking-tight">Podcast</h3>
          <p className="text-text-secondary text-sm leading-relaxed">We discuss our findings with experts to provide context and depth to the data.</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-xl">3</div>
          <h3 className="font-bold text-xl tracking-tight">Music</h3>
          <p className="text-text-secondary text-sm leading-relaxed">We translate our research into musical compositions, creating sound with substance.</p>
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-3xl font-bold tracking-tight">Our Philosophy</h2>
        <div className="text-xl text-text-secondary leading-relaxed space-y-8 font-light">
          <p>
            In an era of rapid information consumption, UPNAAD advocates for <span className="text-text-light dark:text-text-dark font-medium italic">"slow media"</span>—content that is deeply researched, thoughtfully discussed, and artistically expressed.
          </p>
          <p>
            We believe that sound is not just an aesthetic experience, but a fundamental building block of our social and psychological reality. By studying sound, we study ourselves.
          </p>
          <p>
            Our platform serves as a bridge between the academic world and the creative arts, ensuring that every track we release and every podcast we record is grounded in rigorous study.
          </p>
        </div>
      </section>
    </div>
  );
}
