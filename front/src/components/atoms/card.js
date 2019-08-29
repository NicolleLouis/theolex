import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Card = ({ children, className }) => (
  <div className={classnames("card", className)}>
    <div className="card-body">{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Card.defaultProps = {
  className: "",
  children: ""
};

export default Card;
