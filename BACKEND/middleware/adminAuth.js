import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // 1) pull from `Authorization: Bearer <token>`
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
    const token = authHeader.split(" ")[1];

    // 2) verify and compare exactly as before
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Login Again"
          : "Invalid token. Login Again",
    });
  }
};

export default adminAuth;
