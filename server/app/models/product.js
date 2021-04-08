const mongoose = require("mongoose");
const { escape, unescape } = require("html-escaper");
const { getFullUrlMediaUpload } = require("../../helpers");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      empty: false,
      text: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      empty: false,
      text: true,
    },
    price_discount: {
      type: Number,
      default: 0,
    },
    price_original: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      id: false,
      full: {
        filename: {
          type: String,
          default: null,
        },
      },
      thumbnail: {
        filename: {
          type: String,
          default: null,
        },
      },
      small: {
        filename: {
          type: String,
          default: null,
        },
      },
      large: {
        filename: {
          type: String,
          default: null,
        },
      },
    },
    photos: [
      {
        full: {
          id: false,
          filename: {
            type: String,
            default: null,
          },
        },
        thumbnail: {
          id: false,
          filename: {
            type: String,
            default: null,
          },
        },
        small: {
          id: false,
          filename: {
            type: String,
            default: null,
          },
        },
        large: {
          id: false,
          filename: {
            type: String,
            default: null,
          },
        },
      },
    ],
    description: {
      type: String,
      default: null,
      set: (v) => escape(v),
      get: (v) => unescape(v),
    },
    cate_id: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "Category",
    },
    status: {
      type: String,
      enum: ["draft", "publish"],
      default: "draft",
    },
    stock: {
      type: String,
      enum: ["stocking", "out_of_stock"],
      default: "stocking",
    },
    video_id: {
      type: String,
      default: null,
    },
    warranty: {
      type: String,
      default: null,
    },
    promotion: {
      type: String,
      default: null,
    },
    is_selling: {
      type: Boolean,
      default: false,
    },
    is_new: {
      type: Boolean,
      default: false,
    },
    price_negotiable: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        _id: false,
        name: String,
        slug: String,
      },
    ],
    attributes: [
      { name: { type: String }, value: { type: String }, slug: String },
    ],
    note: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true, getters: true },
  }
);

ProductSchema.virtual("thumbnail.url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.thumbnail.filename);
});

ProductSchema.virtual("thumbnail.thumbnail.url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.thumbnail.filename);
});

ProductSchema.virtual("thumbnail.full.url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.full.filename);
});

ProductSchema.virtual("thumbnail.small.url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.small.filename);
});

ProductSchema.virtual("thumbnail.large.url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.large.filename);
});

ProductSchema.virtual("is_discount").get(function () {
  return this.price_discount > 0;
});

ProductSchema.virtual("percent_discount").get(function () {
  return 100 - Math.round((this.price_discount / this.price_original) * 100);
});

ProductSchema.virtual("price").get(function () {
  return this.price_negotiable
    ? 0
    : this.price_discount > 0
    ? this.price_discount
    : this.price_original;
});

ProductSchema.paths.photos.schema.virtual("url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.filename);
});
ProductSchema.paths.photos.schema.virtual("thumbnail.url").get(function () {
  return getFullUrlMediaUpload(this.thumbnail.filename);
});
ProductSchema.paths.photos.schema.virtual("large.url").get(function () {
  return getFullUrlMediaUpload(this.large.filename);
});
ProductSchema.paths.photos.schema.virtual("full.url").get(function () {
  return getFullUrlMediaUpload(this.full.filename);
});
ProductSchema.paths.photos.schema.virtual("small.url").get(function () {
  return getFullUrlMediaUpload(this.small.filename);
});

ProductSchema.paths.photos.schema.set("toJSON", {
  virtuals: true,
});
ProductSchema.paths.photos.schema.set("toObject", {
  virtuals: true,
});

ProductSchema.virtual("cate", {
  ref: "Category", // the collection/model name
  localField: "cate_id",
  foreignField: "_id",
  justOne: true, // default is false
});

module.exports = mongoose.model("Product", ProductSchema, "products");
