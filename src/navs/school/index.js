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
    name: "Stock",
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
    name: "Pending Devices",
    to: "/pendingpcs",
    icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Waiting List",
        to: "/pendingpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Damaged Devices",
    to: "/damagedpcs",
    icon: <CIcon icon={cilApplicationsSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Device List",
        to: "/damagedpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Repaired Devices",
    to: "/repairedpcs",
    icon: <CIcon icon={cilBolt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Device List",
        to: "/repairedpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Stolen Devices",
    to: "/stolenpcs",
    icon: <CIcon icon={cilIndustrySlash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Device List",
        to: "/stolenpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Archived Devices",
    to: "/archivedpcs",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Device List",
        to: "/archivedpcs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Working Devices",
    to: "/workingpcs",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Device List",
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
