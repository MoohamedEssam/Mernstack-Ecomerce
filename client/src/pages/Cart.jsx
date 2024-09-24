import React, { useContext, useEffect } from "react";
import { cartContext } from "../context/CartContext";
import { authContext } from "../context/Auth";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeItem,
    total,
    removeFromCart,
    updateFromCart,
    removeCartItem,
    addCartItem,
  } = useContext(cartContext);

  const { auth } = useContext(authContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-slate-800 font-semibold text-2xl text-center w-full my-10">
        {cartItems?.length < 1 ? "Your Cart Is Empty" : "Shopping Cart"}
      </h1>
      <h4 className="text-center text-xl text-red-800">
        {!auth.user && "You Have To Login"}
      </h4>
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-12 w-full gap-y-7"
        >
          <div className="grid md:col-span-9 col-span-12 px-5 ">
            <div className="relative overflow-y-auto h-[30vh] md:h-[60vh] rounded-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => {
                    return (
                      <motion.tr
                        className="bg-white dark:bg-gray-800"
                        key={item._id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={`http://localhost:8000/images/${item.image}`}
                            className="w-20 rounded-md"
                            alt=""
                          />
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.name.slice(0, 28)}
                        </th>
                        <td className="px-6 py-4">$ {item.price}</td>
                        <td className="px-6 py-4 ">
                          <div className="flex  items-center">
                            <button
                              className=" text-lg bg-white drop-shadow border border-gray-100 hover:drop-shadow-sm px-4 text-slate-500"
                              onClick={() => updateFromCart(item, "decrement")}
                            >
                              -
                            </button>
                            <p className="mx-4 text-lg">{item.quantity}</p>

                            <button
                              className=" text-lg bg-white drop-shadow border border-gray-100 hover:drop-shadow-sm  px-4 text-slate-500"
                              onClick={() => updateFromCart(item, "increment")}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">{item.category.slug}</td>
                        <td className="px-6 py-4">
                          $ {item.quantity * item.price}
                        </td>
                        <td className=" ">
                          <div className="  text-center py-2 text-red-500 hover:text-red-700 cursor-pointer px-1 text-xl">
                            <button onClick={() => removeCartItem(item)}>
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid md:col-span-3 col-span-12 mt-1 ">
            {!auth?.token ? (
              <div className="text-red-500 text-center mt-5 text-lg">
                Please Login To Checkout
              </div>
            ) : (
              <>
                <div>
                  <h1 className="mb-2 bg-slate-100 text-slate-800 text-lg font-semibold px-5 py-2 ">
                    Order Details
                  </h1>

                  <div className="bg-slate-100 p-5 flex flex-col justify-between gap-y-5 rounded-lg">
                    <h2 className="text-slate-800 text-lg font-semibold">
                      Cart Totals
                    </h2>
                    <p className="text-slate-500 mr-5 font-semibold text-lg">
                      SubTotal :{" "}
                      <span className="text-slate-800">${total}</span>
                    </p>

                    <p className="text-slate-500 mr-5 font-semibold text-lg">
                      Total : <span className="text-slate-800">${total}</span>
                    </p>

                    <Link
                      to={"/checkout"}
                      className="bg-slate-900 py-2 text-center  text-white mt-3 hover:bg-slate-700"
                    >
                      <button>Process To Checkout</button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
