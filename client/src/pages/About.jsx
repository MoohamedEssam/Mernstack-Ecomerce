import React from "react";
import { motion } from "framer-motion";
import OurVision from "./OurVision";
import Privileges from "./Privileges";

const About = () => {
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
        <h1 className="text-center text-slate-800 text-5xl font-semibold my-10 uppercase  ">
          About Us
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row gap-y-12 justify-evenly items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <p className=" w-full px-2 md:px-8 text-center md:text-justify leading-6 text-slate-400 ">
              we're driven by a passion to deliver exceptional experiences that
              exceed our customers' expectations. Our journey began with a
              simple yet powerful idea: to create a platform that makes online
              shopping easy, convenient, and enjoyable. Today, we're proud to be
              a leading ecommerce destination, dedicated to providing
              top-quality products, outstanding customer service, and a seamless
              shopping experience. Learn more about our mission, values, and the
              people behind our brand
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:w-1/2 w-full drop-shadow-2xl transition-all duration-200 py-5 -order-1 md:order-1"
          >
            <img src="./images/about.gif" className="w-full " alt="" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.5,
          delay: 0.4,
          ease: "easeInOut",
          staggerChildren: 0.1, // add a stagger effect to child elements
        }}
      >
        <OurVision />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Privileges />
      </motion.div>
    </div>
  );
};

export default About;
