import React from "react";
import Date from "./date";
import ReactTooltip from "react-tooltip";

const DecisionDate = ({date}) => {
  return (
    <div
      className="col-md-4 font-weight-bold media-body pb-3 mb-0 lh-125"
      data-tip
      data-for="decisionDate"
    >
      <Date value={date} />
      <ReactTooltip id="decisionDate" type="info">
        <span>Decision date</span>
      </ReactTooltip>
    </div>
  );
};

export default DecisionDate;
