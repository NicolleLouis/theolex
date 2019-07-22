import React from "react";
import { Form, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopbarSearch = () => {
  return (
    <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <InputGroup>
        <Input
          type="text"
          className="form-control bg-light border-0 small"
          placeholder="Search for..."
          aria-label="Search"
        />
        <InputGroupAddon addonType="append">
          <Button color="primary">
            <FontAwesomeIcon icon="search" className="fas fa-sm" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

export default TopbarSearch;
