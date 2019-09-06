import React from "react";
import ResultDetailedEntry from "./result-detailed-entry";

const ResultList = ({ result }) => {
  return (
    <>
      {result.hits.length > 0 &&
        result.hits.map((entry, index) => (
          <ResultDetailedEntry key={index} content={entry} />
        ))}
    </>
  );
};

export default ResultList;
