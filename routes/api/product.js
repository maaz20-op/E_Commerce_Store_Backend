import express from "express";
import {
 createProduct,
 getProducts,
 getProductByID,
 createReview,
 deleteProduct,
 sendCartProductInArray,
} from "../../controllers/api/productController.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import dotenv from 'dotenv'
dotenv.config()
import { createCloudinaryUpload } from "@maaz-jutt-utils/my-utils"
const router = express.Router();

const cloundinarySecrets = {
     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
     apiSecret:process.env.CLOUDINARY_API_SECRET,
}

const upload = createCloudinaryUpload(cloundinarySecrets)



router.post("/", upload.fields([
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 }
])
, createProduct);
router.get('/', getProducts)
router.post('/review', isLoggedIn, createReview)
router.get("/:id",  getProductByID); 
router.delete("/", isLoggedIn, deleteProduct);  
router.post("/cart", isLoggedIn, sendCartProductInArray);


 export default router;
