import React from "react";
import PropTypes from "prop-types";

const TagAmount = ({ value, unit }) => {
  const adaptedWidth = value ? value.toString().length * 12.5 : 0;
  return (
    <svg
      className="bd-placeholder-img mr-2 rounded"
      width={adaptedWidth}
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="monetary_sanction"
    >
      <rect width="100%" height="100%" fill="#ed1250" />
      <text
        x="10%"
        y="70%"
        fontFamily="sans-serif"
        fontSize="14px"
        fill="white"
      >
        {value && value.toString().concat(unit)}
      </text>
    </svg>
  );
};

TagAmount.propTypes = {
  value: PropTypes.number,
  unit: PropTypes.string
};
export default TagAmount;
