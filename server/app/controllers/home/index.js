const path = require("path");

exports.home = (req, res, next) => {
  try {
    res.sendFile(path.resolve("client/build", "index.html"));
  } catch (error) {
    next(error);
  }
};
