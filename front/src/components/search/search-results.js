import React, { useState } from "react";
import styles from "styled-components";
import ResultsList from "./results-list";

const ResultsCounter = styles.div`
  margin-left: 40px;
`;

const SearchResults = () => {
  const [countResults, setCounResults] = useState(1);

  return (
    <>
      <ResultsCounter>{countResults} résultats</ResultsCounter>
      {countResults !== 0 && <ResultsList />}
    </>
  );
};

export default SearchResults;
