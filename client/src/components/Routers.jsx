import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Cart from "../pages/Cart";
import { authContext } from "../context/Auth";
import Dashboard from "../pages/user/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import ForgetPassword from "../pages/auth/ForgetPassword";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCategory from "./AdminPanel/adminRoutes/CreateCategory";
import CreateProduct from "./AdminPanel/adminRoutes/CreateProduct";
import Products from "./AdminPanel/adminRoutes/Products";
import Order from "./AdminPanel/adminRoutes/Order";
import SideBar from "./AdminPanel/SideBar";
import Profile from "../pages/user/Profile";
import Orders from "../pages/user/Orders";
import ProductEdit from "./AdminPanel/adminRoutes/ProductEdit";
import AllProducts from "./AllProducts";
import ProductDetails from "./Home/ProductDetails";
import Checkout from "../pages/Checkout";
import Verify from "../pages/Verify";
import Footer from "./Footer";

const Routers = () => {
  const { auth, setAuth } = useContext(authContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <AllProducts />
              <Footer />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <ProductDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route
          path="/verify"
          element={
            <>
              <Verify />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PrivateRoute />
              <Footer />
            </>
          }
        >
          <Route
            path="user"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path="user/profile"
            element={
              <>
                <Profile />
              </>
            }
          />
          <Route
            path="user/order"
            element={
              <>
                <Orders />
              </>
            }
          />
        </Route>
        <Route
          path="/dashboard"
          element={
            <>
              <AdminRoute />
              <Footer />
            </>
          }
        >
          <Route
            path="admin"
            element={
              <>
                <AdminDashboard />
              </>
            }
          />
          <Route
            path="admin/create-category"
            element={
              <>
                <CreateCategory />
              </>
            }
          />
          <Route
            path="admin/create-product"
            element={
              <>
                <CreateProduct />
              </>
            }
          />
          <Route
            path="admin/product"
            element={
              <>
                <Products />
              </>
            }
          />
          <Route
            path="admin/product/:id"
            element={
              <>
                <ProductEdit />
              </>
            }
          />
          <Route
            path="admin/order"
            element={
              <>
                <Order />
              </>
            }
          />
        </Route>
        <Route
          path="/cart"
          element={
            <>
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={!auth.user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!auth.user ? <Register /> : <Navigate to={"/"} />}
        />

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="*"
          element={
            <>
              <NotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Routers;
