import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../context/ProductContext";
import axios from "axios";

const Filter = () => {
  const [sortBy, setSortBy] = useState("priceAsc");

  const { setProducts, products, setPageProducts } = useContext(productContext);

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/sort/${sortBy}`)
      .then((res) => {
        setPageProducts(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortBy]); // Add sortBy as a dependency

  return (
    <div>
      <h2 className="text-left text-slate-700  text-sm md:text-lg mb-2">
        Sort By
      </h2>

      <select
        value={sortBy}
        onChange={handleChange}
        className=" border border-gray-300 outline-none bg-white drop-shadow-sm focus:bg-slate-10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[250px] p-2.5 transition-all duration-200"
      >
        <option value="priceAsc">Price (Low - High)</option>
        <option value="priceDesc">Price (High - Low)</option>
        <option value="nameAsc">Name (Z-A)</option>
        <option value="nameDesc">Name (A-Z)</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <ul></ul>
    </div>
  );
};

export default Filter;
