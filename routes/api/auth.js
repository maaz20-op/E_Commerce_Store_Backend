import express from "express";
import {
  signupUser,
  loginUser,
  sendVerficationCode,
  logoutUser,
  generateToken,
  checkUserAuthOnFrontend
} from "../../controllers/api/authController.js";

const router = express.Router();

// POST /api/auth/signup → create new user
router.post("/signup", signupUser);

// POST /api/auth/login → login user
router.post("/login", loginUser);

router.post("/token/generate", generateToken);

router.get("/send-code/:email", sendVerficationCode);

// POST /api/auth/logout → logout user
router.post("/logout", logoutUser);

router.get('/verify', checkUserAuthOnFrontend)

export default router;
