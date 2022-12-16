import React from "react";
import Loader from "react-fullpage-custom-loader";
import PropTypes from "prop-types";
function FullPageLoader({ isLoading }) {
  return <>{isLoading && <Loader sentences={[]} />}</>;
}

FullPageLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default FullPageLoader;
