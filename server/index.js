import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
import catRoute from "./routes/category.route.js"; // <--- Import the catRoute object
import productRoute from "./routes/product.route.js";
import Router from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Connecting Data Base

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", router);
app.use("/api/product", productRoute);
app.use("/api/category", catRoute); // <--- Use the catRoute object to define routes
app.use("/api/order", orderRoute); // <--- Use the catRoute object to define routes

app.use("/api/cart" , Router)
app.use("/images", express.static("public"));
