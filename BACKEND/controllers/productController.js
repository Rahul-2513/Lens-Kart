import { v2 as cloudinary } from "cloudinary";
import productModels from "../models/productModels.js";

export const addProduct = async (req, res) => {
  try {
    console.log("Received Request");
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    let { name, description, category, subCategory, price, bestSeller, sizes } =
      req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const imageKeys = ["img1", "img2", "img3", "img4"];
    const imageBuffers = imageKeys
      .map((key) => req.files[key]?.[0])
      .filter((file) => file !== undefined);

    if (imageBuffers.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    const imageUrls = await Promise.all(
      imageBuffers.map(async (file) => {
        const uploadResult = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { resource_type: "image", folder: "products" }
        );
        return uploadResult.secure_url;
      })
    );

    sizes = JSON.parse(sizes || "[]");
    bestSeller = bestSeller === "true";

    const productData = {
      name,
      description,
      price: parseFloat(price) || 0,
      image: imageUrls,
      category,
      subCategory,
      sizes,
      bestSeller,
      date: Date.now(),
    };

    const product = new productModels(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const listProduct = async (req, res) => {
  try {
    const products = await productModels.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await productModels.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModels.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
