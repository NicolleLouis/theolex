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

  if (dev) {
    server.use(dpasAPI);
  }

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
