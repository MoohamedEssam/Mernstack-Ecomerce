import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: Number,
      default: 0, // 0 for user, 1 for admin
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
