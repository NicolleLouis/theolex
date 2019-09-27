import React, { useState, useEffect, useContext } from "react";
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
  const [basket, setBasket] = useState(basketCxt.basket);

  const getQueryParams = () => {
    let params = {};
    const curatedBasket = [];
    if (basket && basket.decisions && basket.decisions.length > 0) {
      basket.decisions.map(decision => curatedBasket.push(decision.id));
    }
    params["decisions"] = curatedBasket;
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

  useEffect(() => {
    setIsBasketEmpty(
      !basket || (basket.decisions && basket.decisions.length === 0)
    );
  }, [basket]);

  const deleteBenchmark = () => {
    basketCxt.resetBasket();
    setBasket({ decisions: [] });
  };

  return (
    <>
      <div className="col-12 col-md-12 mt-5">
        <Card>
          <div className="border-0 card-header">
            <div className="row">
              <div className="col-6">
                <a
                  className="table-action table-action-delete"
                  onClick={deleteBenchmark}
                  style={{ cursor: "pointer" }}
                >
                  <h3 className="mb-0">
                    Reset Benchmark <i className="fas fa-trash" />
                  </h3>
                </a>
              </div>
            </div>
            {isBasketEmpty ? (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <span className="alert-icon">
                  <i className="fas fa-exclamation-circle" />
                </span>
                <span className="alert-text ml-1">
                  <strong>No decision selected</strong> Please select decisions
                </span>
              </div>
            ) : isFetching ? (
              <span>Fetching benchmarks....</span>
            ) : isError ? (
              <span>Error fetching benchmarks</span>
            ) : (
              benchmark && <TableBenchmark benchmark={benchmark} />
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default BenchmarkPage;
