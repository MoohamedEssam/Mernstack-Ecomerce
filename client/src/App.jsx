import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./components/Routers";
import Sidebar from "./components/Home/Sidebar";
import Search from "./components/Home/Search";
import { authContext } from "./context/Auth";
import { IoIosArrowUp } from "react-icons/io";

import { motion, useInView, useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";
import AnimatedContainer from "./components/AnimatedContainer";

import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [upBtn, setUpBtn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 700) {
        setUpBtn(true);
      } else {
        setUpBtn(false);
      }
    });
  }, []);

  const handleUpButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const animation = useAnimation();

  useEffect(() => {
    animation.start({
      y: 0,
      opacity: 1,
    });
  }, [location, animation]);
  return (
    <div>
      <Header />
      <AnimatedContainer>
        <Routers />
      </AnimatedContainer>
      <div className="overflow-hidden">
        <Sidebar />
        <Search />
      </div>
      {/* <Footer /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={upBtn ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`up-btn fixed bottom-10 right-5 p-2 rounded-sm group cursor-pointer bg-neutral-800 text-white ${
          upBtn ? "block" : "hidden"
        } `}
        onClick={handleUpButton}
      >
        <IoIosArrowUp className="text-3xl group-hover:-translate-y-1 flex items-center justify-center " />
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default App;
