const express = require("express");
const proxy = require("http-proxy-middleware");
const http = require("http");
const next = require("next");
const dpasAPI = require("./dpas-api");
const routes = require("./routes");
const config = require("dotenv").config();

if (config.error) {
  throw config.error;
}

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src"
});
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  const options = {
    target: process.env.BACKEND_HOST, // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      "^/api/dpas": "/api/get_all_results" // rewrite path
    }
  };

  const apiProxy = proxy("/api/dpas", options);

  server.use("/api/dpas", apiProxy);

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
