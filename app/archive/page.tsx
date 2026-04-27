import { client } from '@/src/sanity/lib/client';
import { allReleasesQuery } from '@/src/sanity/lib/queries';
import ArchiveClient from '@/src/components/ArchiveClient';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse the full archive of UPNAAD sound research, compositions, and creative work.',
};

export default async function ArchivePage() {
  const allReleases = await client.fetch(allReleasesQuery);

  return (
    <PageShell breadcrumbs={[{ label: 'Learn', href: '/blog' }, { label: 'Archive' }]}>
      <PageHeader
        eyebrow="LEARN · ARCHIVE"
        title="Archive"
        description="The complete collection of UPNAAD research, compositions, and creative deep-dives — from the very first drop to today."
      />
      <ArchiveClient initialReleases={allReleases || []} />
    </PageShell>
  );
}
