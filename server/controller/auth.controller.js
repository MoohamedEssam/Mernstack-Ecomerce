import User from "../models/user.modal.js";
import Order from "../models/order.model.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import { generateToken } from "../helper/generateToken.js";
import validator from "validator";
import sendEmail, { validateEmail } from "../helper/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation

    if (!name) {
      return res.status(400).json({
        message: "Please enter your name",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Please enter your email",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please enter your password",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email) {
    return res.status(400).json({
      message: "Please enter your email",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Please enter your password",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Please enter a valid email",
    });
  }

  // check if user Exist
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(401).json({
        message: "Wrong Email or Password",
      });
    }
    // check if password matches
    const matchPassword = await comparePassword(password, userExists.password);
    if (!matchPassword) {
      return res.status(401).json({
        message: "Wrong Email Or Password",
      });
    }

    // generate token
    const token = generateToken(userExists._id);

    res.status(201).json({
      status: true,
      message: "User logged in successfully",
      token,
      user: {
        name: userExists.name,
        email: userExists.email,
        phone: userExists.phone,
        address: userExists.address,
        role: userExists.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Forget Password Controller

export const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Please enter your email",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        message: "Please enter your new password",
      });
    }

    // check is Email Exist

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Hash New Password
    const hashedPassword = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).json({
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const hashedPassword = await hashPassword(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          name,
          email,
          password: hashedPassword,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const order = await Order.find({ user })
      .populate("userId")
      .populate("cartId");

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const emailSend = async (req, res) => {
  const { email, name, phone, message } = req.body;

  try {
    if (!email || !name || !phone) {
      res.status(500).json({
        message: "All fields are required",
      });
    }
    if (!validator.isEmail(email)) {
      res.status(500).json({
        message: "Invalid Email",
      });
    }

    const to = email;
    const from = process.env.GMAIL_EMAIL;
    const replyTo = email;

    await sendEmail(to, from, replyTo, message);
    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    res.status(500).json({
      message: error.message,
    });
  }
};
