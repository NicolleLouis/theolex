import React, { useState } from "react";
import ResultsLabels from "./results-labels";
import ModalWrapper from "../molecules/modal-wrapper";
import ResultsDetail from "./results-detail";
import TagAmount from "../atoms/tag-amount";
import Date from "../atoms/date";

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
                  <Date value={elt.decision_date}/>
                </div>
                <div className="col-md-4 themed-grid-col">
                  <TagAmount value={elt.monetary_sanction} unit="€" />
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
        <ResultsDetail content={detailedContent} />
      </ModalWrapper>
    </>
  );
};

export default ResultsList;
