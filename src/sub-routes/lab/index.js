import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Users = lazy(() => import("../../views/lab/users"));
const Stock = lazy(() => import("../../views/lab/stock"));
const AddPc = lazy(() => import("../../views/lab/addpc"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/users", name: "Users", element: Users },
  { path: "/stock", name: "Stock", element: Stock },
  { path: "/addpc", name: "Stock", element: AddPc },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
