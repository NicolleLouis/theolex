import React from "react";
import Moment from "react-moment";
import Card from "../atoms/card";
import TagAmount from "../atoms/tag-amount";

const ResultDetailedEntry = ({ content }) => {
  return (
    <>
      <div className="col-12 col-md-12">
        <Card className="card-stats">
          <div className="row">
            <div className="col">
              <span className="h4 font-weight-bold mb-0">
                <Moment format="YYYY/MM/DD">{content.decision_date}</Moment>
              </span>
            </div>
            <div className="col">
              <span className="h8 font-weight-bold mb-0">{content.type}</span>
            </div>
            {content.monetary_sanction && (
              <div className="col-auto">
                <TagAmount value={content.monetary_sanction} unit="€" />
              </div>
            )}
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
