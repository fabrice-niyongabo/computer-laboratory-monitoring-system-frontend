import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Stock = lazy(() => import("../../views/reb_rtb/stock"));
const Users = lazy(() => import("../../views/reb_rtb/users"));
const AddPc = lazy(() => import("../../views/reb_rtb/addpc"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/stock", name: "Stock", element: Stock },
  { path: "/users", name: "Users", element: Users },
  { path: "/addpc", name: "Stock", element: AddPc },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
