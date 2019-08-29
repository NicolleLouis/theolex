import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Label = ({ children, className, htmlFor, ...props }) => (
  <label
    className={classnames("form-control-label", className)}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Label;
