import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibCodesandbox,
  cilAvTimer,
  cilBell,
  cilFile,
  cilGraph,
  cilSpeedometer,
  cilUser,
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
        name: "Add Device",
        to: "/addpc",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Reports",
    to: "/ar",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Archived Devices",
        to: "/archivedpcs",
      },
      {
        component: CNavItem,
        name: "Damaged Devices",
        to: "/damagedpcs",
      },
      {
        component: CNavItem,
        name: "Repaired Devices",
        to: "/repairedpcs",
      },
      {
        component: CNavItem,
        name: "Stolen Devices",
        to: "/stolenpcs",
      },
      {
        component: CNavItem,
        name: "Working Devices",
        to: "/workingpcs",
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: "Notifications",
  //   to: "/notifications",
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  // },
];

export default _nav;
