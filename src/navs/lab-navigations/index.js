import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibCodesandbox,
  cilBell,
  cilGraph,
  cilPencil,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "System users",
    to: "/users",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Stock",
    to: "/stock",
    icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Stock Details",
        to: "/stock",
      },
      {
        component: CNavItem,
        name: "Add PC",
        to: "/addpc",
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: "Notifications",
  //   to: "/notifications",
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  // },
  {
    component: CNavGroup,
    name: "Reports",
    to: "/reports",
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "RTB Report",
        to: "/bbbb",
      },
    ],
  },
];

export default _nav;
