import slugify from "slugify";
import Product from "../models/product.modal.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  const { name, description, price, category, quantity } = req.body;

  if (!name || !description || !price || !category || !quantity) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  if (!req.files || !req.files.length) {
    return res.status(400).json({
      message: "Please provide at least one image",
    });
  }

  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      slug: slugify(req.body.name),
      category: req.body.category,
      quantity: req.body.quantity,
      image: req.files[0].filename, // Set the first image as the main image
      images: req.files.map((file) => file.filename), // Store an array of image filenames
      views: 0,
      ratings: [],
    });

    await product.save();
    res
      .status(201)
      .json({ message: "Product Added Successfully", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const allProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category", "slug");
    res.json({
      products,
      totalCount: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const singleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Increment view count
    await incrementViewCount(id);

    // Calculate average rating
    const ratings = product.ratings;
    const averageRating =
      ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

    res.json({
      product,
      averageRating,
      numRatings: product.ratings.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const productLimit = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    const images = req.files; // Get the array of uploaded files

    // Loop through each file and delete it
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(`images/${image.originalname}`, (err) => {
          if (err) {
            console.error("An error occurred:", err);
          } else {
            console.log("File deleted successfully!");
          }
        });
      });
    }

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { name, description, price, category, quantity } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Please provide product name",
    });
  }

  if (!description) {
    return res.status(400).json({
      message: "Please provide product description",
    });
  }

  if (!price) {
    return res.status(400).json({
      message: "Please provide product price",
    });
  }

  if (!category) {
    return res.status(400).json({
      message: "Please provide product category",
    });
  }

  if (!quantity) {
    return res.status(400).json({
      message: "Please provide product quantity",
    });
  }

  if (req.files) {
    req.files.forEach((file) => {
      // You can process each file here
      console.log(file);
    });
  } else {
    console.log("No files sent in the request");
  }

  try {
    const product = await Product.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        slug: slugify(req.body.name),
        category: req.body.category,
        quantity: req.body.quantity,
      },
      new: true,
    });

    res.status(200).json({
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const submitRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    const userId = req.user._id;
    await submitRating(id, rating, review, userId);
    res.status(200).json({
      message: "Rating submitted successfully",
      ratingData: {
        rating: rating,
        review: review,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const filterProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const pageNation = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const product = await Product.find().skip(skip).limit(limit);
  res.status(200).json(product);
};

export const SortProduct = async (req, res) => {
  const sortBy = req.params.sortby;

  let sortQuery = {};

  switch (sortBy) {
    case "priceAsc":
      sortQuery = { price: 1 };
      break;
    case "priceDesc":
      sortQuery = { price: -1 };
      break;
    case "nameAsc":
      sortQuery = { name: 1 };
      break;
    case "nameDesc":
      sortQuery = { name: -1 };
      break;
    case "newest":
      sortQuery = { createdAt: -1 };
      break;
    case "oldest":
      sortQuery = { createdAt: 1 };
      break;
    default:
      sortQuery = { createdAt: -1 };
  }

  const product = await Product.find().sort(sortQuery);
  res.status(200).json(product);
};

export const search = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const products = await Product.find({
      $or: {
        name: { $regex: searchQuery, $options: "i" },
        description: { $regex: searchQuery, $options: "i" },
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const relatedProduct = async (req, res) => {
  try {
    const catId = req.params.category;
    const excludeId = req.params.excludeId;

    const products = await Product.find({
      category: catId,
      _id: { $ne: excludeId },
    })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category");

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const featureProduct = async (req, res) => {
  try {
    const randomProducts = await Product.aggregate([{ $sample: { size: 8 } }]);
    res.json(randomProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const newArrival = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const clothes = async (req, res) => {
  let category = req.params.category;
  try {
    const product = await Product.find({ category })
      .sort({ rating: -1 }) // sort by rating in descending order
      .limit(8)
      .populate("category");
    res.json({ product, total: product.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const mobiles = async (req, res) => {
  const mobile = req.params.category;
  try {
    const product = await Product.find({ category: mobile }) // filter by views >= 100
      .sort({ views: -1 }) // sort by views in descending order
      .limit(8)
      .populate("category");
    res.json({ product, total: product.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

async function incrementViewCount(productId) {
  try {
    const product = await Product.findById(productId);
    product.views += 1;
    await product.save();
  } catch (error) {
    console.error(error);
  }
}

async function submitRating(productId, rating, review, userId) {
  try {
    const product = await Product.findById(productId);
    const ratingObject = {
      rating,
      review,
      userId,
    };
    product.ratings.push(ratingObject);
    await product.save();
  } catch (error) {
    console.error(error);
  }
}
