import { createFileRoute } from '@tanstack/react-router';
import LandlordLeases from '@/pages/landlord/Leases';

export const Route = createFileRoute('/landlord/leases')({
  component: LandlordLeases,
});
