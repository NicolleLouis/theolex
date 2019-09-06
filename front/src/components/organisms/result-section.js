import React from "react";
import ResultList from "../molecules/result-list";

const ResultSection = ({ isError, isSearching, result }) => {
  return (
    <div className="ml-4">
      {isError && <div>Something went wrong ...</div>}
      {isSearching && <div>Searching ...</div>}
      {result && result.hits && result.hits.length > 0 && (
        <>
          <div>{result.hits.length} result(s)</div>
          <br />
          <ResultList result={result} />
        </>
      )}
    </div>
  );
};

export default ResultSection;