const express = require("express");
const http = require("http");
const next = require("next");
const routes = require("./routes");
const os = require("os");
const hostname = os.hostname();

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src"
});
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(
      `Runnning on ${hostname} listening on port ${process.env.PORT}`
    );
  });
});
