import React from "react";
import ReactTooltip from "react-tooltip";
import Date from "./date";

const DecisionDate = ({ date }) => {
  return (
    <>
      <Date value={date} />
      <ReactTooltip id="decisionDate" type="info">
        <span>Decision date</span>
      </ReactTooltip>
    </>
  );
};

export default DecisionDate;
