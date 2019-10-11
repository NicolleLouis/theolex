import React, { useState, useEffect, useContext, useMemo } from "react";
import getConfig from "next/config";
import axios from "axios";
import Searchbar from "../organisms/searchbar";
import FiltersSection from "../organisms/filters-section";
import ResultSection from "../organisms/result-section";
import ResultDetailedEntry from "../molecules/result-detailed-entry";
import ModalWrapper from "../molecules/modal-wrapper";
import ApplicationContext from "../../config/application-context";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_DECISIONS = API_URL + "/get_decisions";

const SearchPage = () => {
  const { modalCxt, basketCxt } = useContext(ApplicationContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("");
  const [result, setResult] = useState({ hits: [] });

  const [triggerSearch, setTriggerSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getQueryParams = (filters, searchTerm) => {
    let params = {};
    params["filters"] = filters;
    if (searchTerm !== "") {
      params["input_search_bar"] = searchTerm;
    }
    return Object.assign({ cancelToken: source.token }, { params: params });
  };

  const queryParams = useMemo(() => getQueryParams(filters, searchTerm), [
    filters,
    searchTerm
  ]);

  /* Call API when search is triggered */
  useEffect(() => {
    const fetchDecisions = async () => {
      setIsError(false);
      setIsSearching(true);

      try {
        const response = await axios.get(GET_DECISIONS, queryParams);
        setResult(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.info("fetchDecisions cancelled", error);
        } else {
          setIsError(true);
          console.error(`fetchDecisions error ${filters} ${error}`);
          throw error;
        }
      }
      setIsSearching(false);
    };
    console.info(
      `fetchDecisions ${JSON.stringify(filters, null, 2)} ${searchTerm}`
    );
    fetchDecisions();

    /* Executed when component willUnmount */
    return () => {
      source.cancel();
    };
  }, [queryParams, triggerSearch]);

  return (
    <>
      {modalCxt && basketCxt && (
        <>
          <Searchbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setTriggerSearch={setTriggerSearch}
          />
          <FiltersSection filters={filters} setFilters={setFilters} />

          <ResultSection
            isError={isError}
            isSearching={isSearching}
            result={result}
          />

          <ModalWrapper
            isModalOpen={modalCxt.isModalOpen}
            title={modalCxt.detailedContent.name}
            onClose={modalCxt.onClose}
          >
            <ResultDetailedEntry content={modalCxt.detailedContent} />
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default SearchPage;
