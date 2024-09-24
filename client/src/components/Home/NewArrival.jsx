import React, { Fragment, useContext } from "react";
import { productContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const NewArrival = () => {
  const { arrival } = useContext(productContext);
  return (
    <div className="my-20">
      <h1 className="text-slate-800 font-bold text-3xl  text-center w-full mb-6">
        New Arrival
      </h1>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-9 gap-5 sm:px-12 my-14  ">
        {arrival.map((item) => {
          return (
            <Fragment key={item._id}>
              <ProductCard item={item} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default NewArrival;
