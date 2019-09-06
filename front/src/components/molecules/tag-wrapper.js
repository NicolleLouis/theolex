import React from "react";
import Tag from "../atoms/tag";

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
    </>
  );
};

export default TagWrapper;
