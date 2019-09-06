import React from "react";
import Moment from "react-moment";
import Card from "../atoms/card";
import Tag from "../atoms/tag";
import TagWrapper from "./tag-wrapper";

const renderTags = (value, index) => {
  if (value.label) {
    switch (typeof value.label) {
      case "string":
        return <Tag key={index} value={value} />;
      case "object":
        return <TagWrapper key={index} value={value} />;
    }
  }
};
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
            <div className="col-md-4 themed-grid-col">
              {content.tags &&
              content.tags.length > 0 &&
              content.tags.map((value, index) => renderTags(value, index))}
            </div>
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
