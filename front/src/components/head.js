import React, { useEffect } from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import cookie from 'js-cookie';

const defaultDescription = "";

const Head = props => {
  useEffect(() => {
    window.$ = window.jQuery = require("jquery");
    require("bootstrap");
    window.Cookies = cookie;

  });

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
        href={require("../static/assets/img/brand/favicon.png")}
        type="image/png"
      />

      {/* <!-- Fonts --> */}
      {/*<link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
      rel="stylesheet"
    />*/}

      {/* <!-- Icons --> */}
      <link href="../static/vendor/nucleo/css/nucleo.css" rel="stylesheet" />

      {/* !--  CSS --> */}
      <link
        type="text/css"
        href="../static/vendor/argon/css/argon.css"
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
