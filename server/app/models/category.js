const mongoose = require("mongoose");

const { getFullUrlMediaUpload } = require("../../helpers");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tree: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      default: null,
    },
    bg: {
      id: false,
      filename: {
        type: String,
        default: null,
      },
    },
    icon: {
      id: false,
      filename: {
        type: String,
        default: null,
      },
    },
    banner: {
      id: false,
      filename: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

CategorySchema.virtual("bg.url").get(function () {
  return getFullUrlMediaUpload(this.bg.filename, "categories");
});

CategorySchema.virtual("icon.url").get(function () {
  return getFullUrlMediaUpload(this.icon.filename, "categories");
});

CategorySchema.virtual("banner.url").get(function () {
  return getFullUrlMediaUpload(this.banner.filename, "categories");
});

CategorySchema.virtual("childrend", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "cate_id",
  justOne: false,
  match: { status: "publish" },
});

CategorySchema.pre("find", function (next) {
  this.populate("childrend");
  next();
});

module.exports = mongoose.model("Category", CategorySchema, "categories");
