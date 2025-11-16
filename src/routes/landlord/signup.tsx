import { createFileRoute } from '@tanstack/react-router';
import LandlordSignup from '@/pages/landlord/Signup';

export const Route = createFileRoute('/landlord/signup')({
  component: LandlordSignup,
});
