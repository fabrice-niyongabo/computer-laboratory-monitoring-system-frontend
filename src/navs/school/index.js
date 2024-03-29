import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cibCodesandbox,
  cilApplicationsSettings,
  cilAvTimer,
  cilBell,
  cilBolt,
  cilIndustrySlash,
  cilLibrary,
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
    component: CNavGroup,
    name: "Damaged PCs",
    to: "/damagedpcs",
    icon: <CIcon icon={cilApplicationsSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "PC List",
        to: "/damagedpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Repaired PCs",
    to: "/repairedpcs",
    icon: <CIcon icon={cilBolt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Pc List",
        to: "/repairedpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Stolen PCs",
    to: "/stolenpcs",
    icon: <CIcon icon={cilIndustrySlash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Pc List",
        to: "/stolenpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Archived PCs",
    to: "/archivedpcs",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Pc List",
        to: "/archivedpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Working PCs",
    to: "/workingpcs",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Pc List",
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
