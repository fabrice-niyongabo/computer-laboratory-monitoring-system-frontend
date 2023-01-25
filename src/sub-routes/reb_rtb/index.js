import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Stock = lazy(() => import("../../views/reb_rtb/stock"));
const Users = lazy(() => import("../../views/reb_rtb/users"));
const AddPc = lazy(() => import("../../views/reb_rtb/addpc"));
const DamagedPcs = lazy(() =>
  import("../../views/reb_rtb/reports/damaged-pcs")
);
const RepairedPcs = lazy(() =>
  import("../../views/reb_rtb/reports/repaired-pcs")
);
const StolenPcs = lazy(() => import("../../views/reb_rtb/reports/stolen-pcs"));
const ArchivedPcs = lazy(() =>
  import("../../views/reb_rtb/reports/archived-pcs")
);
const WorkingPcs = lazy(() =>
  import("../../views/reb_rtb/reports/working-pcs")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/stock", name: "Stock", element: Stock },
  { path: "/users", name: "Users", element: Users },
  { path: "/addpc", name: "Stock", element: AddPc },
  { path: "/damagedpcs", name: "DamagedPcs", element: DamagedPcs },
  { path: "/repairedpcs", name: "RepairedPcs", element: RepairedPcs },
  { path: "/stolenpcs", name: "StolenPcs", element: StolenPcs },
  { path: "/archivedpcs", name: "ArchivedPcs", element: ArchivedPcs },
  { path: "/workingpcs", name: "WorkingPcs", element: WorkingPcs },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
