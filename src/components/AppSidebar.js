import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "src/assets/brand/logo-negative";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import labNav from "../navs/lab-navigations/";
import { setShowSideBar, setUnfoldableSideBar } from "src/actions/app";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow, unfoldable } = useSelector((state) => state.app);
  const { role } = useSelector((state) => state.user);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setShowSideBar(visible));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={require("../assets/logo.png")} style={{ width: 70 }} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {role === "admin" && <AppSidebarNav items={labNav} />}
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setUnfoldableSideBar(!unfoldable))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
