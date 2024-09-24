import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { productContext } from "../../context/ProductContext";

const Products = () => {
  const { featureProducts } = useContext(productContext);


  return (
    <div className="my-20">
      <h1 className="text-center font-bold text-3xl  mb-6 text-slate-800">
        Feature Products
      </h1>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-9 gap-5 sm:px-12  ">
        {featureProducts.map((item) => {
          return <ProductCard key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Products;
