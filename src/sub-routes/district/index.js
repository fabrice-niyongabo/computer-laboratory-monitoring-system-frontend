import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Stock = lazy(() => import("../../views/district/stock"));
const PendingPcs = lazy(() => import("../../views/district/pending-pcs"));
const DamagedPcs = lazy(() =>
  import("../../views/district/reports/damaged-pcs")
);
const RepairedPcs = lazy(() =>
  import("../../views/district/reports/repaired-pcs")
);
const StolenPcs = lazy(() => import("../../views/district/reports/stolen-pcs"));
const ArchivedPcs = lazy(() =>
  import("../../views/district/reports/archived-pcs")
);
const WorkingPcs = lazy(() =>
  import("../../views/district/reports/working-pcs")
);
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/stock", name: "Stock", element: Stock },
  { path: "/pendingpcs", name: "PendingPcs", element: PendingPcs },
  { path: "/damagedpcs", name: "DamagedPcs", element: DamagedPcs },
  { path: "/repairedpcs", name: "DamagedPcs", element: RepairedPcs },
  { path: "/stolenpcs", name: "StolenPcs", element: StolenPcs },
  { path: "/archivedpcs", name: "ArchivedPcs", element: ArchivedPcs },
  { path: "/workingpcs", name: "ArchivedPcs", element: WorkingPcs },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
