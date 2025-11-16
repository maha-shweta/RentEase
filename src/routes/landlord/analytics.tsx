import { createFileRoute } from '@tanstack/react-router';
import LandlordAnalytics from '@/pages/landlord/Analytics';

export const Route = createFileRoute('/landlord/analytics')({
  component: LandlordAnalytics,
});
