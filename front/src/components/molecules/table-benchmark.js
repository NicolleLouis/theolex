import React, { useState, useEffect } from "react";

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
      {isReady && (
        <div className="table-responsive">
          <table className="align-items-center table-flush table">
            {rows && rows.length > 0 && (
              <thead className="thead-light">
                <tr>
                  <td></td>
                  {values &&
                    values.length > 0 &&
                    values.map(value => {
                      return (
                        <>
                          <td>{value[rows[0]]}</td>
                        </>
                      );
                    })}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, index) => {
                if (index !== 0) {
                  return (
                    <tr key={index}>
                      <td>{row}</td>
                      {values &&
                        values.length > 0 &&
                        values.map(value => {
                          return (
                            <>
                              <td>{value[row]}</td>
                            </>
                          );
                        })}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TableBenchmark;
