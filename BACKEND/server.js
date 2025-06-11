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
 

connectDB();
connectCloudinary();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
app.use(helmet()); 
app.use("/uploads", express.static("uploads"));


app.use("/api/user", userRouter); 
app.use("/api/product", productRouter); 
app.use("/api/cart", cartRouter); 
app.use("/api/order", orderRouter); 



app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
 

// 10:50