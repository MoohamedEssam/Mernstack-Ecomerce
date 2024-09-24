
import express from "express";
import {
  allProduct,
  createProduct,
  deleteProduct,
  featureProduct,
  filterProductByCategory,
  newArrival,
  pageNation,
  relatedProduct,
  search,
  singleProduct,
  SortProduct,
  updateProduct,
  submitRate,
  clothes,
  mobiles,
} from "../controller/product.controller.js";
import { isAdmin, requireAuth } from "../middlewares/authMiddleware.js";
import multer from "multer";
import fs from "fs";

import productModal from "../models/product.modal.js";

const productRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop(); // get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

productRoute.get("/images/:image", (req, res) => {
  const { image } = req.params;
  if (!image) {
    return res.status(400).send({ message: "Image parameter is required" });
  }
  const readStream = fs.createReadStream(`public/${image}`);
  readStream.on("error", (err) => {
    console.error(err);
    res.status(404).send({ message: "Image not found" });
  });
  readStream.pipe(res);
});

productRoute.get("/clothe/:category", clothes);
productRoute.get("/mobile/:category", mobiles);

productRoute.get("/sort/:sortby", SortProduct);

productRoute.get("/page", pageNation);

productRoute.get("/search", search);
productRoute.get("/category/:category/:excludeId", relatedProduct);

productRoute.get("/feature", featureProduct);
productRoute.get("/newArrival", newArrival);

productRoute.post(
  "/",
  requireAuth,
  isAdmin,
  // upload.single("image"),
  upload.array("image", 4), 
  createProduct
);

productRoute.get("/", allProduct);
productRoute.get("/:id", singleProduct);

// return 6 product

productRoute.delete("/:id", requireAuth, isAdmin, deleteProduct);

productRoute.put("/:id", requireAuth, isAdmin, updateProduct);

// Filter Product
productRoute.get("/filter/:category", filterProductByCategory);

// Submit Rating
productRoute.post("/:id/rating", requireAuth, submitRate);

export default productRoute;
