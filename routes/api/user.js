import express from "express";
import {
  createUser,
} from "../../controllers/api/userController.js";
import { isLoggedIn } from '../../middlewares/isLoggedIn.js'
const router = express.Router();

// create user
router.post("/", isLoggedIn, createUser);



export default router;
