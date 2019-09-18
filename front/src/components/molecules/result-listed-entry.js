import React from "react";
import ModalContext from "../../config/modal-context";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";
import DecisionDate from "../atoms/decision-date";
import DecisionType from "../atoms/decision-type";
import AuthoritiesWrapper from "./authorities-wrapper";

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
          <AuthoritiesWrapper authorities={content.authorities} />
          <DecisionType type={content.type} />
          {content.decision_date && (
            <DecisionDate date={content.decision_date} />
          )}
          <TagWrapper tags={content.tags} />
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default ResultListedEntry;
