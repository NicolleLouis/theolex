import React, { useState, useEffect, useContext } from "react";
import ModalContext from "../../config/modal-context";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";
import DecisionDate from "../atoms/decision-date";
import DecisionType from "../atoms/decision-type";
import AuthoritiesWrapper from "./authorities-wrapper";

const ResultListedEntry = ({ content }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { modalCxt, basketCxt } = useContext(ModalContext);
  const handleClick = () => {
    modalCxt.setDetailedContent(content);
    modalCxt.setIsModalOpen(true);
  };

  const handleOnChange = (content, event) => {
    if (basketCxt.basket) {
      const basketToUpdate = basketCxt.basket;
      if (basketToUpdate.decisions && basketToUpdate.decisions.length > 0) {
        let filteredDecisions = basketToUpdate.decisions.filter(
          decision => decision.id !== content.id
        );
        basketToUpdate.decisions = filteredDecisions;
      }
      if (!isChecked) {
        basketToUpdate.decisions.push(
          Object.assign({}, content, { isChecked: true })
        );
      }
      basketCxt.setBasket(Object.assign({}, basketToUpdate));
      setIsChecked(!isChecked);
    }
  };

  /* initalized isChecked with basket */
  useEffect(() => {
    if (content && basketCxt && basketCxt.basket.decisions) {
      let currentDecision = basketCxt.basket.decisions.find(
        decision => decision.id === content.id
      );
      if (currentDecision) {
        setIsChecked(currentDecision.isChecked);
      }
    }
  }, [content, basketCxt]);

  return (
    <>
      {content && (
        <div className="row mb-3 media text-muted pt-3 border-bottom border-primary">
          <div className="custom-control custom-checkbox mb-3 col-md-4 themed-grid-col pb-3">
            <input
              className="custom-control-input"
              id={`decision-${content.id}`}
              type="checkbox"
              checked={isChecked}
              onChange={event => handleOnChange(content, event)}
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
            onClick={handleClick}
          >
            <AuthoritiesWrapper authorities={content.authorities} />
          </div>
          <div
            className="col-md-4 media-body pb-3 mb-0 lh-125 "
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <DecisionType type={content.type} />
          </div>
          {content.decision_date && (
            <div
              className="col-md-4 font-weight-bold media-body pb-3 mb-0 lh-125"
              data-tip
              data-for="decisionDate"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            >
              <DecisionDate date={content.decision_date} />
            </div>
          )}
          <TagWrapper tags={content.tags} />
        </div>
      )}
    </>
  );
};

export default ResultListedEntry;
