import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App, { Container } from "next/app";
import { ThemeProvider } from "styled-components";

import "@fortawesome/fontawesome-free/css/all.min.css";

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
                content: "width=device-width, initial-scale=1, shrink-to-fit=no"
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
                  "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
              }
            ]}
          />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </HelmetProvider>
      </Container>
    );
  }
}
