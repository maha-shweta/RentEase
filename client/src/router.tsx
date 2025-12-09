import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Landing from './pages/Landing';
import RoleSelect from './pages/RoleSelect';
import LandlordLogin from './pages/landlord/Login';
import LandlordSignup from './pages/landlord/Signup';
import LandlordDashboard from './pages/landlord/Dashboard';
import LandlordProperties from './pages/landlord/Properties';
import LandlordTenants from './pages/landlord/Tenants';
import LandlordPayments from './pages/landlord/Payments';
import LandlordUtilities from './pages/landlord/Utilities';
import LandlordLeases from './pages/landlord/Leases';
import LandlordAnnouncements from './pages/landlord/Announcements';
import LandlordAnalytics from './pages/landlord/Analytics';
import NotFound from './pages/NotFound';

// Create a root route
const rootRoute = createRootRoute({
    component: () => <Outlet />,
    notFoundComponent: NotFound,
});

// Define routes
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Landing,
});

const roleSelectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/role-select',
    component: RoleSelect,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/login',
    component: LandlordLogin,
});

const signupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/signup',
    component: LandlordSignup,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/dashboard',
    component: LandlordDashboard,
});

const propertiesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/properties',
    component: LandlordProperties,
});

const tenantsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/tenants',
    component: LandlordTenants,
});

const paymentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/payments',
    component: LandlordPayments,
});

const utilitiesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/utilities',
    component: LandlordUtilities,
});

const leasesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/leases',
    component: LandlordLeases,
});

const announcementsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/announcements',
    component: LandlordAnnouncements,
});

const analyticsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/landlord/analytics',
    component: LandlordAnalytics,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
    indexRoute,
    roleSelectRoute,
    loginRoute,
    signupRoute,
    dashboardRoute,
    propertiesRoute,
    tenantsRoute,
    paymentsRoute,
    utilitiesRoute,
    leasesRoute,
    announcementsRoute,
    analyticsRoute,
]);

// Create the router instance
export const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
