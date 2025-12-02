import { asyncHandler } from "@maaz-jutt-utils/my-utils";
import { UserModel } from "../../models/UserModel.js";
import {successResponseApi, errorResponseApi } from "@maaz-jutt-utils/my-utils";
import { AuthModel } from "../../models/authModel.js";
import { sendSignUpEmailToUser } from "../../emails/sendSignupEmailToUser.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, phone, address, country } = req.body;
 const loginUserAuthId = req.user?.id;

  // Validate input
  if (!name || !phone || !address || !country || !loginUserAuthId) {
  return errorResponseApi(res, 500, "Crediantials are missing")
  }


   const loggedInUser = await AuthModel.findById(loginUserAuthId);
if(!loggedInUser) return errorResponseApi(res, 500, "user is not authenticated")
  const newUser = await UserModel.create({
    name,
    phone,
    address,
    country,
userAuthId: loggedInUser._id
  });

loggedInUser.userId = newUser._id;
await loggedInUser.save(); 

  const user = await UserModel.findById(newUser._id).populate("userAuthId");
  sendSignUpEmailToUser(user?.userAuthId?.email, user.name)
successResponseApi(res, 201, "User Created SuccessFully", user)
});

