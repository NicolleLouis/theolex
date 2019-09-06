import React from "react";
import Date from "../atoms/date";
import Tag from "../atoms/tag";
import ModalContext from "../../config/modal-context";
import TagWrapper from "./tag-wrapper";

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
          style={{ cursor: "pointer" }}
        >
          <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
            <strong className="d-block text-gray-dark">{content.name}</strong>
          </div>
          <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
            <strong className="d-block text-gray-dark">{content.type}</strong>
          </div>
          <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125">
            <Date value={content.decision_date} />
          </div>
          <div className="col-md-4 themed-grid-col">
            {content.tags &&
              content.tags.length > 0 &&
              content.tags.map((value, index) => (
                <TagWrapper key={index} value={value} />
              ))}
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default ResultListedEntry;
