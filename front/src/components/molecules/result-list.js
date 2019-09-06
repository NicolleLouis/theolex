import React from "react";
import ResultListedEntry from "./result-listed-entry";

const ResultList = ({ result }) => {
  return (
    <>
      {result.hits.length > 0 &&
        result.hits.map((entry, index) => (
          <ResultListedEntry key={index} content={entry} />
        ))}
    </>
  );
};

export default ResultList;
