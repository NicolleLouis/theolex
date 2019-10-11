import React, { useState, useEffect, useContext, useMemo } from "react";
import getConfig from "next/config";
import Card from "../atoms/card";
import TagWrapper from "./tag-wrapper";
import ReactTooltip from "react-tooltip";
import DecisionDate from "../atoms/decision-date";
import DecisionType from "../atoms/decision-type";
import ApplicationContext from "../../config/application-context";
import axios from "axios";
import ErrorAlert from "../atoms/error-alert";
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_DECISION = API_URL + "/get_decision";

const ResultDetailedEntry = () => {
  const { modalCxt } = useContext(ApplicationContext);
  const { contentId } = modalCxt;
  const [content, setContent] = useState({});
  const [isError, setIsError] = useState(false);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getQueryParams = id => {
    let params = {};
    params["id"] = id;
    return Object.assign({ cancelToken: source.token }, { params: params });
  };

  const queryParams = useMemo(() => getQueryParams(contentId), [contentId]);

  useEffect(() => {
    const fetchDecision = async () => {
      setIsError(false);

      try {
        const response = await axios.get(GET_DECISION, queryParams);
        setContent(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.info("fetchDecision unique cancelled", error);
        } else {
          setIsError(true);
          console.error(`fetchDecision unique error ${contentId} ${error}`);
          throw error;
        }
      }
    };
    console.info(`fetchDecision unique ${contentId}`);
    fetchDecision();

    /* Executed when component willUnmount */
    return () => {
      source.cancel();
    };
  }, [queryParams]);

  return (
    <>
      <div className="col-12 col-md-12">
        {isError ? (
          <ErrorAlert text="Error when fetching decision" />
        ) : (
          <>
            <Card className="card-stats">
              <div className="row">
                <div className="col">
                  {content.decision_date && (
                    <DecisionDate date={content.decision_date} />
                  )}
                </div>
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
                <div className="col">
                  <DecisionType value={content.type} />
                </div>
                <div className="col">
                  <TagWrapper tags={content.tags} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {content.press_release_link && (
                    <a href={content.press_release_link}>
                      Press release
                    </a>
                  )}
                </div>
                <div className="col">
                  {content.document_link && (
                    <a href={content.document_link}>Documents</a>
                  )}
                </div>
                <div className="col">
                  {content.defendant && (
                    <span>
                      Defendant: <strong>{content.defendant}</strong>
                    </span>
                  )}
                </div>
                <div className="col"></div>
              </div>
            </Card>
            <Card className="card-stats">
              <div className="row">
                <span className="h4 font-weight-bold mb-0">
                  {content.text}
                </span>
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default ResultDetailedEntry;
