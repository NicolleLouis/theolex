import React from "react";
import Tag from "../atoms/tag";
import ReactTooltip from "react-tooltip";

const TagWrapper = ({ value }) => {
  return (
    <>
      {typeof value.label === "string" && <Tag value={value} />}
      {typeof value.label === "object" &&
        Array.isArray(value.label) &&
        value.label.map((label, index) => {
          let formattedValue = {
            label,
            color: value.color
          };
          return <Tag key={index} value={formattedValue} />;
        })}
      <ReactTooltip id="red" type="info">
        <span>Monetary amount</span>
      </ReactTooltip>
      <ReactTooltip id="blue" type="info">
        <span>Violation</span>
      </ReactTooltip>
    </>
  );
};

export default TagWrapper;
