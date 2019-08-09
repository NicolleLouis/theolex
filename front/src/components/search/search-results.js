import React, { useState } from "react";
import ResultsList from "../results/results-list";

const SearchResults = props => {
  return (
    <div className="ml-4">
      {props.isError && <div>Something went wrong ...</div>}
      {props.isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
        <div>{props.data.hits.length} résultats</div>
        <br/>
        <ResultsList data={props.data} />
        </>
      )}

    </div>
  );
};

export default SearchResults;
