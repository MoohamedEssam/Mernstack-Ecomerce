import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.modal.js";
import Product from "../models/product.modal.js";
import Stripe from "stripe";
import validator from "validator";
import cartModel from "../models/cart.model.js";
import { validationAddress } from "../helper/validationAddress.js";


export const createOrder = async (req, res) => {
  try {
    validationAddress(req.body.address);
    const userId = req.user._id;

    const user = await User.findOne(userId);

    const cart = await Cart.findOne({ userId: user._id.toString() });
    console.log(cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const products = cart.products;
    const subtotal = cart.subtotal;
    const total = cart.total;

    const order = await Order.findOne({ userId: cart.userId.toString() });
    if (order) {
      // Update the existing order
      order.products = products;
      order.subtotal = subtotal;
      order.total = total;
      order.address = req.body.address;
      await order.save();
    } else {
      // Create a new order if it doesn't exist
      const newOrder = new Order({
        userId: cart.userId.toString(),
        products,
        subtotal,
        total,
        address: req.body.address,
      });
      await newOrder.save();
    }

    const populatedOrder = await Order.findById(order._id)
      .populate("userId", "name email")
      .populate("products.productId");

    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
      await order.save({ session });

      // Create a Stripe payment session
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const line_items = populatedOrder.products.map((product) => {
        const price = product.productId.price;
        if (typeof price !== "number" || isNaN(price)) {
          throw new Error(
            `Invalid price for product ${product.productId.name}`
          );
        }
        return {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(price * 100), // Use Math.round to avoid floating-point issues
            product_data: {
              name: product.productId.name,
            },
          },
          quantity: Number(product.quantity),
        };
      });

      const deliveryCharge = 10; // assume a fixed delivery charge of $10
      line_items.push({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(deliveryCharge * 100),
          product_data: {
            name: "Delivery Charges",
          },
        },
        quantity: 1,
      });

      const paymentSession = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.BASE_URL}/verify?success=true&orderId=${order._id}`,
        cancel_url: `${process.env.BASE_URL}/verify?success=false&orderId=${order._id}`,
      });

      // Commit the transaction
      await session.commitTransaction();

      res.status(201).json({
        message: "Order created successfully",
        order,
        sessionId: paymentSession.id,
        session: paymentSession.url,
      });
    } catch (error) {
      // Roll back the transaction if an error occurs
      await session.abortTransaction();

      if (error.code === "StripeInvalidRequestError") {
        return res.status(400).json({ message: "Invalid Stripe request" });
      } else if (error.code === "StripePaymentMethodError") {
        return res.status(402).json({ message: "Payment method error" });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } finally {
      // End the session
      await session.endSession();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate({
        path: "products",
        populate: {
          path: "productId",
          populate: {
            path: "category",
          },
        },
      });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })

      .populate("userId", "name email")
      .populate("products.productId");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });

      console.log(order);
      
    }
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate(
      "userId",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const order = await Order.findByIdAndUpdate(orderId, {
      $set: {
        orderStatus: req.body.orderStatus,
      },
      new: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log(order.orderStatus);

    res.status(200).json({
      message: "Status Updated Successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const success = req.query.success;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    console.log(req.user._id);

    const cart = await cartModel.find({ userId: req.user._id });

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }


    order.paymentStatus = "paid";
    await order.save();

  

    res.status(200).json({
      status: true,
      message: "Order verified and deleted successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.orderStatus;
    await order.save();

    res.status(200).json({
      message: "Status Updated Successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
