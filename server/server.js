const http = require("http");
const config = require("config");
const app = require("./app");

/**
 *
 */
const server = http.createServer(app);
const port = config.get("app.port");

server.listen(port, () => {
  console.log(`Server active on port: ${port}`);
});
