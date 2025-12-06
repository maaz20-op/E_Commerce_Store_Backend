import express from "express";
const app = express();

// load Enivronment Variables
import dotenv from "dotenv";
dotenv.config();

//import DataBase setup
import connectDB from "./config/dbConnection.js"

// DataBase Models
import { UserModel } from "./models/UserModel.js";
import { ProductModel } from "./models/productModel.js";
import { AuthModel } from "./models/authModel.js";
import { ReviewModel } from "./models/reviewModel.js";
import './config/passport.js';

// middlewares
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

//routes 
import productRouter from './routes/api/product.js';
import authRouter from './routes/api/auth.js';
import userRouter from './routes/api/user.js';
import googleAuthRouter from './routes/api/googleAuth.js';
import orderRouter from './routes/api/order.js';
import { OrderModel } from "./models/orderModel.js";


// DataBase Connection Setup
connectDB();

// ------------------ Middlewares ------------------

app.use(cookieParser());


// Enable CORS
app.use(cors({
  origin: "https://alkaram-collections.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));


// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
        "connect-src": ["'self'"],
      },
    },
  })
);

// Parse JSON body
app.use(express.json());

// ------------------ Routes Mounting ------------------
app.use("/api/products", productRouter);
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/auth/google", googleAuthRouter)
app.use("/api/orders", orderRouter)


// ------------------ Global Error Handler ------------------
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// 404 Not Found
app.use((req, res) => {
 res.status(404).json({ success: false, message: "Route not found" });
 });

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;