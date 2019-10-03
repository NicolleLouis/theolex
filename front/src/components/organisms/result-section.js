import React from "react";
import ResultList from "../molecules/result-list";

const ResultSection = ({ isError, isSearching, result }) => {
  return (
    <div className="ml-4">
      {isError ? (
        <div>Something went wrong ...</div>
      ) : isSearching ? (
        <div>Searching ...</div>
      ) : (
        result &&
        result.hits &&
        result.hits.length > 0 && (
          <>
            <div className="align-items-center py-4 row">
              <div className="col-7 col-lg-4">
                <div>{result.number_of_hits} result(s)</div>
              </div>
            </div>
            <br />
            <ResultList result={result} />
          </>
        )
      )}
    </div>
  );
};

export default ResultSection;
