import React, { useState, useEffect } from "react";
import { Cell, Row } from "react-sticky-table";

const TableBenchmark = ({ benchmark }) => {
  const { rows, values, hits } = benchmark;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (rows && rows.length > 0 && values && values.length > 0 && hits > 0) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [rows, values, hits]);

  return (
    <>
      {isReady &&
        rows.map((row, index) => {
          return (
            <Row>
              <Cell>{row}</Cell>
              {values &&
                values.length > 0 &&
                values.map(value => {
                  return (
                    <>
                      <Cell>{value[row]}</Cell>
                    </>
                  );
                })}
            </Row>
          );
        })}
    </>
  );
};

export default TableBenchmark;
