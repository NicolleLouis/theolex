require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const withCss = require("@zeit/next-css");
const withImages = require("next-images");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

// Compute api host needed to call
is_dev_environment = process.env.ENV == "dev"

const api_url = is_dev_environment ? "http://localhost:8000/api/get_decisions" : "http://34.77.17.149:8000/api/get_decisions";

const nextConfig = {
  publicRuntimeConfig: {
    API_URL: api_url
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        argon: path.resolve(
          path.join(__dirname, "src/static/vendor/argon/js/argon.js")
        )
        // In case you imported plugins individually, you must also require them here:..
      })
    ];
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|jpe?g|gif)(\?\S*)?$/,
      loader: "url-loader?limit=100000&name=[name].[ext]"
    });

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    return config;
  }
};

module.exports = phase => {
  // used in dev mode (hot reloading enabled) and during build because css isn't minified: npm run dev
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return withCss(withImages(nextConfig));
  }
  // used in production (no hot reloading) mode AFTER build: npm start
  return withImages(nextConfig);
};
