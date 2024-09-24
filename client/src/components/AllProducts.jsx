import React, { useContext, useEffect, useState } from "react";
import FilterCategory from "./Home/FilterCategory";
import Filter from "./Filter";
import ProductCard from "./Home/ProductCard";
import { productContext } from "../context/ProductContext";
import { motion } from "framer-motion";

const AllProducts = () => {
  const {
    products,
    handlePageChange,
    handleLimitChange,
    limit,
    setLimit,
    page,
    setPage,
    // pageProducts,
  } = useContext(productContext);

  const pageProducts = products.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(products.length / limit);

  const paginationItems = Array(totalPages)
    .fill(null)
    .map((_, index) => index + 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            src="images/products.jpg"
            className="object-cover w-full h-[45vh]"
            alt=""
          />
          <div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-center space-y-4 w-[70%] md:w-[50%]"
          >
            <h1 className="text-slate-50 md:text-5xl text-3xl uppercase">
              <span className="text-slate-400 mr-2">#</span>
              Stay At Home
            </h1>
            <p className="text-center text-sm md:text-md text-slate-100">
              Shop from the comfort of your own home and get your favorite
              products delivered right to your doorstep!
            </p>
          </div>
        </div>

        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex items-center justify-between md:px-10 px-3"
        >
          <FilterCategory />
          <Filter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 sm:px-8 px-16"
        >
          {pageProducts.map((item) => {
            return (
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                key={item._id}
              >
                <ProductCard item={item} />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-gray-10 rounded-lg p-0 flex items-center justify-between w-[70%] sm:w-[30%] md:w-[25%] mx-auto my-10"
        >
          <button
            className={`py-1 px-8 ${
              page === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          <ul className="flex  items-center gap-x-5">
            {paginationItems.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  className={`  ${
                    page === pageNumber
                      ? "text-xl text-slate-600"
                      : "text-slate-500"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`py-1 px-8 ${
              page === totalPages
                ? "text-xl text-slate-600 curs"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllProducts;
