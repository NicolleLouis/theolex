import React from "react";
import Moment from "react-moment";

const ResultsDetail = ({ content, ...props }) => {
  return (
    <>
      <div className="row mb-3 media text-muted pt-3 border-bottom border-grey">
        <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
          <strong className="d-block text-gray-dark">{content.name}</strong>
          <p className="media-body pb-3 mb-0 small lh-125">{content.text}</p>
        </div>
        <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125">
          <Moment format="YYYY/MM/DD">{content.decision_date}</Moment>
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
            aria-label="monetary_sanction"
          >
            <rect width="100%" height="100%" fill="#ed1250" />
            <text
              x="20%"
              y="70%"
              fontFamily="sans-serif"
              fontSize="14px"
              fill="white"
            >
              {content.monetary_sanction} €
            </text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ResultsDetail;
