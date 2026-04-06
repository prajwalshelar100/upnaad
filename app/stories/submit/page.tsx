import SubmitStoryClient from '@/src/components/SubmitStoryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Your Story | UPNAAD',
  description: 'Share your personal narratives, insights, and philosophical journeys with the UPNAAD community.',
};

export default function SubmitStoryPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <SubmitStoryClient />
    </div>
  );
}
