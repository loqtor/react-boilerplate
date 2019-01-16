var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var httpProxy = require("http-proxy");

const PROXY_PATH = "/api-proxy";
const API_URL = "****";
const REACT_APP_URL = "http://localhost:3001";

// Initialize the express server
const server = express();

const proxy = httpProxy.createProxyServer({ secure: false });

proxy.on("error", function(err, req, res) {
  res.writeHead(500, {
    "Content-Type": "text/plain"
  });

  const message = `Error proxying request: ${
    err.code
  }. Check the React Development server is running.`;
  console.error(message);
  res.end(message);
});

// Set up middleware
server.use(logger("dev"));
server.use(express.static(path.join(__dirname, "public")));

// uncomment after placing your favicon in /public
// server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

server.use("/", (req, res) => {
  if (req.url.startsWith(PROXY_PATH)) {
    // Forward API requests to the configured API URL
    req.url = req.url.replace(PROXY_PATH, "");
    console.log(req.url);
    proxy.web(req, res, { target: API_URL });
  } else {
    // Forward non-API requests to the React app
    try {
      proxy.web(req, res, { target: REACT_APP_URL });
    } catch (err) {
      console.error(err);
    }
  }
});

// Catch 404 and forward to error handler
server.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
server.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.server && req.server.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = server;
