const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
};

module.exports = mongoose.model("User", UserSchema, "users");
