import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import Card from "../atoms/card";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_AMOUNT_BY_COMPANY = API_URL + "/get_amount_by_company";

/* Hook */
const useGetAmountByCompany = () => {
  const [isError, setIsError] = useState(false);
  const [amountByCompany, setAmountByCompany] = useState([]);
  useEffect(() => {
    const fetchAmountByCompany = async () => {
      setIsError(false);
      try {
        const response = await axios.get(GET_AMOUNT_BY_COMPANY);
        const { data } = response;
        if (data.value) setAmountByCompany(data.value);
      } catch (error) {
        setIsError(true);
        console.error("fetchAmountByCompany: ", error);
      }
    };
    fetchAmountByCompany();
  }, []);
  return { amountByCompany, isError };
};

/* HOC */
const withAmountByCompany = Comp => props => {
  const { amountByCompany, isError } = useGetAmountByCompany();
  return <Comp {...props} amountByCompany={amountByCompany} error={isError} />;
};

const TableAmountByCompany = ({ amountByCompany, error }) => {
  return (
    <Card>
      <div className="table-responsive">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th scope="col" className="sort" data-sort="label">
                Company
              </th>
              <th scope="col" className="sort" data-sort="value">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="list">
            {error ? (
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
              amountByCompany &&
              amountByCompany.map((amountAndCompany, index) => (
                <tr key={index}>
                  <th scope="row">
                    <span className="name mb-0 text-sm">
                      {amountAndCompany && amountAndCompany.company}
                    </span>
                  </th>
                  <td>{amountAndCompany && amountAndCompany.amount_paid}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default withAmountByCompany(TableAmountByCompany);
