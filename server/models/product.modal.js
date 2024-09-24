// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 0,
//       default: 1,
//     },
//     image: {
//       type: String,
//       // required:true
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 1,
    },
    // image: {
    //   type: String,
    //   // required:true
    // },

    image: String, // Main image filename
    images: [{ type: String }],
    views: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        rating: {
          type: Number,
          default: 0,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
          trim: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
