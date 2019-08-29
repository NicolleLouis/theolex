import React from "react";
import Moment from "react-moment";

const ResultsDetail = ({ content, ...props }) => {
  return (
    <>
      <div className="col-12 col-md-12">
        <div className="card card-stats">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <span className="h4 font-weight-bold mb-0">
                  <Moment format="YYYY/MM/DD">{content.decision_date}</Moment>
                </span>
              </div>
              <div className="col">
                <span className="h4 font-weight-bold mb-0">
                  {content.authority_name}
                </span>
              </div>
              <div className="col">
                <span className="h8 font-weight-bold mb-0">{content.type}</span>
              </div>
              <div className="col-auto">
                <svg
                  className="bd-placeholder-img mr-2 rounded"
                  width={content.monetary_sanction > 900000 ? "100" : "70"}
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
          </div>
        </div>
        <div className="card card-stats">
          <div className="card-body">
            <div className="row">
              <span className="h4 font-weight-bold mb-0">{content.text}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsDetail;
