import { Route as rootRoute } from './routes/__root';
import { Route as RoleSelectRoute } from './routes/role-select';
import { Route as IndexRoute } from './routes/index';
import { Route as LandlordAnalyticsRoute } from './routes/landlord/analytics';
import { Route as LandlordLeasesRoute } from './routes/landlord/leases';
import { Route as LandlordUtilitiesRoute } from './routes/landlord/utilities';
import { Route as LandlordPaymentsRoute } from './routes/landlord/payments';
import { Route as LandlordTenantsRoute } from './routes/landlord/tenants';
import { Route as LandlordPropertiesRoute } from './routes/landlord/properties';
import { Route as LandlordDashboardRoute } from './routes/landlord/dashboard';
import { Route as LandlordSignupRoute } from './routes/landlord/signup';
import { Route as LandlordLoginRoute } from './routes/landlord/login';

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexRoute;
      parentRoute: typeof rootRoute;
    };
    '/role-select': {
      preLoaderRoute: typeof RoleSelectRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/login': {
      preLoaderRoute: typeof LandlordLoginRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/signup': {
      preLoaderRoute: typeof LandlordSignupRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/dashboard': {
      preLoaderRoute: typeof LandlordDashboardRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/properties': {
      preLoaderRoute: typeof LandlordPropertiesRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/tenants': {
      preLoaderRoute: typeof LandlordTenantsRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/payments': {
      preLoaderRoute: typeof LandlordPaymentsRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/utilities': {
      preLoaderRoute: typeof LandlordUtilitiesRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/leases': {
      preLoaderRoute: typeof LandlordLeasesRoute;
      parentRoute: typeof rootRoute;
    };
    '/landlord/analytics': {
      preLoaderRoute: typeof LandlordAnalyticsRoute;
      parentRoute: typeof rootRoute;
    };
  }
}

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  RoleSelectRoute,
  LandlordLoginRoute,
  LandlordSignupRoute,
  LandlordDashboardRoute,
  LandlordPropertiesRoute,
  LandlordTenantsRoute,
  LandlordPaymentsRoute,
  LandlordUtilitiesRoute,
  LandlordLeasesRoute,
  LandlordAnalyticsRoute,
]);
