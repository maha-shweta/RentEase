import { createFileRoute } from '@tanstack/react-router';
import LandlordUtilities from '@/pages/landlord/Utilities';

export const Route = createFileRoute('/landlord/utilities')({
  component: LandlordUtilities,
});
