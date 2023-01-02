import React, { useState, useEffect, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import labRoutes from "../sub-routes/lab";
import rebRtbRoutes from "../sub-routes/reb_rtb";
import districtRoutes from "../sub-routes/district";
import sectorRoutes from "../sub-routes/sector";
import schoolRoutes from "../sub-routes/school";
import { useSelector } from "react-redux";

const AppContent = () => {
  const { role } = useSelector((state) => state.user);
  const [routesToUse, setRoutesToUse] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      setRoutesToUse(labRoutes);
    }
    if (role === "reb" || role === "rtb") {
      setRoutesToUse(rebRtbRoutes);
    }
    if (role === "district") {
      setRoutesToUse(districtRoutes);
    }
    if (role === "sector") {
      setRoutesToUse(sectorRoutes);
    }
    if (role === "school") {
      setRoutesToUse(schoolRoutes);
    }
  }, [role]);
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routesToUse.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
