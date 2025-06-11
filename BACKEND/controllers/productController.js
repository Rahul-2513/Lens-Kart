import { v2 as cloudinary } from "cloudinary";
import productModels from "../models/productModels.js";

export const addProduct = async (req, res) => {
  try {
    console.log("Received Request");
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    let {
      name,
      description,
      category,
      subCategory,
    
      price,
      bestSeller,
      sizes,
    } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.error("No files uploaded");
      return res
        .status(400)
        .json({ success: false, message: "No files were uploaded" });
    }

    const images = ["img1", "img2", "img3", "img4"]
      .map((key) => req.files[key]?.[0]?.path)
      .filter((path) => path !== undefined);

    console.log("Images to Upload:", images);

    if (images.length === 0) {
      console.error("No valid images found");
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    let imageUrl;
    try {
      imageUrl = await Promise.all(
        images.map(async (path) => {
          let result = await cloudinary.uploader.upload(path, {
            resource_type: "image",
          });
          console.log("Uploaded Image URL:", result.secure_url);
          return result.secure_url;
        })
      );
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Cloudinary upload failed" });
    }

    sizes = JSON.parse(sizes || "[]");
    bestSeller = bestSeller === "true";

    console.log("Parsed Data:", {
      name,
      description,
      category,
      subCategory,
  
      price,
      bestSeller,
      sizes,
    });

    const productData = {
      name,
      description,
      price: parseFloat(price) || 0,
      image: imageUrl,
      category,
      subCategory,
      sizes,
      bestSeller,
    
      date: Date.now(),
    };

    const product = new productModels(productData);
    await product.save();

    console.log("Product saved successfully");
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
