const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: null,
    },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        qty: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
    status: {
      type: String,
      enum: ["new", "cancle", "success", "confirmed"],
      default: "new",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Order", OrderSchema, "orders");
