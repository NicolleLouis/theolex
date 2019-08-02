import React from "react";

const ResultsLabels = props => {
  return (
    <>
      {props.value.labels.length > 0 &&
        props.value.labels.map((elt, index) => {

          return (
            <span key={index}>
              {elt === "Endettement Excessif" && (
                <svg
                  className="bd-placeholder-img mr-2 rounded"
                  width="150"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  role="img"
                  aria-label="endettement-excessif"

                >
                  <rect width="100%" height="100%" fill="#ed1250" />
                  <text
                    x="5%"
                    y="70%"
                    fontFamily="sans-serif"
                    fontSize="14px"
                    fill="white"
                  >
                    {elt}
                  </text>
                </svg>
              )}
              {elt === "D\u00e9faut de conseil" && (
                <svg
                  className="bd-placeholder-img mr-2 rounded"
                  width="120"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  role="img"
                  aria-label="defaut-conseil"
                >
                  <rect width="100%" height="100%" fill="#ed1250" />
                  <text
                    x="5%"
                    y="70%"
                    fontFamily="sans-serif"
                    fontSize="14px"
                    fill="white"
                  >
                    {elt}
                  </text>
                </svg>
              )}
            </span>
          );
        })}
    </>
  );
};

export default ResultsLabels;
