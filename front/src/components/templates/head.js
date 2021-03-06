import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "";

const Head = props => {

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ""}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />

      {/* <!-- Favicon --> */}
      <link
        rel="icon"
        href={require("../../static/img/brand/favicon.ico")}
        type="image/png"
      />

      {/* <!-- Icons --> */}
      <link href="../../static/vendor/nucleo/css/nucleo.css" rel="stylesheet" />

      {/* !--  CSS --> */}
      <link
        type="text/css"
        href="../../static/vendor/argon/css/argon.css"
        rel="stylesheet"
      />
    </NextHead>
  );
};

Head.propTypes = {
  title: string,
  description: string
};

export default Head;
