import React, { useState, useEffect, useContext } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import getConfig from "next/config";
import axios from "axios";
import Card from "../atoms/card";
import ApplicationContext from "../../config/application-context";
import TableBenchmark from "../molecules/table-benchmark";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_BENCHMARK = API_URL + "/get_benchmark";

const BenchmarkPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isBasketEmpty, setIsBasketEmpty] = useState(true);
  const [benchmark, setBenchmark] = useState({ hits: [] });
  const { basketCxt } = useContext(ApplicationContext);
  const { basket } = basketCxt;

  const getQueryParams = () => {
    let params = {};
    params["decisions"] = basket.decisions;
    return { params: params };
  };

  useEffect(() => {
    const fetchBenchmark = async () => {
      setIsError(false);
      setIsFetching(true);

      try {
        const response = await axios.get(GET_BENCHMARK, getQueryParams());
        setBenchmark(response.data);
      } catch (error) {
        setIsError(true);
      }

      setIsFetching(false);
    };
    if (basket && basket.decisions && basket.decisions.length > 0) {
      setIsBasketEmpty(false);
      fetchBenchmark();
    }
  }, []);

  return (
    <>
      <div className="col-12 col-md-12 mt-5">
        <Card className="card-stats">
          {isBasketEmpty ? (
            <div
              className="alert alert-primary alert-dismissible fade show"
              role="alert"
            >
              <span className="alert-icon">
                <i className="fas fa-exclamation-circle"></i>
              </span>
              <span className="alert-text ml-1">
                <strong>No decision selected</strong> Please select decisions
              </span>
            </div>
          ) : (
            <div style={{ widCell: "100%", height: "300px" }}>
              {isFetching ? (
                <span>Fetching benchmarks....</span>
              ) : isError ? (
                <span>Error fetching benchmarks</span>
              ) : (
                <StickyTable>
                  <Row
                    style={{
                      boxSizing: "border-box",
                      verticalAlign: "inherit",
                      color: "#8898aa",
                      backgroundColor: "#f6f9fc",
                      textTransform: "uppercase"
                    }}
                    className="pt-2 pb-2"
                  >
                    <Cell></Cell>
                    {basketCxt.basket.decisions &&
                      basketCxt.basket.decisions.length > 0 &&
                      basketCxt.basket.decisions.map((decision, index) => {
                        return (
                          <Cell key={index} id={`decision-${decision.id}`}>
                            {decision.name}
                          </Cell>
                        );
                      })}
                  </Row>
                  {benchmark && <TableBenchmark benchmark={benchmark} />}
                </StickyTable>
              )}
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default BenchmarkPage;
