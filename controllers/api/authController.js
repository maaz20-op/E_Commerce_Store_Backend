import { asyncHandler } from "@maaz-jutt-utils/my-utils";
import { AuthModel } from "../../models/authModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import { SendTokenThroughCookies } from "../../utils/setCookies.js";
import { sendVerificationEmail } from "../../emails/send_Verfication_Code.js";
import {successResponseApi, errorResponseApi} from '@maaz-jutt-utils/my-utils';
import { UserModel } from "../../models/UserModel.js";
import jwt from 'jsonwebtoken';


// ------------------ Signup ------------------
export const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)  return errorResponseApi(res, 400, "Data is Missing")
  

  const existingUser = await AuthModel.findOne({ email });
  if (existingUser) return errorResponseApi(res, 400, "User already Exists")

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await AuthModel.create({
    email,
    password: hashed,
  });

const user = await AuthModel.findById(newUser._id).select('-password');
  const accessToken = generateAccessToken(newUser._id);
  const refreshToken = generateRefreshToken(newUser._id);

  SendTokenThroughCookies(accessToken, refreshToken, res);

 successResponseApi(res, 201, "user sigup successfull", user)
});

// ------------------ Login ------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)  return errorResponseApi(res, 400, "Data is missing")
 console.log(email, password)
  const user = await AuthModel.findOne({ email })
  if (!user) return errorResponseApi(res, 404, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return errorResponseApi(res, 450, "Invalid credentials");

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
const secureUser = await AuthModel.findOne({ email }).populate('userId')
.select('-password')
  SendTokenThroughCookies(accessToken, refreshToken, res);

  successResponseApi(res, 201, "user logged successfully!", secureUser)
  });

export const  sendVerficationCode  = asyncHandler(async (req, res) => {
  // Generate random 4-digit code
  const code = Math.floor(1000 + Math.random() * 9000); // ensures 1000-9999
  
  //send this code to user
sendVerificationEmail(req.params.email, code)
  //send this code frontend 
  res.json({ success:true, code });
});


export const generateToken = asyncHandler(async (req, res)=> {
  const {id} = req.body;

if(!id) errorResponseApi(res, 500, "Missing id for Token Generation")

  const  user = await AuthModel.findById(id)

  if(!user) errorResponseApi(res, 500, "Invalid Id")
  
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  SendTokenThroughCookies(accessToken, refreshToken, res);

  successResponseApi(res, 201, "token Generated Success Fully", user)
})

// ------------------ Logout ------------------
export const logoutUser = asyncHandler(async (req, res) => {
  // Clear cookies
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
});


export  const checkUserAuthOnFrontend = asyncHandler(async (req, res) => {

  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  
  if (!accessToken && !refreshToken) {
    return errorResponseApi(res, 401, "Unauthorized request");
  }

  let decodedAccess = null;
  let decodedRefresh = null;

  // Verify access token
  if (accessToken) {
    try {
      decodedAccess = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      decodedAccess = null;
    }
  }

  // Verify refresh token
  if (refreshToken) {
    try {
      decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      decodedRefresh = null;
      console.log(err)
    }
  }

  // If both invalid
  if (!decodedAccess && !decodedRefresh) {
   return  errorResponseApi(res, 401, "Unauthorized request");
  }

  // 🔄 Refresh token valid → new tokens generate
  if (!decodedAccess && decodedRefresh) {
  const accessToken = generateAccessToken(decodedRefresh.id);// give auth id 
  const refreshToken = generateRefreshToken(decodedRefresh.id);// give auth id

  SendTokenThroughCookies(accessToken, refreshToken, res);
   const AuthUser = await AuthModel.findById(decodedRefresh?.id)
  .populate('userId')
  .select('-password');
  return successResponseApi(res, 201, "user loggedIn", AuthUser)
  }

  const AuthUser = await AuthModel.findById(decodedAccess?.id)
  .populate('userId')
  .select('-password');
  successResponseApi(res, 201, "user loggedIn", AuthUser)
  
});


