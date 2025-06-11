import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// 1️⃣ Connect to MongoDB & Cloudinary
connectDB();
connectCloudinary(); // this just calls cloudinary.config()

// 2️⃣ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(
  cors({
    origin: "https://lens-star-frontend.vercel.app",
    credentials: true,
  })
);


// 🔥 REMOVE this—no local “uploads” folder on Vercel!
// app.use("/uploads", express.static("uploads"));

// 3️⃣ Your API routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// 4️⃣ Rate limiter should go *before* your routes if you prefer to limit all endpoints
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
     