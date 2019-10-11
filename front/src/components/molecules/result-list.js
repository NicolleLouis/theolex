import React, { useContext } from "react";
import ResultListedEntry from "./result-listed-entry";
import ApplicationContext from "../../config/application-context";

const ResultList = ({ result }) => {
  const { basketCxt } = useContext(ApplicationContext);
  const { basket } = basketCxt;

  return (
    <>
      {result.hits.length > 0 &&
        result.hits.map((entry, index) => {
          let isChecked = false;
          if (
            basket &&
            basket.decisions &&
            basket.decisions.length > 0 &&
            basket.decisions.find(decision => decision.id === entry.id)
          ) {
            isChecked = true;
          }

          return (
            <ResultListedEntry
              key={index}
              id={entry.id}
              content={entry}
              isChecked={isChecked}
            />
          );
        })}
    </>
  );
};

export default ResultList;
