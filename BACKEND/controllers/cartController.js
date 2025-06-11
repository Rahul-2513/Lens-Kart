// controllers/cartController.js
import userModel from "../models/userModels.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
   

    const { itemId, size } = req.body;
   

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );
   
    res.json({
      success: true,
      message: "Added To Cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.log("❌ addToCart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
   

    const { itemId, size, quantity } = req.body;
   

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = quantity;
    
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.json({
      success: true,
      message: "Cart Updated",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.log("❌ updateCart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
   

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log("❌ getUserCart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
