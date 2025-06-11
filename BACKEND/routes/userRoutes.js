import express from 'express';
import {loginUser,registerUser,adminLogin, getUserProfile, updateUserProfile, updateAddress} from '../controllers/userController.js'
import rateLimit from "express-rate-limit";
import authUser from '../middleware/auth.js';

const userRouter = express.Router();
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Allow only 5 attempts per IP
  message: {
    success: false,
    message: "Too many failed login attempts. Try again later.",
  },
  keyGenerator: (req) => req.ip, // Track attempts by IP
});

userRouter.post('/register',registerUser);
userRouter.post('/login',loginLimiter,loginUser)
userRouter.post('/admin',adminLogin)


userRouter.get("/profile", authUser, getUserProfile);

userRouter.put('/profile', authUser, updateUserProfile);

userRouter.put("/address", authUser, updateAddress);



export default userRouter;


