import express from 'express';
import { listProduct, addProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post(
  "/add",adminAuth,
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
    { name: "img4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.get('/list',listProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post("/single", singleProduct);

export default productRouter;


