import React from "react";
import PropTypes from "prop-types";

const Title = ({ children, className }) => (
  <h1 className={className}>{children}</h1>
);

Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Title.defaultProps = {
  className: "",
  children: ""
};

export default Title;
