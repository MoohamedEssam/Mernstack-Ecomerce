import React, { Fragment, useContext, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { sidebarContext } from "../../context/SidebarContext";
import { cartContext } from "../../context/CartContext";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { productContext } from "../../context/ProductContext";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { openSide, setOpenSide } = useContext(sidebarContext);

  const { oneProduct, singleProduct, products } = useContext(productContext);

  const {
    cartItems,
    addToCart,
    removeItem,
    removeFromCart,
    clearCart,
    total,
    removeCartItem,
    quantity,
    updateFromCart,
    ClearCartItems,
    currencyPrice,
  } = useContext(cartContext);

  const sideBarRef = useRef();

  useEffect(() => {
    let handle = () => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setOpenSide(false);
      }
    };
    document.addEventListener("mousedown", handle);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100vw" }}
      animate={openSide ? { opacity: 1, x: 0 } : { opacity: 0, x: "100vw" }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      className={`fixed top-0 ${
        openSide ? "right-0" : "-right-[100vw]"
      } h-screen  w-full sm:w-[70vw] md:w-[55vw] lg:w-[35vw] bg-white shadow-lg py-5  transition-all duration-200 z-40`}
      ref={sideBarRef}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between px-4 items-center"
      >
        <span>Shopping Bag ({cartItems.length})</span>

        <FaArrowRight
          className="text-xl  cursor-pointer text-slate-700 hover:translate-x-1 transition-all duration-200"
          onClick={() => setOpenSide(false)}
        />
      </motion.div>

      <motion.hr
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-1 px-5 text-slate-50"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: "easeInOut",
        }}
        className="mt-10 w-full h-[56vh] md:h[65%] overflow-y-auto"
      >
        {cartItems.map((item, index) => {
          return (
            <Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center w-full px-10 "
                key={index}
              >
                <div className="flex gap-x-5 w-[100%]">
                  <img
                    src={`http://localhost:8000/images/${item.image}`}
                    className="w-[100px] rounded-md"
                    alt=""
                  />
                  <div className=" w-full flex flex-col justify-evenly">
                    <p className="text-sm text-slate-600 w-full">
                      {item?.name?.slice(0, 35)}...
                    </p>

                    <div className="  border border-gray-30/15  justify-center drop-shadow-sm  bg-white flex items-center rounded-sm w-1/2">
                      <button
                        className="flex-grow text-xl text-slate-800 hover:bg-slate-10 "
                        onClick={() => updateFromCart(item, "decrement")}
                      >
                        -
                      </button>

                      <span className="text-slate-600  text-lg">
                        {item.quantity}
                      </span>

                      <button
                        className="flex-grow text-slate-800 text-lg hover:bg-slate-10 "
                        onClick={() => updateFromCart(item, "increment")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-8 justify-between items-center relative">
                  <IoMdClose
                    className="text-xl text-slate-800 hover:text-slate-400 cursor-pointer "
                    onClick={() => removeCartItem(item)}
                  />
                  <span className="flex items-center gap-0.5 text-slate-500">
                    <p className="text-slate-800">$</p>
                    {parseFloat(item.price * item.quantity)}
                  </span>
                </div>
              </motion.div>
              <motion.hr
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="my-5"
              />
            </Fragment>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 mt-4"
      >
        <div className="text-slate-800 font-semibold text-lg">
          Total: <span className="text-slate-500">{currencyPrice()}</span>
        </div>
        <span
          className="cursor-pointer bg-red-500 hover:bg-red-400 transition-all duration-100  py-2 px-4 text-lg rounded-sm text-white"
          onClick={ClearCartItems}
        >
          <FaRegTrashCan />
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full mt-3 gap-y-2 px-8"
      >
        <Link
          to={"/cart"}
          className="bg-slate-200 block w-full text-center py-2 text-lg hover:bg-slate-50 "
        >
          View Cart
        </Link>
        <Link
          to={"/checkout"}
          className="bg-slate-900  text-white block w-full text-center py-2 text-lg hover:bg-slate-800 "
        >
          Checkout
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
