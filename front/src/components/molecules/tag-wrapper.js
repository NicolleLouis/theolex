import React from "react";
import Tag from "../atoms/tag";
import ReactTooltip from "react-tooltip";

const TagWrapper = ({ tags }) => {
  const padding = {
    padding: 1,
  };

  return (
    <div className="col-md-4 themed-grid-col">
      {tags &&
        tags.length > 0 &&
        tags.map((tag, index) => <Tag key={index} tag={tag} style={padding}/>)}
      <ReactTooltip id="red" type="info">
        <span>Monetary amount</span>
      </ReactTooltip>
      <ReactTooltip id="blue" type="info">
        <span>Violation</span>
      </ReactTooltip>
    </div>
  );
};

export default TagWrapper;
