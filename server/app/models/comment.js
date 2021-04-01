const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      default: null,
    },
    reply_id: {
      type: String,
      default: null,
    },
    rate: {
      type: Number,
      default: 1,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "reply_id",
  justOne: false,
});

module.exports = mongoose.model("Comment", CommentSchema, "comments");
