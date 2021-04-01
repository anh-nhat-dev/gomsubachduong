const bcrypt = require("bcrypt");
const config = require("config");

exports.hashPassword = async (plantextPassword) => {
  return await bcrypt.hash(plantextPassword, config.get("bcrypt.saltRounds"));
};

exports.comparePassword = async (plantextPassword, hash) => {
  return await bcrypt.compare(plantextPassword, hash);
};
