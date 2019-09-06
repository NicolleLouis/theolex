import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import Searchbar from "../organisms/searchbar";
import FiltersSection from "../organisms/filters-section";
import ResultSection from "../organisms/result-section";
import ResultDetailedEntry from "../molecules/result-detailed-entry";
import ModalWrapper from "../molecules/modal-wrapper";
import ModalContext from "../../config/modal-context";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_DECISIONS = API_URL + "/get_decisions";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("");
  const [result, setResult] = useState({ hits: [] });

  const [triggerSearch, setTriggerSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  const getQueryParams = () => {
    let params = {};
    params["filters"] = filters;
    if (searchTerm !== "") {
      params["input_search_bar"] = searchTerm;
    }
    return { params: params };
  };

  /* Call API when search is triggered */
  useEffect(() => {
    const fetchDecisions = async () => {
      setIsError(false);
      setIsSearching(true);

      try {
        const response = await axios.get(GET_DECISIONS, getQueryParams());
        setResult(response.data);
      } catch (error) {
        setIsError(true);
      }
      setIsSearching(false);
    };
    fetchDecisions();
  }, [triggerSearch]);

  useEffect(() => {
    setTriggerSearch("Filters: ".concat(JSON.stringify(filters)));
  }, [filters]);

  /* Manage Modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailedContent, setDetailedContent] = useState({});
  const contextValue = { isModalOpen, setIsModalOpen, setDetailedContent };

  return (
    <>
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setTriggerSearch={setTriggerSearch}
      />
      <FiltersSection filters={filters} setFilters={setFilters} />
      <ModalContext.Provider value={contextValue}>
        <ResultSection
          isError={isError}
          isSearching={isSearching}
          result={result}
        />
      </ModalContext.Provider>
      <ModalWrapper
        isModalOpen={isModalOpen}
        title={detailedContent.name}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ResultDetailedEntry content={detailedContent} />
      </ModalWrapper>
    </>
  );
};

export default SearchPage;