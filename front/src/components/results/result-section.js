import React from "react";
import ResultsList from "./results-list";

const ResultSection = ({ isError, isSearching, result }) => {
  return (
    <div className="ml-4">
      {isError && <div>Something went wrong ...</div>}
      {isSearching && <div>Searching ...</div>}
      {result && result.hits && result.hits.length > 0 && (
        <>
          <div>{result.hits.length} result(s)</div>
          <br />
          <ResultsList data={result} />
        </>
      )}
    </div>
  );
};

export default ResultSection;
