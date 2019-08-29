import React, { useState } from "react";
import ModalWrapper from "../molecules/modal-wrapper";
import ResultsDetail from "./results-detail";
import TagAmount from "../atoms/tag-amount";
import Date from "../atoms/date";
import Tag from "../atoms/tag";

const ResultsList = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailedContent, setDetailedContent] = useState({});
  return (
    <>
      <div className="">
        {props.data &&
          props.data.hits &&
          props.data.hits.length > 0 &&
          props.data.hits.map((content, index) => {
            return (
              <div
                key={index}
                className="row mb-3 media text-muted pt-3 border-bottom border-primary"
                onClick={() => {
                  setDetailedContent(content);
                  setIsModalOpen(true);
                }}
              >
                <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
                  <strong className="d-block text-gray-dark">
                    {content.name}
                  </strong>
                </div>
                <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125">
                  <Date value={content.decision_date} />
                </div>
                <div className="col-md-4 themed-grid-col">
                  <TagAmount value={content.monetary_sanction} unit="€" />
                  <Tag value={content.type} />
                  <Tag value={content.authority_name} />
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
