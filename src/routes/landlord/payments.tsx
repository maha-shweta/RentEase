import { createFileRoute } from '@tanstack/react-router';
import LandlordPayments from '@/pages/landlord/Payments';

export const Route = createFileRoute('/landlord/payments')({
  component: LandlordPayments,
});
