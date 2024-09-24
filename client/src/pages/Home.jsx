import React, { useContext, useEffect } from "react";
import { authContext } from "../context/Auth";
import Hero from "../components/Home/Hero";
import { productContext } from "../context/ProductContext";
import Products from "../components/Home/Products";
import FilterCategory from "../components/Home/FilterCategory";
import Features from "../components/Home/Features";
import Service from "../components/Home/Service";
import Banner from "../components/Home/Banner";
import NewArrival from "../components/Home/NewArrival";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Clothes from "../components/Home/Clothes";
import Mobiles from "../components/Home/Mobiles";
import NewsLetter from "../components/Home/NewsLetter";

const Home = () => {
  const { products } = useContext(productContext);
  const { auth, setAuth } = useContext(authContext);

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: -100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: "easeInOut",
        }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Features />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeInOut",
          staggerChildren: 0.1,
        }}
      >
        <Products products={products} />
      </motion.div>
      <div className="my-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.5,
            delay: 0.7,
            ease: "easeInOut",
          }}
        >
          <Clothes />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full"
      >
        <Service />
      </motion.div>

      <div className="my-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            ease: "easeInOut",
          }}
        >
          <Mobiles />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <NewArrival />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Banner />
      </motion.div>

      <div className="my-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.5,
            delay: 0.8,
            ease: "easeInOut",
          }}
        >
          <NewsLetter />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
