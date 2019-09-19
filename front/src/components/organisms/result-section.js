import React, { useContext } from "react";
import ResultList from "../molecules/result-list";
import ApplicationContext from "../../config/application-context";

const ResultSection = ({ isError, isSearching, result }) => {
  const { modalCxt, basketCxt } = useContext(ApplicationContext);

  const handleClick = () => {
    modalCxt.setModalType("benchmark");
    modalCxt.setIsModalOpen(true);
  };
  return (
    <div className="ml-4">
      {isError ? (
        <div>Something went wrong ...</div>
      ) : isSearching ? (
        <div>Searching ...</div>
      ) : (
        modalCxt &&
        result &&
        result.hits &&
        result.hits.length > 0 && (
          <>
            <div className="align-items-center py-4 row">
              <div className="col-7 col-lg-4">
                <div>{result.hits.length} result(s)</div>
              </div>
              {basketCxt && basketCxt.basket.decisions.length > 2 && (
                <>
                  <div className="text-md-right col-4 col-lg-4 pr-4">
                    <button
                      className="btn-neutral btn btn-default btn-sm"
                      onClick={handleClick}
                    >
                      Benchmark
                    </button>
                  </div>
                </>
              )}
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
