import React, { useState } from "react";
import styles from "styled-components";
import ResultsList from "../results/results-list";

const ResultsCounter = styles.div`
  margin-left: 40px;
`;

const SearchResults = props => {
  return (
    <>
      {props.isError && <div>Something went wrong ...</div>}
      {props.isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>{props.data.length} résultats</div>
      )}
      <br/>
      <ResultsList data={props.data} />
    </>
  );
};

export default SearchResults;
