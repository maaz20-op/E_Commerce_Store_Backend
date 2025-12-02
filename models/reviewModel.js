import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    profilePic: {
      type: String, // URL of user's profile picture
    },
    reviewText: {
      type: String,
    },
  },
  { timestamps: true } // createdAt, updatedAt automatically
);



export const ReviewModel = mongoose.model("Review", reviewSchema);
