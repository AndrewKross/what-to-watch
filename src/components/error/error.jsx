import React from 'react';
import PropTypes from "prop-types";

const Error = ({ requestStatus }) => (
  <h1>Error: {requestStatus}</h1>
);

Error.propTypes = {
  requestStatus: PropTypes.number.isRequired,
};

export default Error;
