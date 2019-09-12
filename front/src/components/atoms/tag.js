import React from "react";
import PropTypes from "prop-types";

const Tag = ({ tag }) => {
  let adaptedWidth;
  if (tag && tag.label) {
    let length = tag.label.length;
    adaptedWidth = length > 15 ? length * 8 : length * 10;
  }

  return (
    <>
      {tag && tag.label && (
        <div className="p-xl-1">
          <svg
            className="bd-placeholder-img mr-2 rounded"
            width={adaptedWidth}
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="monetary_sanction"
            data-tip
            data-for={tag.color}
          >
            <rect
              width="100%"
              height="100%"
              fill={tag.color ? tag.color : "blue"}
            />
            <text
              x="8%"
              y="70%"
              fontFamily="sans-serif"
              fontSize="14px"
              fill="white"
            >
              {tag.label ? tag.label : ""}
            </text>
          </svg>
        </div>
      )}
    </>
  );
};

Tag.propTypes = {
  value: PropTypes.object
};
export default Tag;
