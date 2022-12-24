import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibCodesandbox,
  cilAvTimer,
  cilBell,
  cilGraph,
  cilSpeedometer,
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "PC Stock",
    to: "/stock",
    icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Stock Details",
        to: "/stock",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Pending PCs",
    to: "/pendingpcs",
    icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Awaiting List",
        to: "/pendingpcs",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Notifications",
    to: "/notifications",
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
];

export default _nav;
