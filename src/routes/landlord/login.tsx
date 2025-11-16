import { createFileRoute } from '@tanstack/react-router';
import LandlordLogin from '@/pages/landlord/Login';

export const Route = createFileRoute('/landlord/login')({
  component: LandlordLogin,
});
