import { CCardText, CPlaceholder } from "@coreui/react";
import React from "react";

function PlaceHolder() {
  return (
    <>
      <CPlaceholder component={CCardText} animation="glow">
        <CPlaceholder xs={7} />
        <CPlaceholder xs={4} />
        <CPlaceholder xs={4} />
        <CPlaceholder xs={6} />
        <CPlaceholder xs={8} />
        <CPlaceholder xs={6} />
      </CPlaceholder>
    </>
  );
}

export default PlaceHolder;
