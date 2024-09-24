import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { authContext } from "../context/Auth";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const stripe_key =
    "pk_test_51Pw47EP84Jf6uJRHlGVJVvsOaCejqVsBW6H9RQ5EY0Aq9saxUXCEpitaDs8bmig7L2EZWXeaGOL8vKJCWkOsSLWt00YUndMbDU";

  const { auth } = useContext(authContext);

  const stripePromise = loadStripe(stripe_key);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { total, subtotal } = useContext(cartContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    setLoading(true);

    await axios
      .post("http://localhost:8000/api/order/orders", {
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.emailAddress,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      })
      .then((res) => {
        window.location.replace(res.data.session);
        toast.success(res.data.message);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
    }
  }, [auth?.token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={createOrder}>
        <div className="flex flex-col justify-around gap-y-10  w-[80%] mx-auto my-10 md:w-full md:flex-row  ">
          <div className="flex flex-col justify-between gap-y-5">
            <h1 className="text-center text-slate-800 font-semibold text-2xl mb-4 uppercase">
              Delivery Information
            </h1>

            <div className="flex gap-x-3">
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm w-full"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-10 outline-none w-full px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="w-full ">
              <input
                type="text"
                placeholder="Email Address"
                className="border border-gray-10 outline-none  px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm w-full"
                name="emailAddress"
                onChange={handleChange}
                value={formData.emailAddress}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Street"
                className="border border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm w-full"
                name="street"
                onChange={handleChange}
                value={formData.street}
              />
            </div>
            <div className="flex gap-x-3">
              <input
                type="text"
                placeholder="City"
                className="border w-full border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm"
                name="city"
                onChange={handleChange}
                value={formData.city}
              />
              <input
                type="text"
                placeholder="State"
                className="border border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm w-full"
                name="state"
                onChange={handleChange}
                value={formData.state}
              />
            </div>
            <div className="flex gap-x-3">
              <input
                type="text"
                placeholder="Zip Code"
                className="border w-full border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm"
                name="zipCode"
                onChange={handleChange}
                value={formData.zipCode}
              />
              <input
                type="text"
                placeholder="Country"
                className="border w-full border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm"
                name="country"
                onChange={handleChange}
                value={formData.country}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Phone"
                className="border border-gray-10 outline-none px-2 py-1.5 focus:border-gray-500 transition-all duration-75 rounded-sm w-full"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
          </div>

          <div className="md:w-1/3">
            <h1 className="mb-2 bg-slate-50 text-slate-800 text-lg font-semibold px-5 py-2 ">
              Order Details
            </h1>

            <div className="bg-slate-50 p-5 flex flex-col justify-between gap-y-5 rounded-lg">
              <h2 className="text-slate-800 text-lg font-semibold">
                Cart Totals
              </h2>
              <p className="text-slate-500 mr-5 font-semibold text-lg flex justify-between items-center">
                SubTotal : <span className="text-slate-800">$ {subtotal}</span>
              </p>
              <p className="text-slate-500 mr-5 font-semibold text-lg flex justify-between items-center  ">
                Total : <span className="text-slate-800">$ {total}</span>
              </p>

              <button
                type="submit"
                className={`bg-slate-900 py-2 text-center text-white mt-3
            hover:bg-slate-700 ${loading ? "bg-slate-500 cursor-wait" : ""}`}
                disabled={loading}
              >
                Process To Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Checkout;
