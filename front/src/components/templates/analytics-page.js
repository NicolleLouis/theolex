import React from "react";
import TableAmountByCompany from "../molecules/table-amount-by-company";

const AnalyticsPage = () => {
  return (
    <>
      <div className="header bg-light pb-6"></div>
      <div className="mt--5 container-fluid">
        <TableAmountByCompany />
      </div>
    </>
  );
};

export default AnalyticsPage;
