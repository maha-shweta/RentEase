import { createFileRoute } from '@tanstack/react-router';
import LandlordDashboard from '@/pages/landlord/Dashboard';

export const Route = createFileRoute('/landlord/dashboard')({
  component: LandlordDashboard,
});
