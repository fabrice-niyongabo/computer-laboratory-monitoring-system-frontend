import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Stock = lazy(() => import("../../views/school/stock"));
const PendingPcs = lazy(() => import("../../views/school/pending-pcs"));
const DamagedPcs = lazy(() => import("../../views/school/damaged-pcs"));
const RepairedPcs = lazy(() => import("../../views/school/repaired-pcs"));
const StolenPcs = lazy(() => import("../../views/school/stolen-pcs"));
const ArchivedPcs = lazy(() => import("../../views/school/archived-pcs"));
const WorkingPcs = lazy(() => import("../../views/school/working-pcs"));

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
];

export default routes;
