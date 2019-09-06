import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Authority from "../atoms/authority";

const AuthoritiesWrapper = ({ authorities }) => {
  return (
    <>
      <div
        className="col-md-4 themed-grid-col media-body pb-3 mb-0 lh-125"
        data-tip
        data-for="authorities"
      >
        {typeof authorities === "string" && (
          <Authority authority={authorities} />
        )}
        {typeof authorities === "object" &&
          Array.isArray(authorities) &&
          authorities.map((authority, index) => (
            <Authority key={index} authority={authority} />
          ))}
      </div>
      <ReactTooltip id="authorities" type="info">
        <span>Authorities</span>
      </ReactTooltip>
    </>
  );
};

export default AuthoritiesWrapper;
