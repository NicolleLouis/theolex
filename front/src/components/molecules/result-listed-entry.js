import React from "react";
import Date from "../atoms/date";
import ModalContext from "../../config/modal-context";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";

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
            <strong className="d-block text-gray-dark" data-tip data-for="name">
              {content.name}
            </strong>
            <ReactTooltip id="name" type="info">
              <span>Name</span>
            </ReactTooltip>
          </div>
          <div className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125 ">
            <strong className="d-block text-gray-dark" data-tip data-for="type">
              {content.type}
            </strong>
            <ReactTooltip id="type" type="info">
              <span>Type</span>
            </ReactTooltip>
          </div>
          <div
            className="col-md-4 themed-grid-col media-body pb-3 mb-0 small lh-125"
            data-tip
            data-for="decisionDate"
          >
            <Date value={content.decision_date} />
            <ReactTooltip id="decisionDate" type="info">
              <span>Decision date</span>
            </ReactTooltip>
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
