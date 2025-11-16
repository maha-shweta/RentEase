import { createFileRoute } from '@tanstack/react-router';
import RoleSelect from '@/pages/RoleSelect';

export const Route = createFileRoute('/role-select')({
  component: RoleSelect,
});
