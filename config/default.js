const path = require("path");

const base_url = process.env.APP_URL || "http://localhost:3001";

module.exports = {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    ttl: 86400,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/shop",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  app: {
    base_url: base_url,
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3001,
    upload_product_dir: path.resolve("server/storage/public/uploads/products"),
    upload_category_dir: path.resolve(
      "server/storage/public/uploads/categories"
    ),
    temp_dir: path.resolve("server/storage/temp"),
    static_url: `${base_url}/assets/`,
    storage_domain: `${base_url}/assets/storage/uploads`,
    imagemin_out: path.resolve("server/storage/temp/imagemins"),
  },
  bcrypt: { saltRounds: 12 },
};
