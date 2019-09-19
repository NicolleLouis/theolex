import React, { useContext } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import Card from "../atoms/card";
import ApplicationContext from "../../config/application-context";

const BenchmarkPage = () => {
  const { basketCxt } = useContext(ApplicationContext);

  return (
    <>
      {basketCxt && (
        <div className="col-12 col-md-12">
          <Card className="card-stats">
            <div style={{ widCell: "100%", height: "200px" }}>
              <StickyTable>
                <Row>
                  <Cell></Cell>
                  {basketCxt.basket.decisions &&
                    basketCxt.basket.decisions.length > 0 &&
                    basketCxt.basket.decisions.map((decision, index) => {
                      return (
                        <Cell key={index} id={decision.id}>
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
