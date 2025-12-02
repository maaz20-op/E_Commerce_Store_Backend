import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productDescription: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: {
      type: [String], 
      required: true,
    },
 category: {
  type: String,
  required: true,
 },
  buyers: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
], 
reviews: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  }
], 
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const ProductModel =  mongoose.model("Product", productSchema);
