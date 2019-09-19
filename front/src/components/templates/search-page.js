import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import cookie from "js-cookie";
import Searchbar from "../organisms/searchbar";
import FiltersSection from "../organisms/filters-section";
import ResultSection from "../organisms/result-section";
import ResultDetailedEntry from "../molecules/result-detailed-entry";
import ModalWrapper from "../molecules/modal-wrapper";
import ApplicationContext from "../../config/application-context";
import BenchmarkPage from "./benchmark-page";

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

  /* Basket state management */
  const [basket, setBasket] = useState({ decisions: [] });
  /* Basket init */
  useEffect(() => {
    const cookieBasket = cookie.get("basket");
    setBasket(
      cookie.get("basket") !== undefined
        ? JSON.parse(cookie.get("basket"))
        : { decisions: [] }
    );
  }, []);

  /* Basket cookie update */
  useEffect(() => {
    cookie.remove("basket");
    cookie.set("basket", basket, { expires: 1000 });
  }, [basket]);

  /* Reset basket */
  const resetBasket = () => setBasket({ decisions: [] });

  /* Manage Modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [detailedContent, setDetailedContent] = useState({});

  const onClose = () => setIsModalOpen(false);

  const renderModal = type => {
    switch (type) {
      case "result":
        return <ResultDetailedEntry content={detailedContent} />;
      case "benchmark":
        return <BenchmarkPage />;
    }
  };

  const contextValue = {
    modalCxt: { isModalOpen, setIsModalOpen, setModalType, setDetailedContent },
    basketCxt: { basket, setBasket, resetBasket }
  };

  return (
    <>
      <ApplicationContext.Provider value={contextValue}>
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
          isModalOpen={isModalOpen}
          title={modalType === "result" ? detailedContent.name : "Benchmark"}
          onClose={onClose}
        >
          {renderModal(modalType)}
        </ModalWrapper>
      </ApplicationContext.Provider>
    </>
  );
};

export default SearchPage;
