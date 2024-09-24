import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

  import {  toast } from "react-toastify";
import axios from "axios";
import { authContext } from "../../context/Auth";

const ForgetPassword = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const location = useLocation()
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/forget-password",
        {
          ...formData,
        }
      );
      toast.success(response.data.message);


      navigate(location.state||"/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="mt-14 md:mt-10">
      <div className="flex flex-col justify-center gap-y-7 bg-slate-200/10 drop-shadow-lg w-[80vw] md:w-[60vw] lg:w-[40vw] mx-auto px-6 ">
        <h1 className="text-2xl uppercase text-center text-slate-800 font-semibold mt-8 mb-5">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
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
              <HiOutlineMail className="absolute top-[50%] translate-y-[-50%] right-3 text-slate-500 text-lg" />
            ) : (
              ""
            )}
          </div>

          <div className="w-[80%] mx-auto relative">
            <input
              type={passwordEye ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
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
            disabled={loading}
            className={`bg-gradient-to-r from-cyan-500 to-blue-500 py-3 w-[80%] mx-auto text-white text-xl mt-7 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 ${
              loading ? "cursor-wait bg-slate-300" : ""
            } `}
          >
            {loading ? "...loading" : "Reset"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default ForgetPassword;
