import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const Date = ({ value, className }) => (
  <Moment className={className} format="YYYY/MM/DD">
    {value}
  </Moment>
);

Date.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string
};

export default Date;
