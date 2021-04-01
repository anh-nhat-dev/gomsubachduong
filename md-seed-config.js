const mongoose = require("mongoose");
const User = require("./seeders/users.seeder");
const Category = require("./seeders/categories.seeder");
const Product = require("./seeders/products.seeder");
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/shop";

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = { User, Category, Product };
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
