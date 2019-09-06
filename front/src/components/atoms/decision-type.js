import React from "react";
import ReactTooltip from "react-tooltip";

const DecisionType = ({ type }) => {
  return (
    <div className="col-md-4 media-body pb-3 mb-0 lh-125 ">
      <strong className="d-block text-gray-dark" data-tip data-for="type">
        {type}
      </strong>
      <ReactTooltip id="type" type="info">
        <span>Decision type</span>
      </ReactTooltip>
    </div>
  );
};

export default DecisionType;
