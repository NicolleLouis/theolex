import React from "react";
import Search from "./search/search";

const Main = props => {
  return (
    <div className="main-content" id="panel">
      <Search isSidenavOpen={props.isSidenavOpen} />
    </div>
  );
};

export default Main;
