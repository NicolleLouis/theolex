import React from "react";
import PropTypes from "prop-types";

const Tag = ({ value }) => {
  const adaptedW = Math.log(value.length) * 50;
  return (
    <svg
      className="bd-placeholder-img mr-2 rounded"
      width={adaptedW}
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="monetary_sanction"
    >
      <rect width="100%" height="100%" fill="#ed1250" />
      <text
        x="15%"
        y="70%"
        fontFamily="sans-serif"
        fontSize="14px"
        fill="white"
      >
        {value}
      </text>
    </svg>
  );
};

Tag.propTypes = {
  value: PropTypes.string
};
export default Tag;
