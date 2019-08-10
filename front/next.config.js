require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const withCss = require("@zeit/next-css");
const withImages = require("next-images");
const os = require("os");

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

// Compute api host needed to call
is_dev_environment = process.env.ENV == "dev"
const ifaces = os.networkInterfaces();
const face_for_current_env = is_dev_environment ? "lo" : "eth0";

const nextConfig = {
  publicRuntimeConfig: {
    API_URL: "http://" + ifaces[face_for_current_env][0]["address"] +"/api/get_all_results"
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env_dev file
      // todo: @johann -> Why is it used here and not already done in docker-compose?
      new Dotenv({
        path: path.join(__dirname, ".env_dev"),
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
  console.log("PHASE", phase);
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    Object.assign(nextConfig, {
      publicRuntimeConfig: {
        API_URL: "http://localhost:3000/api/get_all_results"
      }
    });
    return withCss(withImages(nextConfig));
  }
  if (phase === PHASE_PRODUCTION_BUILD) {
    return withCss(withImages(nextConfig));
  }
  return withImages(nextConfig);
};
