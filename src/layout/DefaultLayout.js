import React from "react";
import { useSelector } from "react-redux";
import FullPageLoader from "src/components/full-page-loader";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";

const DefaultLayout = () => {
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
      <FullPageLoader isLoading={isLoading} />
    </div>
  );
};

export default DefaultLayout;
