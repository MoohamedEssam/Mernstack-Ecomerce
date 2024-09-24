import Category from "../models/category.modal.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Please provide a name for the category",
      });
    }

    const catExist = await Category.findOne({ name });
    if (catExist) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const newCategory = await new Category({ name, slug: slugify(name) });
    await newCategory.save();

    res.status(201).json({
      status: true,
      message: "Category Created Successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          slug: slugify(name),
        },
      },
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No categories found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Single Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
