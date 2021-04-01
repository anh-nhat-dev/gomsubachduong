const fs = require("fs");
const path = require("path");
const config = require("config");

if (!fs.existsSync(path.resolve("server/storage"))) {
  fs.mkdirSync(path.resolve("server/storage"));
}

if (!fs.existsSync(path.resolve("server/storage/public"))) {
  fs.mkdirSync(path.resolve("server/storage/public"));
}

if (!fs.existsSync(path.resolve("server/storage/public/uploads"))) {
  fs.mkdirSync(path.resolve("server/storage/public/uploads"));
}

if (!fs.existsSync(config.get("app.upload_category_dir"))) {
  fs.mkdirSync(config.get("app.upload_category_dir"));
}

// Check folder exist.
if (!fs.existsSync(config.get("app.upload_product_dir"))) {
  fs.mkdirSync(config.get("app.upload_product_dir"));
}

// Check folder exist.
if (!fs.existsSync(config.get("app.temp_dir"))) {
  fs.mkdirSync(config.get("app.temp_dir"));
}

if (!fs.existsSync(path.resolve("server/public/storage"))) {
  fs.symlinkSync(
    path.resolve("server/storage/public"),
    path.resolve("server/public/storage")
  );
}
