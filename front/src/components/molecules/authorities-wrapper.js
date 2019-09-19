import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Authority from "../atoms/authority";

const AuthoritiesWrapper = ({ authorities }) => {
  return (
    <>
      {typeof authorities === "string" && <Authority authority={authorities} />}
      {typeof authorities === "object" &&
        Array.isArray(authorities) &&
        authorities.map((authority, index) => (
          <Authority key={index} authority={authority} />
        ))}

      <ReactTooltip id="authorities" type="info">
        <span>Authorities</span>
      </ReactTooltip>
    </>
  );
};

export default AuthoritiesWrapper;
