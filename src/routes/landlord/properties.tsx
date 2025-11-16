import { createFileRoute } from '@tanstack/react-router';
import LandlordProperties from '@/pages/landlord/Properties';

export const Route = createFileRoute('/landlord/properties')({
  component: LandlordProperties,
});
