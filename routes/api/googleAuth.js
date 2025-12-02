import express from "express";
import passport from "passport";
import {generateAccessToken, generateRefreshToken} from '../../utils/generateToken.js'
import {SendTokenThroughCookies} from '../../utils/setCookies.js'
const router = express.Router();


// ------------------ Google Auth ------------------

// Start Google login || frontend send request on this url
router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback
router.get("/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/register" }),
  (req, res) => {
// sending token through cookies
 const accessToken = generateAccessToken(req.user._id);
  const refreshToken = generateRefreshToken(req.user._id);
  SendTokenThroughCookies(accessToken, refreshToken, res);
   res.redirect('http://localhost:5173/')
  }
);

export default router;