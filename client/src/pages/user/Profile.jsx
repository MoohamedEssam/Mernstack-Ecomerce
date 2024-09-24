import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  FaBorderAll,
  FaRegAddressBook,
  FaRegEyeSlash,
  FaRegUser,
} from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";

import React, { useContext, useEffect, useState } from "react";

import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import { authContext } from "../../context/Auth";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";

const Profile = () => {
  const { auth } = useContext(authContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: auth.user.name,
      email: auth.user.email,
      address: auth.user.address,
      phone: auth.user.phone,
    });
  }, [auth?.user]);

  const [passwordEye, setPasswordEye] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const togglePasswordEye = () => {
    setPasswordEye(!passwordEye);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.put("http://localhost:8000/api/auth/profile", {
        ...formData,
      });
      setFormData({
        name: response.data.updatedUser.name,
        email: response.data.updatedUser.email,
        password: "",
      });

      toast.success("Profile updated successfully");
      localStorage.removeItem("auth");

      navigate("/login");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
    }

    useEffect(() => {
      setFormData({
        name: auth.user.name,
        email: auth.user.email,
        address: auth.user.address,
        phone: auth.user.phone,
      });
    }, [auth?.user]);
  };
  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <div className=" text-center">
          <div className="mt-5">
            <Link to={"/dashboard/user"}>
              <h1 className="hidden md:block cursor-pointer text-slate-600 text-xl uppercase">
                Dashboard
              </h1>
            </Link>
            <div className="flex justify-start ml-1 hover:bg-slate-100 py-2 text-3xl md:hidden text-slate-600">
              <Link to={"/dashboard/user"}>
                <GrUserAdmin />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-y-9 mt-12 ">
            <Link
              to={"/dashboard/user/profile"}
              className="flex items-center gap-x-1 cursor-pointer max-w-full md:px-6 w-full md:shadow hover:bg-slate-50/10 py-2  "
            >
              <CgProfile className="text-center text-3xl px-1 text-slate-400 " />
              <span className="hidden md:block text-sm text-slate-600 ">
                Profile
              </span>
            </Link>
            <Link
              to={"/dashboard/user/order"}
              className="flex items-center gap-x-1 cursor-pointer  md:px-6 w-full md:shadow hover:bg-slate-700/15 py-2  "
            >
              <FaBorderAll className="text-center text-3xl text-slate-400 px-1" />
              <span className="hidden md:block text-sm text-slate-600">
                Order
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-11 md:col-span-10 ">
        <div className="mt-5 flex flex-col items-center justify-center  ">
          <div className="flex flex-col justify-center gap-y-7 bg-slate-200/10 drop-shadow-lg w-[80vw] md:w-[60vw] lg:w-[40vw]  mx-auto px-6 ">
            <h1 className="text-2xl uppercase text-center text-slate-800 font-semibold mt-8 mb-5">
              User Profile
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-6 w-full"
            >
              <div className=" mx-auto w-[80%] relative mb-5">
                <input
                  type="text"
                  value={formData.name}
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
                  value={formData.email}
                  disabled
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
                  value={formData.password}
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
