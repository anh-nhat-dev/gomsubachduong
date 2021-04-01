const mongoose = require("mongoose");
const config = require("config");
const fs = require("fs");
const path = require("path");

const modelPath = path.resolve("server", "app/models");

// Load modal
fs.readdirSync(modelPath)
  .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
  .forEach((file) => require(path.resolve(modelPath, file)));

const _mongoConnectError = function (err) {
  console.error(`mongoose default connection has occured error`);
};

const _mongoConnectSuccess = function () {
  console.info(`mongoose default connection`);
};

const _mongodbDisconnected = function () {
  console.info(`mongoose default connection is disconnected`);
};

mongoose.connect(config.get("mongodb.uri"), config.get("mongodb.options"));

mongoose.connection
  .on("error", _mongoConnectError)
  .on("connected", _mongoConnectSuccess)
  .on("disconnected", _mongodbDisconnected);
