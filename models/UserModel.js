import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userAuthId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth'
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePic: {
    type: String, // URL of profile picture
     default: "https://iili.io/FnrRren.png",
  },
  orders: {
    successful: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    delivered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    pending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
}, { timestamps: true });

export const UserModel = mongoose.model("User", UserSchema);
