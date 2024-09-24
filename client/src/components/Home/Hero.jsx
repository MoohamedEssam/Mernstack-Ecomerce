import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Carousel } from "antd";

const Hero = () => {
  const contentStyle = {
    margin: 0,
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    innerWidth: "100%",
    duration: "2",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Carousel autoplay className="w-full">
        <div style={contentStyle} className="relative w-full">
          <div className="hero2-bg w-full ">
            <div className="flex flex-col  items-center h-full justify-center md:items-start md:justify-center text-white relative md:pl-20">
              <h1 className="md:text-6xl sm:text-4xl text-2xl font-bold">
                Welcome to Our Online Store
              </h1>
              <p className="text-sm text-slate-100 md:[60%] md:text-left capitalize mt-2 w-full text-center md:ml-2">
                Welcome to our online store! Explore our selection and sign up
                for exclusive updates and promotions.
              </p>  

              <div className="relative mt-5">
                <Link to={"/products"}>
                  <button
                    className="bg-white  text-black py-4
              px-20  font-semi-bold text-xl  hover:bg-transparent border
      hover:border-white rounded-md hover:text-white box-border transition-all duration-100"
                  >
                    Shop Store
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={contentStyle} className="relative w-full">
          <div className="hero-bg w-full relative ">
            <div className="flex flex-col  items-center h-full justify-center md:items-start md:justify-center text-white relative md:pl-20">
              <h1 className="md:text-6xl sm:text-4xl text-2xl font-bold">
                Take a Break from Shopping
              </h1>
              <p className="text-sm text-slate-100 md:w-1/2 capitalize mt-2 w-full text-center md:ml-2">
                Our resting area is designed to provide a comfortable and
                relaxing space for you to recharge
              </p>

              <div className="relative mt-5">
                <Link to={"/products"}>
                  <button
                    className="bg-transparent font-se  text-white py-4
              px-20  font-semi-bold text-xl  hover:bg-white border
      hover:border-white rounded-md hover:text-black box-border transition-all duration-100"
                  >
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </motion.div>
  );
};

export default Hero;
