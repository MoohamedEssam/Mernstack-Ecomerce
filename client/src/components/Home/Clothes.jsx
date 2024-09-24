import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const Clothes = () => {
  const { clothe } = useContext(productContext);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="
     md:container md:mx-auto "
    >
      <h1 className="mb-10 text-slate-800 font-semibold text-2xl uppercase">
        Clothes
      </h1>
      <Carousel responsive={responsive}>
        {clothe.map((item) => (
          <div className="mx-4">
            <ProductCard item={item} />
            
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Clothes;
