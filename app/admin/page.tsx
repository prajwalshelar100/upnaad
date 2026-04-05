import AdminDashboard from '@/src/components/AdminDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | UPNAAD',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
