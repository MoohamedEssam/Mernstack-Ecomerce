import express from "express";
import {
  emailSend,
  forgetPassword,
  getOrders,
  login,
  register,
  updateProfile,
} from "../controller/auth.controller.js";
import { requireAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register || post
router.post("/register", register);
// Login ||post
router.post("/login", login);

// Forget Password ||post

router.post("/forget-password", forgetPassword);

router.post("/send-email", emailSend);

// Protected User

router.get("/user-auth", requireAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin
router.get("/admin-auth", requireAuth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/orders", requireAuth, getOrders);

router.put("/profile", requireAuth, updateProfile);

export default router;
