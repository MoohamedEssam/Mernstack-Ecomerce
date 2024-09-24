import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getUserOrder,
  updateOrder,
  updateStatus,
  verifyOrder,
} from "../controller/order.controller.js";
import { isAdmin, requireAuth } from "../middlewares/authMiddleware.js";

const orderRoute = express.Router();

orderRoute.post("/orders", requireAuth, createOrder);

orderRoute.get("/", requireAuth, isAdmin, getOrders);

orderRoute.get("/verify", requireAuth, verifyOrder);

// Get all orders
orderRoute.get("/user-order", requireAuth, getUserOrder);

// Get a single order by ID
orderRoute.get("/orders/:id", requireAuth, getOrder);

// Update an existing order
orderRoute.put("/", requireAuth, isAdmin, updateOrder);

// Delete an existing order
orderRoute.delete("/orders/:id", requireAuth, isAdmin, deleteOrder);

// Get all orders (admins only) (for admin dashboard)

orderRoute.post("/status", requireAuth, isAdmin, updateStatus);

export default orderRoute;
