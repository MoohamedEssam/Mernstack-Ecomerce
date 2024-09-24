import React, { useContext, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { searchContext } from "../../context/SearchContext";

import { IoClose } from "react-icons/io5";
import { productContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Search = () => {
  const { openSearch, setOpenSearch } = useContext(searchContext);

  const { searchQuery, handleSearchChange, searchProducts, setSearchQuery } =
    useContext(productContext);

  const searchRef = useRef();

  useEffect(() => {
    let handler = () => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: openSearch ? 0 : "-100vw" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 h-screen w-full sm:w-[70vw] md:w-[55vw] lg:w-[35vw] bg-white shadow-lg py-5  transition-all duration-200 z-30"
      ref={searchRef}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex ml-5 w-full hover:-translate-x-1 transition-all duration-200"
      >
        <FaArrowLeft
          className="text-xl text-slate-700 cursor-pointer "
          onClick={() => setOpenSearch(false)}
        />
      </motion.div>

      <motion.form
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        action=""
        className="border-b-2 border-gray-900 flex items-center justify-between mt-10
       w-[90%] py-3 mx-auto px-2 "
      >
        <input
          type="text"
          placeholder="search for..."
          className="w-full outline-none text-xl placeholder:text-2xl placeholder:font-bold text-slate-800 font-bold "
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IoClose
          className="cursor-pointer text-2xl text-slate-900"
          onClick={() => setSearchQuery("")}
        />
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[80vh] overflow-auto"
      >
        {searchQuery.trim() === "" ? (
          <p className="text-slate-400 text-lg  mt-3 ml-5">
            No search results found
          </p>
        ) : (
          searchProducts.map((item, index) => {
            return (
              <Link to={`/product/${item._id}`} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-x-4 px-5 py-5 hover:bg-slate-10 cursor-pointer"
                >
                  <img
                    src={`http://localhost:8000/images/${item.image}`}
                    className="w-[110px] rounded-sm  transition-all duration-300 "
                    alt=""
                  />
                  <div>
                    <p className="text-sm text-slate-600">{item.name}</p>
                    <p className="text-md text-slate-600">$ {item.price}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })
        )}
      </motion.div>
    </motion.div>
  );
};

export default Search;
