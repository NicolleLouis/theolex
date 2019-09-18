import React, { useState } from "react";
import ModalContext from "../../config/modal-context";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";
import DecisionDate from "../atoms/decision-date";
import DecisionType from "../atoms/decision-type";
import AuthoritiesWrapper from "./authorities-wrapper";

const ResultListedEntry = ({ content }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = props => {
    console.log("handleClick");
    props.setDetailedContent(content);
    props.setIsModalOpen(true);
  };
  const handleOnChange = event => {
    console.log("handleOnChange");
    console.log(event.target);
    setIsChecked(!isChecked);
  };
  return (
    <ModalContext.Consumer>
      {props => (
        <div className="row mb-3 media text-muted pt-3 border-bottom border-primary">
          <div className="custom-control custom-checkbox mb-3 col-md-4 themed-grid-col pb-3">
            <input
              className="custom-control-input"
              id={`decision-${content.id}`}
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChange}
            />
            <label
              className="custom-control-label small lh-125"
              htmlFor={`decision-${content.id}`}
            >
              <strong
                className="d-block text-gray-dark"
                data-tip
                data-for="name"
              >
                {content.name}
              </strong>
              <ReactTooltip id="name" type="info">
                <span>Name</span>
              </ReactTooltip>
            </label>
          </div>

          <div
            className="col-md-4 themed-grid-col media-body pb-3 mb-0 lh-125"
            data-tip
            data-for="authorities"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(props)}
          >
            <AuthoritiesWrapper authorities={content.authorities} />
          </div>
          <div
            className="col-md-4 media-body pb-3 mb-0 lh-125 "
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(props)}
          >
            <DecisionType type={content.type} />
          </div>
          {content.decision_date && (
            <div
              className="col-md-4 font-weight-bold media-body pb-3 mb-0 lh-125"
              data-tip
              data-for="decisionDate"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(props)}
            >
              <DecisionDate date={content.decision_date} />
            </div>
          )}
          <TagWrapper tags={content.tags} />
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default ResultListedEntry;
