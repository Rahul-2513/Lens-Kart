// BACKEND/middleware/multer.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary from env vars
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Multer storage to upload directly into your Cloudinary “lens-kart” folder
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lens-kart",
    format: async (req, file) => file.mimetype.split("/")[1], // jpg, png, etc.
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`, // e.g. “avatar-162445”
  },
});

// Optional: file filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

export default upload;
