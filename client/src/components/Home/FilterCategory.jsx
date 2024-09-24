import React, { useContext, useEffect, useState } from "react";
import { Checkbox, Radio } from "antd";
import { Select, Space } from "antd";

import { categoryContext } from "../../context/CategoryContext";
import { productContext } from "../../context/ProductContext";

import { price } from "../Price";
import axios from "axios";
import { Link } from "react-router-dom";

const FilterCategory = ({ style }) => {
  const { allCategory } = useContext(categoryContext);

  const { filterProductByCategory } = useContext(productContext);

  const handleCategoryChange = (category) => {
    console.log(category);

    if (category === "all") {
      console.log("yes");

      // Return all products
      filterProductByCategory("all");
    } else {
      filterProductByCategory(category);
    }
  };

  return (
    <div className="">
      <h1 className="text-slate-700 text-sm md:text-lg">Filter By Category</h1>

      {/* <div className="w-full my-10">
        <div className="flex justify-center gap-x-10 items-center">
          <button
            onClick={(e) => handleCategoryChange("all")}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-6 py-1.5 text-center me-2 mb-2"
          >
            All
          </button>
          {allCategory.map((item) => {
            return (
              <button
                key={item._id}
                onClick={(e) => handleCategoryChange(item._id)}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-sm text-md px-6 py-1.5 text-center me-2 mb-2"
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div> */}

      <div className="mt-3">
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          defaultValue="all"
          className=" border border-gray-300 outline-none bg-white drop-shadow-sm focus:bg-slate-10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[250px] p-2.5 transition-all duration-200"
        >
          <option value="all">All</option>
          {allCategory.map((item) => {
            return <option value={item._id}>{item.name}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterCategory;
