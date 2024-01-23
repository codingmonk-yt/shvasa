/* eslint-disable react/display-name */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// components
import LoadingScreen from "../components/LoadingScreen";
import DashboardLayout from "../layouts/dashboard";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <DashboardLayout />
      ),
      children: [
        { element: <AgentPage />, path: 'agent', index: true },
        { element: <TicketPage />, path: 'ticket' }
      ],
    },
    { path: "*", element: <Navigate to="/dashboard/agent" replace /> },
  ]);
}

// IMPORT COMPONENTS

const AgentPage = Loadable(lazy(() => import("../pages/Agent")));
const TicketPage = Loadable(lazy(() => import("../pages/Ticket")));