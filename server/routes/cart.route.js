import express from "express";
import {
  addProductToCart,
  clearCart,
  createCart,
  getCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../controller/cart.controller.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const Router = express.Router();

Router.delete("/cart", requireAuth, clearCart);

Router.post("/", requireAuth, createCart);
Router.get("/", requireAuth, getCart);
Router.post("/:productId", requireAuth, addProductToCart);
Router.delete("/:productId", requireAuth, removeProductFromCart);
Router.put("/:productId", requireAuth, updateProductQuantity);


export default Router;
