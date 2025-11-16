import { createFileRoute } from '@tanstack/react-router';
import LandlordTenants from '@/pages/landlord/Tenants';

export const Route = createFileRoute('/landlord/tenants')({
  component: LandlordTenants,
});
