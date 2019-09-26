import React, { useState, useEffect, useContext } from "react";
import ApplicationContext from "../../config/application-context";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";
import DecisionDate from "../atoms/decision-date";
import DecisionType from "../atoms/decision-type";
import AuthoritiesWrapper from "./authorities-wrapper";

const ResultListedEntry = ({ content, isChecked }) => {
  const { modalCxt, basketCxt } = useContext(ApplicationContext);
  const { basket } = basketCxt;
  const [localChecked, setLocalChecked] = useState(false);
  const handleClick = () => {
    modalCxt.setDetailedContent(content);
    modalCxt.setIsModalOpen(true);
  };

  useEffect(() => {
    if (isChecked) {
      setLocalChecked(true);
    }
  }, [isChecked]);

  const handleOnChange = content => {
    if (
      localChecked &&
      basket &&
      basket.decisions &&
      basket.decisions.length > 0
    ) {
      // remove from basket
      const removedBasket = basket.decisions.filter(
        decision => decision.id !== content.id
      );
      basketCxt.setBasket({ decisions: removedBasket });
    } else {
      // add to basket
      const newBasket = [...basket.decisions];
      newBasket.push(content);
      basketCxt.setBasket({ decisions: newBasket });
    }
    setLocalChecked(!localChecked);
  };

  return (
    <>
      {content && (
        <div className="row mb-3 media text-muted pt-3 border-bottom border-primary">
          <div className="custom-control custom-checkbox mb-3 col-md-4 themed-grid-col pb-3">
            <input
              className="custom-control-input"
              id={`decision-${content.id}`}
              type="checkbox"
              checked={localChecked}
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
