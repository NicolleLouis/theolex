require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withCss = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withImages(withCss({
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
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
}));
