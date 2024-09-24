import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";

// protected Route

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  try {
    const token = authorization.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Token is invalid" });
    }
    req.user = await User.findOne({ _id: decode.id }).select(decode.id);

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== 1) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
