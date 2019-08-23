import React, { useState } from "react";
import ResultsLabels from "./results-labels";
import Moment from "react-moment";
import ModalWrapper from "../modals/modal-wrapper";
import ResultsDetail from "./results-detail";

const ResultsList = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailedContent, setDetailedContent] = useState({});
  return (
    <>
      <div className="">
        {props.data &&
          props.data.hits &&
          props.data.hits.length > 0 &&
          props.data.hits.map((elt, index) => {
            return (
              <div
                key={index}
                className="row mb-3 media text-muted pt-3 border-bottom border-primary"
                onClick={() => {
                  setDetailedContent(elt);
                  setIsModalOpen(true);
                }}
              >
                <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
                  <strong className="d-block text-gray-dark">{elt.name}</strong>
                </div>
                <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125">
                  <Moment format="YYYY/MM/DD">{elt.decision_date}</Moment>
                </div>
                <div className="col-md-4 themed-grid-col">
                  <svg
                    className="bd-placeholder-img mr-2 rounded"
                    width={elt.monetary_sanction > 900000 ? "100" : "70"}
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
                      {elt.monetary_sanction} €
                    </text>
                  </svg>
                  <ResultsLabels value={elt} />
                </div>
              </div>
            );
          })}
      </div>
      <ModalWrapper
        isModalOpen={isModalOpen}
        title={detailedContent.name}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ResultsDetail content={detailedContent}/>
      </ModalWrapper>
    </>
  );
};

export default ResultsList;
