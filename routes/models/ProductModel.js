const mongoose = require("mongoose");
const schema = mongoose.schema;

const productSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: [true, "product name is required"],
    },
    producticon: {
      type: String,
      required: [true, "product image is required"],
    },
    subcategoryid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "subcategory",
    },
    categoryid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("products", productSchema);
