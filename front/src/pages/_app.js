import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App, { Container } from "next/app";
import { ThemeProvider } from "styled-components";

import "bootstrap/dist/css/bootstrap.css";
import "startbootstrap-sb-admin-2/css/sb-admin-2.css";
import '@fortawesome/fontawesome-svg-core/styles.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTable,
  faBars,
  fas,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

library.add(faTable, faBars, fas, faSearch);

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <HelmetProvider>
          <Helmet
            htmlAttributes={{
              lang: "en"
            }}
            title="Theolex"
            meta={[
              {
                name: "viewport",
                content: "width=device-width, initial-scale=1, shrink-to-fit=n"
              },
              { property: "og:title", content: "Theolex" },
              {
                name: "theme-color",
                content: "#000000"
              },
              {
                charset: "utf-8"
              }
            ]}
            link={[
              {
                rel: "stylesheet",
                href:
                  "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
              }
            ]}
            bodyAttributes={{
              class: "g-sidenav-show g-sidenav-pinned"
            }}
          />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </HelmetProvider>
      </Container>
    );
  }
}
