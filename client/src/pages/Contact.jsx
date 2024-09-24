import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
  import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const contactList = [
    {
      icon: <FaPhoneAlt className="text-2xl text-slate-400" />,
      label: "+1 234 567 890",
      title: "Phone Number",
    },

    {
      icon: <FaLocationDot className="text-2xl text-slate-400" />,
      label: "10 Street Name, City Name Country, Zip code",
      title: "Address",
    },

    {
      icon: <IoMdMail className="text-2xl text-slate-400" />,
      label: "mymail@mailservice.com",
      title: "Email",
    },
  ];

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/send-email",
        { ...formData }
      );
      toast.success(response.data.message, { position: "top-right" });
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center text-4xl font-semibold mt-8"
      >
        Contact Us
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row mx-auto w-full  justify-evenly sm:px-8 px-5 sm:mt-14 mt-14 gap-x-7 gap-y-14 "
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:w-[40%] w-full py-10 text-center sm:border-r-4 sm:h-[60vh] flex flex-col gap-y-10  justify-evenly   sm:ml-7 order-1 sm:-order-1 "
        >
          {contactList.map((item) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center  gap-x-3 text-left sm:gap-x-2 text-slate-500"
            >
              <p className="text-slate-700">{item.icon}</p>
              <p className="text-wrap w-full">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:w-[60%]"
        >
          <h1
            className="text-slate-800 text-xl sm:text-2xl md:text-3xl text-left
         font-semibold "
          >
            Fill in your details and we'll get right back to you
          </h1>
          <form className="w-full md:w-[70%] mx-auto" onSubmit={handleMessage}>
            <div className="mt-10">
              <label htmlFor="" className="text-slate-400 text-sm">
                Full name
              </label>

              <input
                type="text"
                name="name"
                className="border-b-2 outline-none w-full focus:border-b-4 px-4 text-slate-700   "
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mt-6">
              <label htmlFor="" className="text-slate-400 text-sm">
                Phone number
              </label>

              <input
                type="text"
                className="border-b-2 outline-none w-full focus:border-b-4 px-4 text-slate-700 "
                name="phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
            <div className="mt-6">
              <label htmlFor="" className="text-slate-400 text-sm">
                What service are you interested in?
              </label>
              <input
                type="text"
                name="message"
                className="border-b-2 outline-none w-full focus:border-b-4 px-4 text-slate-700   "
                onChange={handleChange}
                value={formData.message}
              />{" "}
            </div>
            <div className="mt-6">
              <label htmlFor="" className="text-slate-400 text-sm">
                Email
              </label>
              <input
                type="text"
                className="border-b-2 outline-none w-full focus:border-b-4 px-4 text-slate-700   "
                name="email"
                onChange={handleChange}
                value={formData.email}
              />{" "}
            </div>
            <button
              type="submit"
              className="my-10 bg-slate-800 text-white py-2.5 px-14 hover:bg-slate-700 uppercase rounded-sm "
            >
              Send message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
