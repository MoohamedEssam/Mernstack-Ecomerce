import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import { FaRegAddressBook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authContext } from "../../context/Auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { auth, setAuth } = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [passwordEye, setPasswordEye] = useState(false);
  const togglePasswordEye = () => {
    setPasswordEye(!passwordEye);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          ...formData,
        }
      );
      if (response && response.data.status) {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/login");
      } else {
        toast.error(response.data.message, { position: "top-right" });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  return (
    <div className="mt-14 md:mt-6">
      <div className="flex flex-col justify-center gap-y-7 bg-slate-200/10 drop-shadow-lg w-[80vw] md:w-[60vw] lg:w-[40vw]  mx-auto px-6 ">
        <h1 className="text-2xl uppercase text-center text-slate-800 font-semibold mt-8 mb-5">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
          <div className="w-[80%] mx-auto relative mb-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="focus:outline-none outline-none bg-transparent placeholder:text-slate-500 
           placeholder:text-lg  rounded-sm py-2  px-4 focus:border-gray-20  border-b-2 border-gray-300 transition-all duration-100  text-slate-800 w-full relative "
              onChange={handleChange}
            />
            {formData.name === "" ? (
              <FaRegUser className="absolute top-[50%] translate-y-[-50%] right-3 text-slate-500 text-lg" />
            ) : (
              ""
            )}
          </div>
          <div className="w-[80%] mx-auto relative mb-5">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="focus:outline-none outline-none bg-transparent placeholder:text-slate-500 
           placeholder:text-lg  rounded-sm py-2  px-4 focus:border-gray-20  border-b-2 border-gray-300 transition-all duration-100  text-slate-800 w-full relative "
              onChange={handleChange}
            />
            {formData.email === "" ? (
              <HiOutlineMail className="absolute top-[50%] translate-y-[-50%] right-3 text-slate-500 text-lg " />
            ) : (
              ""
            )}
          </div>

          <div className="w-[80%] mx-auto relative mb-5">
            <input
              type={passwordEye ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="focus:outline-none outline-none bg-transparent placeholder:text-slate-500 
           placeholder:text-lg  rounded-sm py-2  px-4 focus:border-gray-20  border-b-2 border-gray-300 transition-all duration-100  text-slate-800 w-full relative "
              onChange={handleChange}
            />
            <span
              onClick={togglePasswordEye}
              className="absolute top-[50%] translate-y-[-50%] right-3 text-slate-500 text-xl cursor-pointer hover:text-slate-700 transition-all duration-200"
            >
              {!passwordEye ? (
                <IoEyeOutline />
              ) : (
                <FaRegEyeSlash className="text-slate-900" />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 py-3 w-[80%] mx-auto text-white text-xl mt-7 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
          >
            {loading ? (
              <div
                role="status"
                className="text-center w-full flex items-center justify-center "
              >
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="flex items-center mt-6 gap-x-1 mb-10">
          Already have an Account?
          <Link to={"/login"} className="text-blue-700 font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
