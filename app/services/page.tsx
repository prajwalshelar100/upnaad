import { client } from '@/src/sanity/lib/client';
import { allServicesQuery } from '@/src/sanity/lib/queries';
import { ArrowRight, AudioLines, Brain, Sparkles, MessageCircleCode } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/src/components/PageHeader';

export const revalidate = 60;

// Fallback data if Sanity is not yet populated
const fallbackServices = [
  {
    _id: '1',
    title: 'Custom Music Compositing',
    description: 'Bespoke musical compositions tailored specifically to your brand identity. Perfect for ad campaigns, digital presence, or immersive installations.',
    priceRange: '$500 - $2,000',
    icon: 'Sparkles',
    features: ['High-fidelity audio production', 'Iterative sound design', 'Full commercial rights', 'Stems included']
  },
  {
    _id: '2',
    title: 'Sonic Branding & Ident',
    description: 'Create a memorable auditory logo or 3-second theme that instantly connects your audience to your core, spiritual, or technological brand values.',
    priceRange: '$300 - $1,500',
    icon: 'AudioLines',
    features: ['3-5 second audio logo', 'Multiple variations', 'Brand methodology aligned', 'Platform-optimized mastering']
  },
  {
    _id: '3',
    title: 'Meditation & Focus Soundscapes',
    description: 'Long-form, continuous soundscapes designed using psychoacoustic principles to enhance focus, relaxation, or deep study states.',
    priceRange: '$100 - $500 / Hr',
    icon: 'Brain',
    features: ['Binaural beat integration', 'Seamless looping up to 8 hours', 'Sanskrit mantra infusion', 'Targeted brainwave frequencies']
  },
  {
    _id: '4',
    title: 'Personalized Sound Journeys',
    description: 'Tailor-made meditation or manifestation audio sequences parameterized by your specific personal or corporate goals, blending ambient drones with structural rhythms.',
    priceRange: 'Custom Quote',
    icon: 'Music',
    features: ['1-on-1 discovery session', 'Custom frequencies', 'Exclusive ownership', 'High-res audio delivery']
  },
  {
    _id: '5',
    title: 'Exclusive Licensing Library',
    description: 'Access a curated, royalty-free catalog of spiritual and focus music. Designed specifically for yogis, content creators, and wellness app developers.',
    priceRange: '$50 - $200 / Track',
    icon: 'BookOpen',
    features: ['Royalty-free usage', 'Immediate digital download', 'High-quality WAV files', 'Categorized by mood/brainwave']
  },
  {
    _id: '6',
    title: 'Collaboration & Consulting',
    description: 'Partner with UPNAAD on research studies, immersive audio environments, or technical consulting for digital music production.',
    priceRange: 'Consulting Retainer',
    icon: 'MessageCircleCode',
    features: ['Masterclasses & Workshops', 'Co-authorship opportunities', 'Technical sound guidance', 'Integration into UPNAAD ecosystem']
  },
  {
    _id: '7',
    title: 'Audio SEO & Web Presence',
    description: 'Bespoke, lightweight looping ambient tracks composed to subtly enhance physiological responses and increase dwell time on enterprise and luxury wellness websites.',
    priceRange: '$800 - $3,000',
    icon: 'AudioLines',
    features: ['Optimized for hyper-fast loading', 'Platform integration', 'Subtle frequency targeting', 'User retention focus']
  },
  {
    _id: '8',
    title: 'Corporate Wellness Subscriptions',
    description: 'Provide your startup or enterprise team with a monthly catalog of customized focus and flow-state soundscapes designed to optimize deep work.',
    priceRange: '$199 - $999 / Month',
    icon: 'Brain',
    features: ['Monthly updated soundscapes', 'HR Integration', 'Company-wide licensing', 'Flow-state maximization']
  }
];

export default async function ServicesPage() {
  let services = await client.fetch(allServicesQuery);
  if (!services || services.length === 0) {
    services = fallbackServices;
  }

  return (
    <div className="space-y-24 bg-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        title="Work with UPNAAD"
        description="Leverage sound, consciousness, and technology for your brand, project, or personal growth."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {services.map((service: any) => {
          let IconComponent = AudioLines;
          if (service.icon === 'Sparkles') IconComponent = Sparkles;
          if (service.icon === 'Brain') IconComponent = Brain;
          if (service.icon === 'MessageCircleCode') IconComponent = MessageCircleCode;

          return (
            <div key={service._id} className="group relative flex flex-col p-8 md:p-12 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden hover:border-accent hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent/10 transition-colors duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-8">
                  <IconComponent size={24} />
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">{service.title}</h2>
                <p className="text-lg text-text-secondary font-light leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                {service.features && service.features.length > 0 && (
                  <ul className="mb-8 space-y-3">
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="mt-auto pt-8 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Investment</p>
                    <p className="text-xl font-bold">{service.priceRange}</p>
                  </div>
                  <Link 
                    href="/services/inquire" 
                    className="inline-flex items-center justify-center gap-2 bg-text-light dark:bg-text-dark text-white dark:text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Inquire <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center border border-border-light dark:border-border-dark mt-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Unsure where to start?</h2>
        <p className="text-xl text-text-secondary font-light mb-10 max-w-2xl mx-auto">
          Schedule a brief consultation call to discuss your creative constraints and discover how UPNAAD can map sound to your vision.
        </p>
        <Link 
          href="/services/inquire" 
          className="inline-block bg-accent text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
        >
          Book Consultation
        </Link>
      </section>
    </div>
  );
}
