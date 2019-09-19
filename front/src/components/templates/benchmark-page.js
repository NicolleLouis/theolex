import React, { useContext } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import Card from "../atoms/card";
import ApplicationContext from "../../config/application-context";

const BenchmarkPage = () => {
  const { basketCxt } = useContext(ApplicationContext);

  return (
    <>
      {basketCxt && (
        <div className="col-12 col-md-12 mt-5">
          <Card className="card-stats">
            <div style={{ widCell: "100%", height: "300px" }}>
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
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
                <Row>
                  <Cell>Cell 1</Cell>
                  <Cell>Cell 2</Cell>
                  <Cell>Cell 3</Cell>
                  <Cell>Cell 4</Cell>
                </Row>
              </StickyTable>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default BenchmarkPage;
