// middleware/auth.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login again." });
    }

    const token = authHeader.split(" ")[1];
   

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("❌ authUser error:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
