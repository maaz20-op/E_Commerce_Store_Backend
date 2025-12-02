import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyedItems: [
         {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
    ],
    authUserId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Auth",
required: true,
    },
    transactionId: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        required:true,
    },
    payment: {
      type: Number,
      required: true,
    },
    createdAt: {
  type: String,
  default: () => new Date().toLocaleTimeString()
}

  }
);

export const OrderModel =  mongoose.model("Order", orderSchema);
