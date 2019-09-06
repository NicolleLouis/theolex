import React from "react";
import Tag from "../atoms/tag";
import ReactTooltip from "react-tooltip";

const TagWrapper = ({ tags }) => {
  return (
    <div className="col-md-4 themed-grid-col">
      {tags &&
        tags.length > 0 &&
        tags.map((tag, index) => {
          if (tag.label && typeof tag.label === "string") {
            return <Tag key={index} tag={tag} />;
          }
        })}
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => {
          if (tag.label && typeof tag.label === "object") {
            return tag.label.map((label, index) => {
              let formattedTag = {
                label,
                color: tag.color
              };
              return <Tag key={index} tag={formattedTag} />;
            });
          }
        })}

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

/* if (tag.label) {
            switch (typeof tag.label) {
              case "string":
                return <Tag key={index} tag={tag} />;
              case "object":
                if (Array.isArray(tag.label) && tag.label.length > 0) {
                  tag.label.map((label, index) => {
                    let formattedTag = {
                      label,
                      color: tag.color
                    };
                    console.log("HHEE", typeof tag.label, formattedTag)
                    return <Tag key={index} tag={formattedTag} />;
                  });
                }
            }
          } */
