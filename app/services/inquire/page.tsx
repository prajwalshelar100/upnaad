import ServiceInquiryClient from '@/src/components/ServiceInquiryClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ServiceInquiryPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-0 pt-0 md:pt-4">
      <Link 
        href="/services" 
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Services
      </Link>
      <ServiceInquiryClient />
    </div>
  );
}

