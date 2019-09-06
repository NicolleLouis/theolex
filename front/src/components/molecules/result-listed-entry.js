import React from "react";
import Date from "../atoms/date";
import TagAmount from "../atoms/tag-amount";
import Tag from "../atoms/tag";
import ModalContext from "../../config/modal-context";

const ResultListedEntry = ({ content }) => {
  return (
    <ModalContext.Consumer>
      {props => (
        <div
          className="row mb-3 media text-muted pt-3 border-bottom border-primary"
          onClick={() => {
            props.setDetailedContent(content);
            props.setIsModalOpen(true);
          }}
        >
          <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
            <strong className="d-block text-gray-dark">{content.name}</strong>
          </div>
          <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125">
            <Date value={content.decision_date} />
          </div>
          <div className="col-md-4 themed-grid-col">
            {content.monetary_sanction && (
              <TagAmount value={content.monetary_sanction} unit="€" />
            )}
            <Tag value={content.type} />
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default ResultListedEntry;
