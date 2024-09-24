import express from "express";
import { isAdmin, requireAuth } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controller/category.controller.js";

const router = express.Router(); 

// Create a new category
router.post("/", requireAuth, isAdmin, createCategory);

// Update a category
router.put("/:id", requireAuth, isAdmin, updateCategory);

// Delete a category
router.delete("/:id", requireAuth, isAdmin, deleteCategory);
// Get all categories
router.get("/", getAllCategory);

// Get a single category
router.get("/:id", getSingleCategory);

export default router; 
