import React, { useState, useEffect, useMemo } from "react";
import getConfig from "next/config";
import axios from "axios";
import Card from "../atoms/card";
import { sortBy } from "lodash";
import FiltersSection from "../organisms/filters-section";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_AMOUNT_BY_COMPANY = API_URL + "/get_amount_by_company";

const TableAmountByCompany = () => {
  const [filters, setFilters] = useState("");
  const [sorted, setSorted] = useState({});
  const [filteredCompanies, setFilteredCompany] = useState([]);
  const [isError, setIsError] = useState(false);
  const [amountByCompany, setAmountByCompany] = useState([]);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getQueryParams = filters => {
    let params = {};
    params["filters"] = filters;
    return Object.assign({ cancelToken: source.token }, { params: params });
  };

  const queryParams = useMemo(() => getQueryParams(filters), [filters]);

  useEffect(() => {

    const fetchAmountByCompany = async () => {
      setIsError(false);
      try {
        const response = await axios.get(GET_AMOUNT_BY_COMPANY, queryParams);
        const { data } = response;
        if (data.value) {
          setAmountByCompany(data.value);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("fetchAmountByCompany cancelled", error);
        } else {
          setIsError(true);
          console.error(`fetchDecisions error ${filters} ${error}`);
          throw error;
        }
      }
    };

    console.info("fetchAmountByCompany ", JSON.stringify(queryParams, null, 2));
    fetchAmountByCompany();

    /* Executed when component willUnmount */
    return () => {
      source.cancel();
    };
  }, [queryParams]);

  useEffect(() => {
    setFilteredCompany(Array.from(amountByCompany));
    setSorted({ column: "company", sort: "asc" });
  }, [amountByCompany]);

  useEffect(() => {
    if (sorted.sort === "asc") {
      setFilteredCompany(sortBy(filteredCompanies, [sorted.column]));
    } else {
      setFilteredCompany(sortBy(filteredCompanies, [sorted.column]).reverse());
    }
  }, [sorted]);

  const handleSort = e => {
    e.persist();

    if (sorted.sort === "asc") {
      setSorted({
        column: e.target.id,
        sort: "desc"
      });
    } else {
      setSorted({
        column: e.target.id,
        sort: "asc"
      });
    }
  };

  return (
    <Card>
      <FiltersSection filters={filters} setFilters={setFilters} />
      <div className="table-responsive">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th
                scope="col"
                id="company"
                className="sort"
                data-sort="label"
                onClick={handleSort}
              >
                Entity
              </th>
              <th
                scope="col"
                id="company_type"
                className="sort"
                data-sort="label"
                onClick={handleSort}
              >
                Activity
              </th>
              <th
                scope="col"
                id="amount_paid"
                className="sort"
                data-sort="label"
                onClick={handleSort}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="list">
            {isError ? (
              <tr>
                <td>
                  <div className="alert alert-danger alert-dismissible fade show">
                    <span className="alert-icon">
                      <i className="fas fa-exclamation-triangle" />
                    </span>
                    <span className="alert-text ml-1">Fetching data error</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCompanies &&
              filteredCompanies.map((amountAndCompany, index) => (
                <tr key={index}>
                  <th scope="row">
                    <span className="name mb-0 text-sm">
                      {amountAndCompany && amountAndCompany.company}
                    </span>
                  </th>
                  <th scope="row">
                    <span className="name mb-0 text-sm">
                      {amountAndCompany && amountAndCompany.company_type}
                    </span>
                  </th>
                  <td>
                    {amountAndCompany && amountAndCompany.amount_paid_formatted}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TableAmountByCompany;
