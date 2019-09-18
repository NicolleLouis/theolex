import React from "react";
import Card from "../atoms/card";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";
import DecisionDate from "../atoms/decision-date";
import DecisionType from "../atoms/decision-type";

const ResultDetailedEntry = ({ content }) => {
  return (
    <>
      <div className="col-12 col-md-12">
        <Card className="card-stats">
          <div className="row">
            {content.decision_date && (
              <DecisionDate date={content.decision_date} />
            )}
            <div className="col">
              <strong
                className="d-block text-gray-dark"
                data-tip
                data-for="authorities"
              >
                {content.authorities}
              </strong>
              <ReactTooltip id="authorities" type="info">
                <span>Authorities</span>
              </ReactTooltip>
            </div>
            <DecisionType value={content.type} />
            <TagWrapper tags={content.tags} />
          </div>
        </Card>
        <Card className="card-stats">
          <div className="row">
            <span className="h4 font-weight-bold mb-0">{content.text}</span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResultDetailedEntry;
