import React, { useContext } from "react";
import { motion } from "framer-motion";
import { productContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const RelatedProducts = () => {
  const {relatedProducts} = useContext(productContext)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mt-20"
      >
        <h1 className="text-xl text-slate-800 font-semibold text-center w-full">
          Related Products
        </h1>

        {relatedProducts?.length === 0 ? (
          <div className="text-center text-xl font-bold text-slate-500 my-10">
            there's not Products Like This. You can try searching for similar
            products.
          </div>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-9 gap-5 sm:px-12 my-14  "
          >
            {relatedProducts?.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default RelatedProducts;
