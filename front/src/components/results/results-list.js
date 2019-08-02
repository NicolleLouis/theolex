import React from "react";
import ResultsLabels from './results-labels';

const ResultsList = props => {
  return (
    <>
      <div className="">
        {props.data.hits.length > 0 &&
          props.data.hits.map((elt, index) => {
            return (
              <div
                key={index}
                className="row mb-3 media text-muted pt-3 border-bottom border-grey"
              >
                <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
                  <strong className="d-block text-gray-dark">
                    {elt.title}
                  </strong>
                  <p className="media-body pb-3 mb-0 small lh-125">
                    {elt.text}
                  </p>
                </div>
                <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125">
                  {elt.date}
                </div>

                <div className="col-md-4 themed-grid-col">
                  <svg
                    className="bd-placeholder-img mr-2 rounded"
                    width="70"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                    aria-label="amount"
                  >
                    <rect width="100%" height="100%" fill="#007bff" />
                    <text
                      x="20%"
                      y="70%"
                      fontFamily="sans-serif"
                      fontSize="14px"
                      fill="white"
                    >
                      {elt.amount}
                    </text>
                  </svg>
                  <ResultsLabels value={elt} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ResultsList;
