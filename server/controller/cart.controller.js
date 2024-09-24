import cartModel from "../models/cart.model.js";
import productModal from "../models/product.modal.js";

export const createCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const existingCart = await cartModel.findOne({ userId });
    if (existingCart) {
      return res.status(400).json({ message: "Cart already exists" });
    }
    const newCart = new cartModel({ userId });
    await newCart.save();
    res
      .status(201)
      .json({ message: "Cart created successfully", createdCart: newCart });
  } catch (error) {
    res.status(500).json({ message: "Error creating cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await cartModel
      .findOne({ userId })
      .populate({
        path: "products.productId",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .lean();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModal.findById(productId).select("price"); // Only retrieve the price field
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) {
      cart = await cartModel.create({
        userId: req.user._id,
        subtotal: 0,
        total: 0,
      });
    }

    const existingProductInCart = cart.products.find(
      (productInCart) => productInCart.productId.toString() === productId
    );
    if (existingProductInCart) {
      existingProductInCart.quantity += 1; // Increment quantity by 1
    } else {
      cart.products.push({ productId, quantity: 1 }); // Set default quantity to 1
    }

    // Use a single query to retrieve the product prices
    const productPrices = await productModal.find(
      { _id: { $in: cart.products.map((product) => product.productId) } },
      "price"
    );
    const subtotals = cart.products.map((productInCart) => {
      const productPrice = productPrices.find(
        (product) =>
          product._id.toString() === productInCart.productId.toString()
      ).price;
      return productPrice * productInCart.quantity;
    });
    const subtotal = subtotals.reduce((acc, current) => acc + current, 0);

    cart.subtotal = subtotal;
    cart.total = cart.subtotal; // Set total to the same value as subtotal
    await cart.save();
    res.json({ message: "Product added to cart successfully", product, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const removeProductFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.subtotal -= product.price * existingProduct.quantity;
    cart.total -= product.price * existingProduct.quantity;
    await cart.save();
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    // Input validation for quantity
    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: `Invalid quantity: ${quantity}. Please enter a positive integer.`,
      });
    }

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      const productToUpdate = cart.products[existingProductIndex];

      // Check for valid old quantity
      if (
        typeof productToUpdate.quantity !== "number" ||
        isNaN(productToUpdate.quantity)
      ) {
        return res.status(400).json({ message: "Invalid old quantity" });
      }

      const oldQuantity = productToUpdate.quantity;
      productToUpdate.quantity = quantity;
      cart.subtotal += product.price * (quantity - oldQuantity);
      cart.total += product.price * (quantity - oldQuantity);
      await cart.save();
      res.status(200).json({
        message: "Product quantity updated successfully",
        cart,
      });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    cart.total = 0;
    cart.subtotal = 0;
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};
