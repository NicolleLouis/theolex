import React from "react";
import ReactTooltip from "react-tooltip";

const DecisionType = ({ type }) => {
  return (
    <>
      <strong className="d-block text-gray-dark" data-tip data-for="type">
        {type}
      </strong>
      <ReactTooltip id="type" type="info">
        <span>Decision type</span>
      </ReactTooltip>
    </>
  );
};

export default DecisionType;
